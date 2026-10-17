import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const PACKAGES: Record<string, { label: string; base: number; type?: string; isFullPayment?: boolean }> = {
  hostel4: { label: "Fat2Fit Hostel — Dual Sharing", base: 70000, type: "camp" },
  hostel1: { label: "Fat2Fit Hostel — Private Room", base: 90000, type: "camp" },
  villacozy: { label: "Fat2Fit Villa — Cozy Private Room", base: 121000, type: "camp" },
  villapremium: { label: "Fat2Fit Villa — Premium Private Room", base: 141000, type: "camp" },
  resortsingle: { label: "Fat2Fit Resort — Individual Resort Cottage", base: 235000, type: "camp" },
  online3m: { label: "Fat2Fit 3-Month Pass (Online Training & Diet)", base: 9999, type: "online", isFullPayment: true },
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { packageKey } = await req.json();

    if (!packageKey || !PACKAGES[packageKey]) {
      throw new Error(`Invalid package selected: ${packageKey}`);
    }

    const pkg = PACKAGES[packageKey];
    let advance = pkg.base;

    if (pkg.isFullPayment) {
      // Online Pass: One-time payment in full
      advance = pkg.base;
    } else {
      // 30-Day Camp: 50% advance on (Base + 18% GST)
      const gst = pkg.base * 0.18;
      const total = pkg.base + gst;
      advance = Math.round(total / 2);
    }

    // Razorpay amount is in subunits (paise)
    const amountInPaise = advance * 100;

    const key_id = Deno.env.get('RAZORPAY_KEY_ID');
    const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!key_id || !key_secret) {
      throw new Error('Razorpay keys are not configured in backend');
    }

    // Call Razorpay API to create an order
    const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${key_id}:${key_secret}`),
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error("Razorpay Order Error:", orderData);
      throw new Error(orderData?.error?.description || 'Failed to create Razorpay order');
    }

    return new Response(
      JSON.stringify({ order_id: orderData.id, amount: orderData.amount }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

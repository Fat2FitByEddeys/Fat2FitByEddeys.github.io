import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import * as crypto from "node:crypto"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'
import nodemailer from 'npm:nodemailer'
import { PDFDocument, StandardFonts, rgb } from 'npm:pdf-lib'
import { LOGO_BASE64 } from './logo.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature,
      bookingData
    } = await req.json();

    const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET');
    
    if (!key_secret) {
      throw new Error('Razorpay keys are not configured in backend');
    }

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new Error('Invalid payment signature');
    }

    // 2. Insert into Database
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const joiningDateStr = bookingData.isOnline
      ? (bookingData.month || "Immediate Activation")
      : `${bookingData.month || ""} ${bookingData.day || ""}`.trim();

    const basePayload = {
      booking_id: bookingData.bookingId || null,
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      age: parseInt(bookingData.age, 10) || null,
      place: bookingData.place,
      package: bookingData.packageLabel,
      joining_date: joiningDateStr,
      amount_paid: bookingData.advance,
      total_amount: bookingData.total,
      balance_due: bookingData.balance,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      status: 'confirmed'
    };

    // Try full insert with health profile first
    const fullPayload = {
      ...basePayload,
      weight: bookingData.weight || null,
      height: bookingData.height || null,
      goal: bookingData.goal || null,
      allergies: bookingData.allergies || null,
      additional_info: bookingData.additional || null
    };

    let { data: insertedData, error: dbError } = await supabase.from('bookings').insert([fullPayload]).select();

    if (dbError) {
      console.warn("Retrying DB insert with base fields:", dbError.message);
      const fallback = await supabase.from('bookings').insert([basePayload]).select();
      if (fallback.error) {
        console.error("DB Insert Fallback Error:", fallback.error);
      } else {
        console.log("DB Insert succeeded with base fields:", fallback.data);
      }
    } else {
      console.log("DB Insert succeeded with full fields:", insertedData);
    }

    // 3. Generate PDF Invoice on backend
    let pdfBase64 = '';
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]);
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const formatINR = (amt: any) => {
        const val = parseInt(amt, 10);
        return isNaN(val) ? '0' : val.toLocaleString('en-IN');
      };

      const safeString = (val: any) => (val === undefined || val === null ? 'N/A' : String(val));

      const primaryColor = rgb(0.75, 0.15, 0.17); // #c0272d
      const darkColor = rgb(0.1, 0.12, 0.17); // #1a202c
      const lightGrayColor = rgb(0.96, 0.97, 0.98); // #f5f7fa
      const borderColor = rgb(0.85, 0.85, 0.85); // #d9d9d9
      const yellowLineColor = rgb(0.98, 0.8, 0.2); // #fabf33
      const greenText = rgb(1, 1, 1); // white
      const greenBg = rgb(0.2, 0.6, 0.3); // #33994d
      const yellowBoxBg = rgb(1, 0.97, 0.85); // #fff9db
      const greyBg = rgb(0.94, 0.94, 0.94); // #f0f0f0

      // Embed Logo
      try {
        const logoUint8 = Uint8Array.from(atob(LOGO_BASE64), (c) => c.charCodeAt(0));
        const logoImage = await pdfDoc.embedJpg(logoUint8);
        page.drawImage(logoImage, {
          x: 30,
          y: height - 120,
          width: 90,
          height: 90,
        });
      } catch (imgErr) {
        console.error('Failed to embed logo in PDF:', imgErr);
      }

      // Header Texts
      page.drawText('FAT2FIT', { x: 135, y: height - 55, size: 36, font: boldFont, color: primaryColor });
      page.drawText('WEIGHT LOSS & DETOX RETREAT & ONLINE ACADEMY', { x: 135, y: height - 75, size: 10, font: boldFont, color: darkColor });
      page.drawText('RETREAT, SHIMLA  |  ONLINE PASS', { x: 135, y: height - 90, size: 10, font, color: darkColor });

      // Mountain Graphic (right side)
      page.drawLine({ start: { x: 440, y: height - 60 }, end: { x: 450, y: height - 35 }, thickness: 1, color: darkColor });
      page.drawLine({ start: { x: 450, y: height - 35 }, end: { x: 460, y: height - 60 }, thickness: 1, color: darkColor });
      page.drawLine({ start: { x: 460, y: height - 60 }, end: { x: 475, y: height - 25 }, thickness: 1, color: darkColor });
      page.drawLine({ start: { x: 475, y: height - 25 }, end: { x: 490, y: height - 60 }, thickness: 1, color: darkColor });
      page.drawLine({ start: { x: 490, y: height - 60 }, end: { x: 500, y: height - 40 }, thickness: 1, color: darkColor });
      page.drawLine({ start: { x: 500, y: height - 40 }, end: { x: 510, y: height - 60 }, thickness: 1, color: darkColor });
      page.drawLine({ start: { x: 435, y: height - 60 }, end: { x: 515, y: height - 60 }, thickness: 0.5, color: darkColor });

      page.drawText('Better Health', { x: 445, y: height - 78, size: 12, font: boldFont, color: darkColor });
      page.drawText('A Brighter You', { x: 442, y: height - 93, size: 12, font: boldFont, color: darkColor });

      // Yellow Separator
      page.drawLine({ start: { x: 30, y: height - 135 }, end: { x: 565, y: height - 135 }, thickness: 2, color: yellowLineColor });

      // Main Title
      const titleText = 'REGISTRATION RECEIPT & INVOICE';
      const titleWidth = boldFont.widthOfTextAtSize(titleText, 14);
      page.drawText(titleText, { x: (width - titleWidth) / 2, y: height - 165, size: 14, font: boldFont, color: darkColor });

      const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const bId = bookingData.bookingId || razorpay_order_id || 'N/A';

      let cy = height - 200;

      // Vertical Divider
      page.drawLine({ start: { x: 295, y: height - 190 }, end: { x: 295, y: height - 340 }, thickness: 1, color: borderColor });

      // Two column row helper
      const drawColRow = (lbl1: string | null, val1: any, lbl2: string | null, val2: any, yOffset: number) => {
        if (lbl1) {
          page.drawText(safeString(lbl1), { x: 30, y: yOffset, size: 9, font, color: darkColor });
          page.drawText(':', { x: 130, y: yOffset, size: 9, font, color: darkColor });
          if (lbl1 === 'Payment Status') {
            page.drawRectangle({ x: 145, y: yOffset - 3, width: 35, height: 14, color: greenBg, opacity: 1 });
            page.drawText(safeString(val1), { x: 150, y: yOffset + 1, size: 8, font: boldFont, color: greenText });
          } else {
            page.drawText(safeString(val1), { x: 145, y: yOffset, size: 9, font, color: darkColor });
          }
        }

        if (lbl2) {
          if (lbl2 === 'Client Profile') {
            page.drawText(safeString(lbl2), { x: 315, y: yOffset, size: 10, font: boldFont, color: darkColor });
          } else {
            page.drawText(safeString(lbl2), { x: 315, y: yOffset, size: 9, font, color: darkColor });
            page.drawText(':', { x: 375, y: yOffset, size: 9, font, color: darkColor });
            page.drawText(safeString(val2), { x: 390, y: yOffset, size: 9, font, color: darkColor });
          }
        }
      };

      drawColRow('Booking ID', bId, 'Client Profile', '', cy);
      cy -= 18;
      drawColRow('Date', dateStr, 'Name', bookingData.name, cy);
      cy -= 18;
      drawColRow('Payment Status', 'PAID', 'Email', bookingData.email, cy);
      cy -= 18;
      drawColRow('Payment Method', 'Razorpay', 'Phone', bookingData.phone, cy);
      cy -= 18;
      drawColRow('Payment ID', razorpay_payment_id || 'N/A', 'City', bookingData.place, cy);
      cy -= 18;
      drawColRow('Weight / Height', `${bookingData.weight || 'N/A'} / ${bookingData.height || 'N/A'}`, 'Age', bookingData.age, cy);
      cy -= 18;
      drawColRow('Goal', bookingData.goal || 'General Health', 'Diet/Allergies', bookingData.allergies || 'None', cy);

      // Program Details Box
      cy = height - 425;
      page.drawRectangle({ x: 30, y: cy, width: 535, height: 75, color: lightGrayColor });
      cy += 55;
      page.drawText('Enrolled Program Details', { x: 40, y: cy, size: 10, font: boldFont, color: darkColor });
      cy -= 16;

      const drawProgRow = (lbl: string, val: string, yOff: number) => {
        page.drawText(safeString(lbl), { x: 40, y: yOff, size: 9, font, color: darkColor });
        page.drawText(':', { x: 135, y: yOff, size: 9, font, color: darkColor });
        page.drawText(safeString(val), { x: 150, y: yOff, size: 9, font, color: darkColor });
      };

      drawProgRow('Program Package', bookingData.packageLabel, cy);
      cy -= 16;
      drawProgRow('Batch / Schedule', bookingData.isOnline ? 'Starts Immediately Upon Onboarding' : `${bookingData.month} ${bookingData.day === '1' ? '1st' : '15th'}`, cy);
      cy -= 16;
      drawProgRow('Location / Mode', bookingData.isOnline ? 'Online (Home Coaching & Weekly Check-ins)' : 'In-Person Camp, Shimla (Pincode 171219)', cy);

      // Fee Details Table
      cy = height - 470;
      page.drawText('Fee Breakdown', { x: 30, y: cy, size: 10, font: boldFont, color: darkColor });
      cy -= 10;

      // Header
      page.drawRectangle({ x: 30, y: cy - 20, width: 535, height: 20, color: primaryColor });
      page.drawText('Description', { x: 40, y: cy - 14, size: 9, font: boldFont, color: rgb(1, 1, 1) });
      page.drawText('Amount (INR)', { x: 470, y: cy - 14, size: 9, font: boldFont, color: rgb(1, 1, 1) });

      cy -= 20;

      const drawFeeRow = (desc: string, amt: any, isTotal = false) => {
        let rowHeight = 20;
        if (isTotal) {
          page.drawRectangle({ x: 30, y: cy - rowHeight, width: 535, height: rowHeight, color: greyBg });
        }

        // Borders
        page.drawLine({ start: { x: 30, y: cy }, end: { x: 30, y: cy - rowHeight }, thickness: 1, color: borderColor });
        page.drawLine({ start: { x: 565, y: cy }, end: { x: 565, y: cy - rowHeight }, thickness: 1, color: borderColor });
        page.drawLine({ start: { x: 350, y: cy }, end: { x: 350, y: cy - rowHeight }, thickness: 1, color: borderColor });
        page.drawLine({ start: { x: 30, y: cy - rowHeight }, end: { x: 565, y: cy - rowHeight }, thickness: 1, color: borderColor });

        page.drawText(safeString(desc), { x: 40, y: cy - 14, size: 9, font: isTotal ? boldFont : font, color: darkColor });
        const amtStr = formatINR(amt);
        page.drawText(safeString(amtStr), { x: 470, y: cy - 14, size: 9, font: isTotal ? boldFont : font, color: darkColor });

        cy -= rowHeight;
      };

      if (bookingData.isOnline) {
        drawFeeRow('Fat2Fit 3-Month Online Pass Fee', bookingData.base);
        drawFeeRow('Total Amount', bookingData.total, true);
        drawFeeRow('Amount Paid (Full Payment)', bookingData.advance);
        drawFeeRow('Remaining Balance', 0);
      } else {
        drawFeeRow('Program Base Fee (per person)', bookingData.base);
        drawFeeRow('GST (18%)', bookingData.gst);
        drawFeeRow('Total Program Fee', bookingData.total, true);
        drawFeeRow('Advance Paid (50%)', bookingData.advance);
        drawFeeRow('Remaining Balance (due on arrival)', bookingData.balance);
      }

      // Confirmation Box
      cy -= 25;
      page.drawRectangle({ x: 30, y: cy - 50, width: 535, height: 50, color: yellowBoxBg, borderColor: yellowLineColor, borderWidth: 1 });
      page.drawCircle({ x: 55, y: cy - 25, size: 12, color: yellowLineColor });
      page.drawText('v', { x: 51, y: cy - 29, size: 14, font: boldFont, color: rgb(0, 0, 0) });
      page.drawText('Your registration is confirmed!', { x: 80, y: cy - 18, size: 10, font: boldFont, color: darkColor });
      page.drawText('Thank you for choosing Fat2Fit. Our team will contact you with onboarding guidance.', { x: 80, y: cy - 32, size: 9, font, color: darkColor });

      // Three Icons Area
      cy -= 75;
      page.drawLine({ start: { x: 30, y: cy }, end: { x: 565, y: cy }, thickness: 1, color: borderColor });
      cy -= 22;
      const drawBottomIcon = (x: number, title: string, sub: string) => {
        page.drawCircle({ x: x, y: cy + 5, size: 10, color: primaryColor, opacity: 0.1 });
        page.drawText('+', { x: x - 3, y: cy + 2, size: 11, font: boldFont, color: primaryColor });
        page.drawText(safeString(title), { x: x + 20, y: cy + 5, size: 8, font: boldFont, color: darkColor });
        page.drawText(safeString(sub), { x: x + 20, y: cy - 5, size: 7, font, color: darkColor });
      };

      drawBottomIcon(70, 'Healthy Body', 'Disciplined Mind');
      page.drawLine({ start: { x: 220, y: cy + 12 }, end: { x: 220, y: cy - 12 }, thickness: 1, color: borderColor });
      drawBottomIcon(250, 'Expert Coaching', 'Real Adaptation');
      page.drawLine({ start: { x: 380, y: cy + 12 }, end: { x: 380, y: cy - 12 }, thickness: 1, color: borderColor });
      drawBottomIcon(410, 'Wholesome Nutrition', 'Sustainable Results');

      cy -= 18;
      page.drawLine({ start: { x: 30, y: cy }, end: { x: 565, y: cy }, thickness: 1, color: borderColor });

      // Footer
      page.drawRectangle({ x: 0, y: 0, width, height: 35, color: primaryColor });
      page.drawText('FAT2FIT  |  RETREAT, SHIMLA & ONLINE  |  www.fat2fit.in', { x: 30, y: 13, size: 9, font: boldFont, color: rgb(1, 1, 1) });
      page.drawText('Thank You!', { x: 490, y: 13, size: 13, font: boldFont, color: rgb(1, 1, 1) });

      pdfBase64 = await pdfDoc.saveAsBase64();
    } catch (pdfErr) {
      console.error('PDF Generation Error:', pdfErr);
    }

    // 4. Send Confirmation Emails via Gmail SMTP
    const gmailUser = Deno.env.get('GMAIL_USER');
    const gmailPassword = Deno.env.get('GMAIL_APP_PASSWORD'); 

    if (gmailUser && gmailPassword) {
      const customerHtml = `
        <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto; color: #222; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background: #c0272d; color: white; padding: 25px; text-align: center;">
            <h1 style="margin: 0; font-size: 26px;">Registration & Payment Confirmed</h1>
            <p style="margin: 5px 0 0; opacity: 0.9;">Fat2Fit Weight Loss Reset</p>
          </div>
          <div style="padding: 25px;">
            <p>Hi <strong>${bookingData.name}</strong>,</p>
            <p>Your payment of <strong>₹${bookingData.advance}</strong> for <strong>${bookingData.packageLabel}</strong> has been successfully processed.</p>
            
            <div style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 18px; margin: 20px 0;">
              <h4 style="margin: 0 0 10px; color: #c0272d;">Assessment & Profile Summary</h4>
              <p style="margin: 4px 0;"><strong>City:</strong> ${bookingData.place}</p>
              <p style="margin: 4px 0;"><strong>Age:</strong> ${bookingData.age} years | <strong>Weight:</strong> ${bookingData.weight || 'N/A'} | <strong>Height:</strong> ${bookingData.height || 'N/A'}</p>
              <p style="margin: 4px 0;"><strong>Goal:</strong> ${bookingData.goal || 'Weight Loss'}</p>
              <p style="margin: 4px 0;"><strong>Allergies / Diet:</strong> ${bookingData.allergies || 'None declared'}</p>
              <p style="margin: 4px 0;"><strong>Batch:</strong> ${bookingData.isOnline ? 'Immediate Online Access' : `${bookingData.month} ${bookingData.day}`}</p>
              <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${bookingData.advance}</p>
              ${bookingData.balance > 0 ? `<p style="margin: 4px 0;"><strong>Remaining Balance:</strong> ₹${bookingData.balance} (due upon arrival)</p>` : ''}
            </div>

            <p>Your official tax invoice & receipt is attached to this email as a PDF.</p>
            <p>Our team will contact you on WhatsApp/Email for the next onboarding steps.</p>
            <br>
            <p style="margin: 0;">Best regards,</p>
            <p style="margin: 0; font-weight: bold;">Coach Aditya &amp; The Fat2Fit Team</p>
          </div>
        </div>
      `;

      const ownerHtml = `
        <div style="font-family: sans-serif; max-width: 620px; margin: 0 auto; color: #222; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background: #2c7a3f; color: white; padding: 25px; text-align: center;">
            <h2 style="margin: 0;">New Registration & Payment Received!</h2>
          </div>
          <div style="padding: 25px;">
            <p>A new client has completed registration and payment:</p>
            <ul style="line-height: 1.8;">
              <li><strong>Name:</strong> ${bookingData.name}</li>
              <li><strong>Email:</strong> ${bookingData.email}</li>
              <li><strong>Phone:</strong> ${bookingData.phone}</li>
              <li><strong>City:</strong> ${bookingData.place}</li>
              <li><strong>Age / Weight / Height:</strong> ${bookingData.age} yrs / ${bookingData.weight} / ${bookingData.height}</li>
              <li><strong>Primary Goal:</strong> ${bookingData.goal}</li>
              <li><strong>Diet / Allergies:</strong> ${bookingData.allergies}</li>
              <li><strong>Medical / Health Notes:</strong> ${bookingData.additional}</li>
              <li><strong>Package:</strong> ${bookingData.packageLabel}</li>
              <li><strong>Batch / Schedule:</strong> ${bookingData.month} ${bookingData.day}</li>
              <li><strong>Amount Paid:</strong> ₹${bookingData.advance}</li>
              <li><strong>Balance Due:</strong> ₹${bookingData.balance}</li>
              <li><strong>Razorpay Payment ID:</strong> ${razorpay_payment_id}</li>
            </ul>
            <p>The client's generated invoice is attached.</p>
          </div>
        </div>
      `;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPassword,
        },
      });

      const attachments = pdfBase64 ? [{
        filename: 'Fat2Fit_Invoice.pdf',
        content: pdfBase64,
        encoding: 'base64'
      }] : [];

      // Send to Customer
      try {
        await transporter.sendMail({
          from: `"Fat2Fit" <${gmailUser}>`,
          to: bookingData.email,
          subject: 'Fat2Fit Booking Confirmation & Invoice',
          html: customerHtml,
          attachments
        });
        console.log("Customer email sent successfully");
      } catch (err) {
        console.error('Customer Email Error:', err);
      }

      // Send to Owner
      try {
        await transporter.sendMail({
          from: `"Fat2Fit System" <${gmailUser}>`,
          to: gmailUser,
          subject: `New Registration: ${bookingData.name} (${bookingData.packageLabel})`,
          html: ownerHtml,
          attachments
        });
        console.log("Owner email sent successfully");
      } catch (err) {
        console.error('Owner Email Error:', err);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment verified and booking confirmed',
        pdfBase64: pdfBase64
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Verification Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

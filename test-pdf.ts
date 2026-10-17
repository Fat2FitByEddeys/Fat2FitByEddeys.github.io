import { PDFDocument, StandardFonts, rgb } from 'npm:pdf-lib';

async function createPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.drawText('Invoice for Fat2Fit', { x: 50, y: 700, font, size: 24 });
  const pdfBytes = await pdfDoc.saveAsBase64();
  console.log(pdfBytes.substring(0, 50));
}

createPdf();

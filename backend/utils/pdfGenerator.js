import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateAdmissionPDF = async (admission, student) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const fileName = `admission-${admission.applicationId}.pdf`;
      const filePath = path.join('uploads', 'pdfs', fileName);

      // Create uploads directory if it doesn't exist
      if (!fs.existsSync('uploads/pdfs')) {
        fs.mkdirSync('uploads/pdfs', { recursive: true });
      }

      doc.pipe(fs.createWriteStream(filePath));

      // Header
      doc.fontSize(25).text('ARS Inter College', { align: 'center' });
      doc.moveDown();
      doc.fontSize(18).text('Admission Confirmation', { align: 'center' });
      doc.moveDown(2);

      // Student Details
      doc.fontSize(12);
      doc.text(`Application ID: ${admission.applicationId}`);
      doc.text(`Roll Number: ${student.rollNumber}`);
      doc.text(`Name: ${admission.basicDetails.firstName} ${admission.basicDetails.lastName}`);
      doc.text(`Email: ${admission.basicDetails.email}`);
      doc.text(`Class: ${student.class}`);
      doc.text(`Admission Date: ${new Date().toLocaleDateString()}`);
      doc.moveDown();

      // Payment Details
      doc.text('Payment Details:', { underline: true });
      doc.text(`Transaction ID: ${admission.payment.transactionId}`);
      doc.text(`Amount: ₹${admission.payment.amount}`);
      doc.text(`Payment Date: ${new Date(admission.payment.paymentDate).toLocaleDateString()}`);
      doc.moveDown(2);

      // Instructions
      doc.fontSize(10);
      doc.text('Please bring this document along with original certificates to the school administrator.');
      doc.text('Thank you for being a part of ARS Inter College!');

      doc.end();

      resolve(filePath);
    } catch (error) {
      reject(error);
    }
  });
};

export const generateAdmitCard = async (student, exam) => {
  // Similar implementation for admit card
};

export const generateMarksheet = async (student, examResult) => {
  // Similar implementation for marksheet
};

import nodemailer from 'nodemailer';

const hasCreds = Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS);

let transporter;
if (hasCreds) {
  // Create reusable transporter object using SMTP
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  // Verify connection configuration (non-blocking)
  transporter.verify((error) => {
    if (error) {
      console.log('❌ Email configuration error:', error.message || error);
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
} else {
  console.warn('⚠️  EMAIL_USER/PASS not set. Email sending will be logged to console.');
  transporter = {
    // Mock sendMail for development without credentials
    async sendMail(options) {
      console.log('📧 [DEV-EMAIL] Would send email:', {
        to: options.to,
        subject: options.subject,
      });
      return { messageId: 'dev-mock-message' };
    },
  };
}

export default transporter;

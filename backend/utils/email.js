const nodemailer = require('nodemailer');

// Create transporter based on environment variables
const createTransporter = () => {
  // Use SendGrid if available
  if (process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  // Default SMTP configuration (Gmail recommended to use App Password)
  const port = parseInt(process.env.SMTP_PORT) || 587;
  const secure = port === 465; // true for 465, false for other ports

  console.log(`📧 Creating SMTP transporter: host=${process.env.SMTP_HOST}, port=${port}, secure=${secure}`);
  
  // Make sure we have the required credentials
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Missing SMTP credentials in environment variables');
    throw new Error('Missing SMTP credentials. Please check your environment variables.');
  }
  
  // Remove any spaces from the password that might have been copied incorrectly
  const smtpPass = process.env.SMTP_PASS.replace(/\s+/g, '');
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: smtpPass // Must be an App Password if using Gmail
    },
    tls: {
      rejectUnauthorized: false
    },
    logger: true,  // Enable logging for debugging
    debug: true    // Show connection debug info
  });
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Portfolio Contact: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff; border-bottom: 2px solid #7b61ff; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Details</h3>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Submitted:</strong> ${new Date(contactData.timestamp).toLocaleString()}</p>
          </div>
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3>Message</h3>
            <p style="white-space: pre-wrap;">${contactData.message}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}
Submitted: ${new Date(contactData.timestamp).toLocaleString()}

Message:
${contactData.message}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent:', info.messageId);
    return info;

  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    throw error;
  }
};

// Send auto-reply to user
const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Rohit Dutta" <${process.env.SMTP_USER}>`,
      to: contactData.email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d4ff;">Thank You for Your Message!</h2>
          <p>Hi ${contactData.name},</p>
          <p>I've received your message about "<strong>${contactData.subject}</strong>" and will get back to you shortly.</p>
          <p>Meanwhile, you can:</p>
          <ul>
            <li>Visit my <a href="${process.env.FRONTEND_URL}">portfolio</a></li>
            <li>Connect on <a href="https://www.linkedin.com/in/rohit-dutta-64b0242a0/">LinkedIn</a></li>
            <li>Check out my <a href="https://github.com/riku-d">GitHub</a></li>
          </ul>
          <p>Best regards,<br>Rohit Dutta</p>
        </div>
      `,
      text: `
Thank You for Your Message!

Hi ${contactData.name},

I've received your message about "${contactData.subject}" and will get back to you shortly.

Meanwhile, you can:
- Visit my portfolio
- Connect on LinkedIn
- Check out my GitHub

Best regards,
Rohit Dutta
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Auto-reply sent:', info.messageId);
    return info;

  } catch (error) {
    console.error('❌ Error sending auto-reply:', error);
    throw error;
  }
};

module.exports = {
  sendContactEmail,
  sendAutoReply
};

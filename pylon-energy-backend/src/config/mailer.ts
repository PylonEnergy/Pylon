import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

function createTransporter() {
  const host = process.env.SMTP_HOST || "";
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  if (!user || !pass || !host) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: false, // STARTTLS on port 587
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
}

export async function sendLeadMail(lead: any) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "info@pylonenergy.com.au";
  const fromUser = process.env.SMTP_USER || "";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ddd;border-radius:8px;overflow:hidden;">
      <div style="background:#002B5C;padding:20px;text-align:center;">
        <h2 style="color:#FF6B35;margin:0;">⚡ New Solar Quote Inquiry</h2>
        <p style="color:#fff;margin:4px 0 0;">Pylon Energy — Lead Notification</p>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;color:#555;width:120px;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${lead.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${lead.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${lead.phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Postcode</td><td style="padding:8px;border-bottom:1px solid #eee;">${lead.postcode}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Interest</td><td style="padding:8px;border-bottom:1px solid #eee;">${lead.interest}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Message</td><td style="padding:8px;">${lead.message || "N/A"}</td></tr>
        </table>
      </div>
      <div style="background:#f5f5f5;padding:12px;text-align:center;font-size:12px;color:#888;">
        Sent automatically by Pylon Energy Website
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("[MAILER] SMTP not configured — skipping email. Check SMTP_USER/SMTP_PASS in .env");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Pylon Energy Alerts" <${fromUser}>`,
      to: adminEmail,
      subject: `🌞 New Lead Inquiry - ${lead.name} (${lead.postcode})`,
      html,
    });
    console.log("[MAILER] Lead email sent:", info.messageId);
  } catch (err: any) {
    console.error("[MAILER] Lead email failed:", err.message);
  }
}

export async function sendContactMail(contact: any) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "info@pylonenergy.com.au";
  const fromUser = process.env.SMTP_USER || "";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ddd;border-radius:8px;overflow:hidden;">
      <div style="background:#002B5C;padding:20px;text-align:center;">
        <h2 style="color:#FF6B35;margin:0;">📬 New Contact Form Submission</h2>
        <p style="color:#fff;margin:4px 0 0;">Pylon Energy — Contact Notification</p>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;font-weight:bold;color:#555;width:120px;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${contact.name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${contact.email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${contact.phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Message</td><td style="padding:8px;">${contact.message}</td></tr>
        </table>
      </div>
      <div style="background:#f5f5f5;padding:12px;text-align:center;font-size:12px;color:#888;">
        Sent automatically by Pylon Energy Website
      </div>
    </div>
  `;

  if (!transporter) {
    console.log("[MAILER] SMTP not configured — skipping email. Check SMTP_USER/SMTP_PASS in .env");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"Pylon Energy Alerts" <${fromUser}>`,
      to: adminEmail,
      subject: `📩 New Contact Inquiry - ${contact.name}`,
      html,
    });
    console.log("[MAILER] Contact email sent:", info.messageId);
  } catch (err: any) {
    console.error("[MAILER] Contact email failed:", err.message);
  }
}

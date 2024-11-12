import nodemailer from "nodemailer";

interface EmailOptions {
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD
  }
});

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    return transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    throw error;
  }
}

export const htmlTemplate = ({
  status,
  isSuccess,
  url
}: {
  status: "completed" | "failed";
  isSuccess: boolean;
  url: string;
}) => {
  return `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            Your video generation process has ${status}.
          </p>

          ${
            isSuccess
              ? `
            <p style="text-align: center; margin-top: 20px;">
              <a href="${url}" style="background-color: #000000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Your Video</a>
            </p>
          `
              : `
            <p style="text-align: center; margin-top: 20px;">
              <a href="${url}" style="background-color: #000000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Open Video</a>
            </p>
              `
          }
          <p style="font-size: 14px; color: #888; margin-top: 20px; text-align: center;">
            This is an automated notification. Please do not reply to this email.
          </p>
        </div>
      `;
};

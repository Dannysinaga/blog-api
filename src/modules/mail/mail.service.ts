import { createTransport, Transporter } from "nodemailer";

export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // email
        pass: process.env.MAIL_PASS, // app password
      },
    });
  }

  sendMail = async (to: string, subject: string) => {
    await this.transporter.sendMail({
      to: to,
      subject: subject,
    });
  };
}

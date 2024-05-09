import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: any;
}) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "79258aca71c3d8",
        pass: "0b844c78cb3403",
      },
    });
    const mailOptions = {
      from: "", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : emailType === "RESET"
          ? "Reset your Password"
          : "Email Verified Successfully", // Subject line
      html:
        emailType === "VERIFIED"
          ? "<p>Wohoo! Your Email is Verified Successfully."
          : `<p>Click <a href="${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}">here</a> to ${
              emailType === "VERIFY"
                ? "verify your email"
                : "reset your password"
            }
      or copy and paste the link below in your browser. <br><br/> <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
      </a>
      </p>`, // html body
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import jwt, {JwtPayload} from "jsonwebtoken";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"

export const comparePassword = async (
    passwordInput: string,
    passwordUser: string
): Promise<boolean> => {
    try {
        return await bcrypt.compare(passwordInput, passwordUser);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw new Error("Password is not correct.");
    }
};
export const verifyToken = async (
    rfToken: string,
    variableEnvironment: string
): Promise<string | JwtPayload> => {
    try {
        const decoded = jwt.verify(rfToken, variableEnvironment);
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

export const verifyEmail = async (email: string): Promise<boolean> => {
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(email.toLowerCase());
    } catch (error) {
        throw new Error("Invalid email format");
    }
};

export const hashedPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error("Hash password error");
    }
};

export const sendEmail = async (email: string, newPassword: string, name: string): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "hieuservices7@gmail.com",
                pass: "czccqkfpiecpqehj"
            }
        })
        const _html = `
            <html>
            <head>
                <title>Food Delivery Website Forgot Password Email</title>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <style type="text/css">
                    /* Base */
                    body {
                        margin: 0;
                        padding: 0;
                        min-width: 100%;
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        line-height: 1.5;
                        background-color: #fafafa;
                        color: #222222;
                    }

                    a {
                        color: #000;
                        text-decoration: none;
                    }

                    h1 {
                        font-size: 24px;
                        font-weight: 700;
                        line-height: 1.25;
                        margin-top: 0;
                        margin-bottom: 15px;
                        text-align: center;
                    }

                    p {
                        margin-top: 0;
                        margin-bottom: 24px;
                    }

                    table td {
                        vertical-align: top;
                    }

                    /* Layout */
                    .email-wrapper {
                        max-width: 600px;
                        margin: 0 auto;
                    }

                    .email-header {
                        background-color: #0070f3;
                        padding: 24px;
                        color: #ffffff;
                    }

                    .email-body {
                        padding: 24px;
                        background-color: #ffffff;
                    }

                    .email-footer {
                        background-color: #f6f6f6;
                        padding: 24px;
                    }

                    /* Buttons */
                    .button {
                        display: inline-block;
                        background-color: #0070f3;
                        color: #ffffff;
                        font-size: 16px;
                        font-weight: 700;
                        text-align: center;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
            <div class="email-wrapper">

                <div class="email-body">
                    <p>Hello ${name},</p>
                    <p>
                        We received a request to reset your password. To proceed, here is new password you can login:
                    </p>


                    <div class="button"> ${newPassword}</div>

                    <p>
                        If you did not request a password reset, you can ignore this email.
                    </p>
                </div>
                <div class="email-footer">
                    <p>
                        If you have any questions, please don't hesitate to contact us at
                        <a href="mailto:hieuservices7@gmail.com">support@hieuservice.com</a>
                    </p>
                </div>
            </div>
            </body>
            </html>`
        const mailOptions = {
            from: "hieuservices7@gmail.com",
            to: email,
            subject: "Generate new password",
            html: _html
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw err;
            } else {
                console.log(info.response)
            }
        })
    } catch (error) {
        throw new Error("Send email error");
    }
}
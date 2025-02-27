import nodemailer, { Transporter } from 'nodemailer';
import logger from './logger';
import { ApiError } from './ApiError';
import dotenv from 'dotenv';
dotenv.config()

interface EmailTemplateProps {
  activationToken: string;
  username: string;
}

interface EmailTemplatePropsOTP {
    OTP: string;
    username: string;
}

const transporter: Transporter = nodemailer.createTransport({
  service: process.env.SERVICE_EMAIL ,
  host: process.env.EMAIL_HOST ,
  port: Number(process.env.EMAIL_PORT),
  secure: true, //
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  //debug: true, // Enable debug output
  //logger: true, // Log information to console
});




export const sendEmailVerification = async (
  email: string,
  username: string,
  activationToken: string
) => {

  const emailTemplate = ({ activationToken, username }: EmailTemplateProps) => {
    return `
      <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
      <p>Click the link below to activate your account:</p>
      <a href="http://${process.env.DOMAIN}/auth/verify?token=${activationToken}">Activate Account</a>
    `;
  };

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Activate Your Account",
    html: emailTemplate({ activationToken, username }),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Activation email sent to ${email}`);
  } catch (err) {
    console.error('Error sending email:', err);
    logger.error(err);
    throw new ApiError("Internal server Error", 500);
  }
};










export const sendForgotPassToken = async (
  email: string,
  username: string,
  activationToken: string
) => {
  const emailTemplate = ({ activationToken, username }: EmailTemplateProps) => {
    return `
      <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
      <p>Click the link below to reset your password:</p>
      <a href="http://${process.env.DOMAIN}/auth/verifyResetCode?token=${activationToken}">Reset Password</a>
    `;
  };

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Your Password",
    html: emailTemplate({ activationToken, username }),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Reset Password sent to  ${email}`);
  } catch (err) {
    logger.error(err);
    throw new ApiError("Internal server Error", 500);
  }
};








export const sendOTP = async (
    email: string,
    username: string,
    OTP: string
  ) => {
    const emailTemplate = ({ OTP, username }: EmailTemplatePropsOTP) => {
      return `
        <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
        <p>Your One Time Password (OTP) is : ${OTP}</p>
      `;
    };
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your Login OTP",
      html: emailTemplate({ OTP , username }),
    };
  
    try {
      await transporter.sendMail(mailOptions);
      logger.info(`OTP sent to  ${email}`);
    } catch (err) {
      logger.error(err);
      throw new ApiError("Internal server Error", 500);
    }
  };











export const passwordChangedNotify = async (
  email: string,
  username: string
) => {
  const emailTemplate = (username: string) => {
    return `
      <h1>Welcome to ${process.env.DOMAIN}, ${username}!</h1>
      <p>Your Password has been changed , If you believe you didn't change it , please change your password and verify your information</p>
    `;
  };

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset Your Password",
    html: emailTemplate(username),
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Reset Password sent to  ${email}`);
  } catch (err) {
    logger.error(err);
    throw new ApiError("Internal server Error", 500);
  }
};
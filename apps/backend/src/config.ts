import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET=process.env.JWT_SECRET 
export const RESEND_KEY=process.env.RESEND_KEY;
export const APP_URL= process.env.APP_URL;

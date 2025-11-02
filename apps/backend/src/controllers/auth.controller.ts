import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "@repo/db"
import { APP_URL, JWT_SECRET, RESEND_KEY } from "../config";

const resend = new Resend(RESEND_KEY!);

async function sendMagicLink({
    email,
    username,
    link,
    type
} : {
    email: string;
    username? : string;
    link: string;
    type: "signup" | "signin"
}) 
{
    const subject = 
    type === "signup" ? "Complete Signup" : "Your login link";

    const html = 
    type === "signup"
        ? `<p>Welcome! ${username} Click <a href="${link}">here</a> to finish signing up.</p>`
        : `<p>Click <a href="${link}">here</a> to sign in. Link valid for 15 minutes. </p>`;
    await resend.emails.send({
      from: "Anflow <noreply@mail-anflow.aniruddha.xyz>",
      to: email,
      subject: subject,
      html: html
     });
}

export const signupController = async(req: Request, res: Response)=> {
     const userCreated = SignupSchema.safeParse(req.body);
    if(userCreated.error){
        res.status(404).json({
            message: "Invalid inputs"
        });
        return;
    }
    const { username, email } = userCreated.data;

    const existingUser = await prismaClient.user.findUnique({
        where: {
            email
        }
    });
    if(existingUser){
        res.json({
            message: "User already exists please signin"
        });
        return;
    }

    const token = jwt.sign(
        { type: "signup", email, username}, JWT_SECRET!,
        {
            expiresIn: "15m"
        }
    );
    const link =  `${APP_URL!}/auth/callback?token=${token}`;
    try {
        await sendMagicLink({email, username, link, type: "signup"});
        res.status(200).json({
            message: "Signup Magicink sent successfully"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Failed to send Magicink"
        })
    }
}

export const signinController= async(req: Request , res:Response)=> {
    const userSignin = SigninSchema.safeParse(req.body);

    if(!userSignin.success){
        res.status(404).json({
            message:"Invalid Email"
        });
        return;
    }
    const { email } = userSignin.data;

    const existingUser = await prismaClient.user.findUnique({
        where: {
            email
        }
    });
    if(!existingUser){
        res.status(400).json({
            message: "User not found, please signup"
        });
        return;
    }
    

    const token = jwt.sign({type: "signin", email}, JWT_SECRET!, {
        expiresIn: "15m"
      }
    );
    const link = `${APP_URL!}/auth/callback?token=${token}`;

    await sendMagicLink({email, link, type: "signin"})

    res.status(200).json({
        message: "Signin MagicLink sent"
    });
}


export const callback = async(req:Request, res:Response) => {
    const { token } = req.query;
    if(!token){
        res.status(400).json({
            message: "Missing Token"
        });
        return;
    }

    try{
        const payload = jwt.verify(token as string, JWT_SECRET!);
        const { type, email, username } = payload as any;

        if(type === "signup"){
            //db call
            const existingUser = await prismaClient.user.findUnique({
                where: {
                    email
                }
            });
            if(!existingUser){
                await prismaClient.user.create({
                    data: {
                        username,
                        email
                    }
                });
                console.log("New Signup", {email,username});
            }
            res.json({
                message: `Signed up successfully ${email}`
            });
            return;
        }
        if(type === "signin"){
            const existingUser = await prismaClient.user.findUnique({
                where: {
                    email
                }
            });
            if(!existingUser){
                res.status(404).json({
                    message: "User not found, Please signup first"
                });
                return;
            }
            console.log("Signed in", email);
            res.json({
                message: `Signed in as ${email}`
            });
            return;
        }
    }catch(err){
        console.log(err);
        res.status(400).json({
            message:"Invalid/Expired token"
        })
    }
}

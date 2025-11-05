import { prismaClient } from "@repo/db";
import { Request, Response } from "express";
import { Resend } from "resend";

export const resendService = async(req:Request, res:Response) => {
  try{
    const userId = req.user?.id;
    if(!userId){
      res.status(401).json({
        message: "Unauthorized"
      });
      return;
    }
    const { to, html, subject } = req.body;
    if(!to || !html || !subject){
      res.json(400).json({
        message: "All fields required"
      });
      return
    }
    const getCredential = await prismaClient.credential.findFirst({
      where:{
        userId,
        platform: "GMAIL"
      }
    });
    if(!getCredential){
      res.status(401).json({
        message: "Credential not found"
      });
      return;
    }

    const { apiKey, fromEmail } = getCredential.data as any;
    if(!apiKey || !fromEmail){
      res.status(401).json({
        message: "Missing credentials"
      });
      return;
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: Array.isArray(to) ? to : [to],//resend requires array
    subject: subject,
    html:html,
    });
    
    if(error){
      res.status(500).json({
        message: "Error", error
      });
      return;
    }
    res.json({
      message:"Email sent successfully ", data
    });
    }catch(err){
    console.log(err);
    res.status(500).json({
      message: "Server error"
    });
  }
}
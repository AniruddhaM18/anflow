import { Request, Response } from "express";
import { webhookSchema } from "../types";
import { prismaClient } from "@repo/db";
import { APP_URL } from "../config";

export const getWebhook = async(req:Request, res:Response)=> {
    try{
        const userId = req.user?.id;
        if(!userId){
            res.status(400).json({
                message: "Unauthorized"
            });
            return;
        }
        const webhook = webhookSchema.safeParse(req.query);
        if(!webhook.success){
            res.status(401).json({
                message: "Invalid webhook"
            });
            return;
        }
        const { title } = webhook.data;
        const { workflowId } = req.params;
        
        const websHook = await prismaClient.webhook.create({
            data: {
                title,
                workflowId: workflowId as any
            }
        });

        const webhookURL = `${APP_URL}/webhook/handler/${websHook.id}`
        return res.json({
            message: "Webhook created", websHook, url: webhookURL
        });
    }catch(err){
        console.log(err);
        res.status(404).json({
            message: "Error creating webhooks"
        });
    }
}


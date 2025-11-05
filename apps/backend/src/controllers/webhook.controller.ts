import { Request, Response } from "express";
import { APP_URL } from "../config";
import { webhookSchema } from "../types";
import { prismaClient } from "@repo/db";

const generateWebhookURL = (webhookId: string) => {
    return `${APP_URL}/webhook/handler/${webhookId}`;
}

export const createWebhook = async(req: Request, res: Response) => {
    try{
        const parsed = webhookSchema.safeParse(req.body);
        if(!parsed.success){
            res.status(400).json({
                message: "Invalid Webhook"
            });
            return;
        }
        const { method } = parsed.data;
        const userId = req.user?.id;
        const workflowId = req.params.webhookId;


        if(!userId){
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        if(!workflowId){
            res.status(400).json({
                message: "Workflow Required"
            });
            return;
        }
        const workflow = await prismaClient.workflow.findFirst({
            where: {
                id: workflowId, userId
            }
        });
        //create a webhook with placeholder url
        const webhook = await prismaClient.webhook.create({
            data: {
                title: workflow?.title as any,
                method,
                workflowId,
                url: "pending"
            }
        });

        //genrating and saving url
        const url = generateWebhookURL(webhook.id);
        const updatedWebhook = await prismaClient.webhook.update({
            where:{
                id: webhook.id,
            },
            data: {
                url
            }
        });
        return res.json({
            message: "Webhook Generated : ", updatedWebhook
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internet Server Error"
        });
    }
}

export const getWebhook = async(req:Request, res:Response) => {
    try{
    const userId = req.user?.id;
    const webhookId = req.params.id;

    if(!userId){
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }
    if(!webhookId){
        res.status(400).json({
            message: "Workflow required"
        });
        return;
    }
    const webhook = await prismaClient.webhook.findFirst({
        where: {
            id: webhookId, 
            workflow: { userId}
        }
    });
    if(!webhook){
        res.status(404).json({
            message:"Webhook not found"
        });
        return;
    }
    res.json({
        message: "Webhook : ", webhook
    });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internet Server error"
        });
    }
}

export const deleteWebhook = async(req:Request, res:Response)=> {
    try{
        const userId = req.user?.id;
        const webhookId = req.params.id;
        if(!userId){
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        if(!webhookId){
            res.status(400).json({
                message: "Webhook required"
            });
            return;
        }
        const webhook  = await prismaClient.webhook.findFirst({
            where: {id:webhookId,
                workflow: {userId}
            }
        });
        if(!webhook){
            res.status(404).json({
                message: "Webhook not found"
            });
            return;
        }
        await prismaClient.webhook.delete({
            where:{
                id: webhookId
            }
        });
        res.json({
            message: "Webhook deleted"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internet server error"
        });
    }
}

//public trigger no auth
//get /webhook/handler/:id

export const webhookHandler = async(req:Request, res: Response)=> {
    try{
    const webhookId = req.params.id;
    const webhook = await prismaClient.workflow.findUnique({
        where: {
            id: webhookId
        }
    });
    if (!webhook) return res.status(404).json({ 
        message: "Webhook not found" 
    });

    // Placeholder: trigger workflow engine
    console.log("Webhook triggered:", webhookId, "query:", req.query);
    res.json({
        message: "Status: OK"
    })
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

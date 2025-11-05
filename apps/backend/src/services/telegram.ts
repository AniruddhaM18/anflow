import { prismaClient } from "@repo/db";
import { Request, Response } from "express";
import TelegramBot from "node-telegram-bot-api";

export const sendTelegramMessage = async(req:Request, res:Response)=> {
    try{
        const userId = req.user?.id;
        if(!userId){
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }

        const { chatId, message } = req.body;
        if(!chatId || !message){
            res.status(400).json({
                message: "All fields required"
            });
            return;
        }
        const getCredential = await prismaClient.credential.findFirst({
            where:{
                userId,
                platform:"TELEGRAM"
            }
        });

        if(!getCredential){
            res.status(401).json({
                message: "Telegram credential not found"
            });
            return;
        }

        const { botToken } = getCredential?.data as any;
        const bot = new TelegramBot(botToken);
        await bot.sendMessage(chatId, message);
        res.json({
            message:"Telegram message sent successfully"
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error sending message"
        });
    }
}

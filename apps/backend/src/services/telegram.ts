import { prismaClient } from "@repo/db";
import TelegramBot from "node-telegram-bot-api";

export async function sendTelegramMessage({
    userId, 
    chatId,
    message
}: {
    userId: string,
    chatId: string,
    message: string
}) {
    if(!userId) throw new Error("Unauthorized");
    if(!chatId || !message) throw new Error("All fields required");

    const getCredential = await prismaClient.credential.findFirst({
        where:{
            userId,
            platform:"TELEGRAM"
        }
    });
    if(!getCredential) throw new Error("Credential not found");

    const { botToken } = getCredential.data as any;
    const bot  = new TelegramBot(botToken);

    return bot.sendMessage(chatId, message);
}
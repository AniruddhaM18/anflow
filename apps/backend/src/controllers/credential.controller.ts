import { Request, Response } from "express";
import { createWorkflowSchema } from "../types";
import { prismaClient } from "@repo/db";

export const createCredential = async(req:Request, res:Response) => {
    try{
        const userId = req.user?.id;
        if(!userId){
            res.status(401).json({
                message: "Unauthaurized"
            });
            return;
        }

        const creden = createWorkflowSchema.safeParse(req.body);
        if(!creden.success){
            res.status(401).json({
                message: "Invalid Inputs"
            });
            return;
        }

        const { platform, data } = creden.data as any;

        const createCredens = await prismaClient.credential.create({
            data: {
                platform,
                data,
                userId
            }
        });
        return res.json({
            message: "Credential created successfully", createCredens
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error creating credential"
        });
    }
}

export const deleteCredential = async(req:Request, res:Response) => {
    try{
        const userId = req.user?.id;
        const { id } = req.params;

        if(!userId){
            res.status(402).json({
                message: "Unauthorized"
            });
            return;
        }
        const existing = await prismaClient.credential.findFirst({
            where: {
                id,
                userId
            }
        });
        if(!existing){
            res.status(401).json({
                message: "Credential not found"
            });
            return;
        }
        //delete call
        await prismaClient.credential.delete({
            where: { 
                id,
                userId
             }
        });
        return res.json({
            message: "Credential deleted Successfully"
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Error deleting credential"
        })
    }
}
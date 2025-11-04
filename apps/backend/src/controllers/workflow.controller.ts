import { Request, Response } from "express";
import { createWorkflowSchema } from "../types";
import { prismaClient } from "@repo/db";
import { any } from "zod";

export const createWorkflow = async (req : Request, res: Response) => {
    try {
    const workflow =  createWorkflowSchema.safeParse(req.body);
    
    if(!workflow.success) {
        return res.status(400).json({
            message:"Error creating workflow"
        })
    }
    const { title, nodes, connections } = workflow.data;
    const newWorkflow = await prismaClient.workflow.create({
        data: {
            title,
            nodes: nodes as any,
            connections,
            userId: req.userId
        }
    });
    return res.json({
        message: "Workflow created successfully",
        workflow: newWorkflow
    });

    }catch(err){
        console.log(err);
        res.status(404).json({
            message:"Error creating workflows"
        });
    }
}

export const getAllWorkflows = async(req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if(!userId){
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        const allWorkflows = await prismaClient.workflow.findMany({
            where: {
                userId
            }
        });
        return res.json(allWorkflows);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error fetching workflows"
        });
    }
}

export const getWorkflow = async(req: Request, res: Response) => {
    try{
        const userId = req.user?.id;
        const { id } = req.params;
        if(!userId){
            res.json(401).json({
                message: "Unauthorized"
            })
            return;
        }
        const getAWorkfloW = await prismaClient.workflow.findUnique({
            where: {
                id,
                userId
            }
        });
        if(!getAWorkfloW) {
            res.status(404).json({
                message: "Worlflow not found"
            });
            return;
        }
    } catch(err) {
        console.log(err);
        res.status(404).json({
            message: "Error fetching workflows"
        })
    }
}

export const updateWorkflow = async(req: Request, res: Response) => {
    try{
        const userId = req.user?.id;
        const {id} = req.params;
        if(!userId){
            res.status(401).json({
                message: "Unauthaurized"
            });
            return;
        }
        const parsed = createWorkflowSchema.safeParse(req.body);
        if(!parsed.success){
            res.status(400).json({
                message: "Invalid Schema"
            })
        }
        const { title, nodes, connections } = parsed.data as any;

        const existing = await prismaClient.workflow.findFirst({
            where: {
                id,
                userId
            }
        });

        if(!existing){
            res.status(401).json({
                message: "Workflow not found"
            });
            return;
        }
        // update workflow
        const updated = await prismaClient.workflow.update({
            where: { id },
            data: {
                title,
                nodes,
                connections
            }
        });
        res.json(updated);
        return;
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating workflow"
        })
    }
}

export const deleteWorkflow = async(req :Request, res: Response)=> {
    try{
        const userId = req.user?.id;
        const { id } = req.params;
        if(!userId){
            res.status(401).json({
                message: "Unauthorized"
            });
            return;
        }
        const existing = await prismaClient.workflow.findFirst({
            where: {
                id,
                userId
            }
        });
        if(!existing){
            res.status(401).json({
                message: "Workflow not found"
            });
            return;
        }
        //delete
        await prismaClient.workflow.delete({
            where: { id }
        });
        return res.json({
            message: "Workflow deleted Successfully"
        });
    } catch(err){
        console.log(err);
        res.status(404).json({
            message: "Error deleting workflow"
        });
    }
}

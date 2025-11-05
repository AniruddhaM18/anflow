import { email, positive, z } from "zod";


//auth typess
export const SignupSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.email()
});

export const SigninSchema = z.object({
    email: z.email()
});

//workflow types

export const nodeSchema = z.object({
    id: z.string(),
    type: z.string(),
    name: z.string(),
    position : z.tuple([z.number(), z.number()]),
    data: z.unknown(),
    parameters : z.record(z.string(), z.unknown()).default({}).optional()
});

export const connectionSchema = z.record(
    z.string(),
    z.object({
        main: z.array(
            z.array(
                z.object({
                    node: z.string(),
                    type: z.literal("main"),
                    index: z.number().int().nonnegative(),
                })
            )
        )
    })
);

export const createWorkflowSchema = z.object({
    title: z.string(),
    nodes: z.array(nodeSchema),
    connections : connectionSchema
})

export const updateWorkflowSchema = createWorkflowSchema.partial();


export const credentialSchema = z.object({
    platform: z.string(),
    data: z.record(z.string(), z.any()),
});

export const webhookSchema = z.object({
    method: z.enum(["GET", "POST"]).optional().default("GET")
})

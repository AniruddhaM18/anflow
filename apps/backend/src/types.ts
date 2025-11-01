import { email, z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.email()
});

export const SigninSchema = z.object({
    email: z.email()
});
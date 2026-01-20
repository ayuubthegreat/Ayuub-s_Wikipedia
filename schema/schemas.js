import z from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})
export const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
})
export const projectSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    tags: z.string().optional(),
    content: z.string().optional(),
    objectives: z.array(z.object({
        title: z.string().min(3, { message: "Objective must be at least 3 characters long" }),
        description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
        step: z.number().min(1, { message: "Step must be at least 1" }),
    })),
    release_date: z.string(),
})
export const objectiveSchema = z.object({
    title: z.string().min(3, { message: "Objective must be at least 3 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    step: z.number().min(1, { message: "Step must be at least 1" }),
})
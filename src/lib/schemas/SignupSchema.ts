import { z } from 'zod';

export const SignupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

export type SignupForm = typeof SignupSchema;

import { z } from 'zod';

export const CreateInternshipSchema = z.object({
	comment: z.string(),
	companyId: z.number(),
	createdAt: z.string().optional(),
	expectationsVsReality: z.string(),
	hourlyWage: z.string(),
	id: z.number().optional(),
	isAnonymous: z.boolean(),
	learnings: z.string(),
	mentoringValue: z.string(),
	name: z.string(),
	projectDescription: z.string(),
	rating: z.string(),
	socialAspects: z.string(),
	start_date: z.string(),
	end_date: z.string(),
	teamSize: z.string(),
	userId: z.number(),
	technologies: z.array(z.string())
});

export type CreateInternship = typeof CreateInternshipSchema;

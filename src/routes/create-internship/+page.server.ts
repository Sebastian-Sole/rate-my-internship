import { CreateInternshipSchema } from '$lib/schemas/CreateInternshipSchema.js';
import { PrismaClient, type Company } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load({ params }) {
	const prisma = new PrismaClient();
	const getAllCompanies = async () => {
		const companies = await prisma.company.findMany();
		return companies;
	};
	const companies: Company[] = await getAllCompanies();

	return {
		createInternshipForm: await superValidate(zod(CreateInternshipSchema)),
		companies
	};
}

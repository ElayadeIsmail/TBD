import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const levels = [
	{ name: 'Primary 1' },
	{ name: 'Primary 2' },
	{ name: 'Primary 3' },
	{ name: 'Primary 4' },
	{ name: 'Primary 5' },
	{ name: 'Primary 6' },
	{ name: 'Secondary 1 (7th Grade)' },
	{ name: 'Secondary 2 (8th Grade)' },
	{ name: 'Secondary 3 (4eme)' },
	{ name: 'Secondary 5 (5eme)' },
	{ name: 'Secondary 6eme (1st Bac)' },
	{ name: 'Secondary 7 (Bac)' },
];

const subjects = [
	{ name: 'Mathématiques' },
	{ name: 'Physique' },
	{ name: 'Informatique' },
	{ name: 'Langue Française' },
	{ name: 'Langue Anglais' },
	{ name: 'Histoire-Géographie' },
	{ name: 'Philosophie' },
	{ name: 'Sciences et Vie de la Terre (SVT)' },
	{ name: 'Économie' },
	{ name: 'Technologie' },
];

const major = [
	{
		name: 'Littérature',
	},
	{
		name: 'Sciences',
	},
	{
		name: 'Sciences Mathématiques',
	},
	{
		name: 'Physique et Chimie',
	},
	{
		name: 'Sciences Économiques et Sociales (SES)',
	},
	{
		name: 'Sciences et Vie de la Terre (SVT)',
	},
];

async function seed() {
	console.log('🌱 Seeding...');
	console.time(`🌱 Database has been seeded`);

	console.time('🧹 Cleaned up the database...');
	await prisma.user.deleteMany();
	await prisma.level.deleteMany();
	await prisma.majorStudent.deleteMany();
	await prisma.subject.deleteMany();
	console.timeEnd('🧹 Cleaned up the database...');

	await prisma.subject.createMany({
		data: subjects,
	});
	await prisma.level.createMany({
		data: levels,
	});
	await prisma.majorStudent.createMany({
		data: major,
	});

	console.timeEnd(`🌱 Database has been seeded`);
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

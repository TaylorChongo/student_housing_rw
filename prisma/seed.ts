import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'landlord@example.com' },
    update: {},
    create: {
      email: 'landlord@example.com',
      name: 'Sample Landlord',
      password: 'hashedpassword', // In a real app, use bcrypt
      role: 'landlord',
    },
  });

  await prisma.listing.create({
    data: {
      title: 'Beautiful Studio in Kigali',
      description: 'A wonderful place for students.',
      price: 250,
      location: 'Kacyiru, Kigali',
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
      landlordId: user.id,
    },
  });

  console.log('✅ Seeded 1 listing.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

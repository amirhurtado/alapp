import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  // Crear 5 usuarios con perfil
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        email: 'alice@example.com',
        name: 'alice',
        displayName: 'Alice',
        imageUrl: '/user-default',
        profile: {
          create: {
            bio: 'Loves coding',
            location: 'Wonderland',
            website: 'https://alice.dev',
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        name: 'bob',
        displayName: 'Bob',
        imageUrl: '/user-default',
        profile: {
          create: {
            bio: 'Coffee addict',
            location: 'Nowhere',
            website: 'https://bob.io',
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'carol@example.com' },
      update: {},
      create: {
        email: 'carol@example.com',
        name: 'carol',
        displayName: 'Carol',
        imageUrl: '/user-default',
        profile: {
          create: {
            bio: 'Traveler and writer',
            location: 'Everywhere',
            website: 'https://carol.me',
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'dave@example.com' },
      update: {},
      create: {
        email: 'dave@example.com',
        name: 'dave',
        displayName: 'Dave',
        imageUrl: '/user-default',
        profile: {
          create: {
            bio: 'Minimalist dev',
            location: 'City',
            website: 'https://dave.dev',
          },
        },
      },
    }),
    prisma.user.upsert({
      where: { email: 'eve@example.com' },
      update: {},
      create: {
        email: 'eve@example.com',
        name: 'eve',
        displayName: 'Eve',
        imageUrl: '/user-default',
        profile: {
          create: {
            bio: 'Music & code',
            location: 'Internet',
            website: 'https://eve.codes',
          },
        },
      },
    }),
  ]);

  // Crear 10 publicaciones con descripción e imagen
  const descriptions = [
    "First post!",
    "Loving this platform!",
    "Exploring Prisma",
    "React + Next.js ❤️",
    "What a day!",
    "Check this out!",
    "Hello world again",
    "Another project done!",
    "Feeling productive",
    "Final post for now",
  ];

  for (let i = 0; i < 10; i++) {
    await prisma.post.create({
      data: {
        description: descriptions[i],
        imageUrl: '/default-image.jpg',
        author: {
          connect: {
            id: users[i % users.length].id, // Distribuye entre los 5 usuarios
          },
        },
      },
    });
  }

  console.log('✅ Seeded 5 users and 10 posts');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/* eslint-disable no-console */
const { PrismaClient } = require("../src/generated/prisma/index.js");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function upsertUser({ name, username, email, role, password, spesialis = null }) {
  const hash = await bcrypt.hash(password, 10);
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existing) {
    await prisma.user.update({
      where: { id: existing.id },
      data: {
        name,
        username,
        email,
        role,
        spesialis,
        password: hash,
      },
    });
    return;
  }

  await prisma.user.create({
    data: {
      name,
      username,
      email,
      role,
      spesialis,
      password: hash,
    },
  });
}

async function main() {
  await upsertUser({
    name: "Admin User",
    username: "admin",
    email: "admin@gmail.com",
    role: "admin",
    password: "password",
  });

  await upsertUser({
    name: "Dokter User",
    username: "dokter",
    email: "dokter@gmail.com",
    role: "dokter",
    spesialis: "Ortodonti",
    password: "password",
  });

  await upsertUser({
    name: "Resepsionis User",
    username: "resepsionis",
    email: "resepsionis@gmail.com",
    role: "resepsionis",
    password: "password",
  });

  await upsertUser({
    name: "Pasien User",
    username: "pasien",
    email: "pasien@gmail.com",
    role: "pasien",
    password: "password",
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding selesai.");
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

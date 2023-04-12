import { PrismaClient } from "@prisma/client";
import hatsData from "../scraped_hats_data";

const prisma = new PrismaClient();

const main = async () => {
  for (const hat of hatsData) {
    await prisma.hat.create({
      data: hat,
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

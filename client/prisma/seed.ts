import { PrismaClient, StateStatus, Role, Day, $Enums } from "@prisma/client";
import StatusEmployment = $Enums.StatusEmployment;

const prisma = new PrismaClient();

async function main() {
  // USER
  for (let i = 1; i <= 25; i++) {
    await prisma.user.create({
      data: {
        username: `User${i}`,
        email: `user${i}@example.com`,
        password: `**********${i}`,
        lastName: `Фамилия U${i}`,
        firstName: `Имя U${i}`,
        surName: `Отчество U${i}`,
        department: `Дирекция${i}`,
        position: `Должность${i}`,
        phone: `+37529123456${i}`,
        stateStatus: i % 2 === 0 ? StateStatus.contract : StateStatus.freelance,
        role: i % 2 === 0 ? Role.GUEST : Role.USER ? Role.ADMIN : Role.GUEST,
        // img: "/Michel.jpg",
        img: `https://images.pexels.com/photos/936${i}26/pexels-photo-936${i}26.jpeg?auto=compress&cs=tinysrgb&w=1200`,
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        day: Day[
          Object.keys(Day)[
            Math.floor(Math.random() * Object.keys(Day).length)
          ] as keyof typeof Day
        ],
        startDate: new Date(new Date().setDate(new Date().getDate() + i)),
        endDate: new Date(new Date().setDate(new Date().getDate() + i + 1)),
        startTime: new Date(new Date().setHours(new Date().getHours() + i + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + i + 2)),
      },
    });
  }

  // RECIPIENT
  for (let i = 1; i <= 15; i++) {
    await prisma.recipient.create({
      data: {
        username: `Recipient${i}`,
        lastName: `Фамилия R${i}`,
        firstName: `Имя R${i}`,
        surName: `Отчество R${i}`,
        department: `Дирекция${i}`,
        position: `Должность${i}`,
        stateStatus: i % 2 === 0 ? StateStatus.contract : StateStatus.freelance,
        phone: `+37529123456${i}`,
        eventId: (i % 5) + 1,
      },
    });
  }

  // KIT
  for (let i = 1; i <= 5; i++) {
    await prisma.kit.create({
      data: {
        name: `Kit Number ${i}`,
        eventId: (i % 5) + 1,
        recipientId: (i % 5) + 1,
      },
    });
  }

  // const categoryData = [
  //   { catName: "Видео Оборудование" },
  //   { catName: "Звуковое Оборудование" },
  //   { catName: "Световое Оборудование" },
  // ];
  //
  // for (const category of categoryData) {
  //   await prisma.category.create({ data: category });
  // }

  // CATEGORY
  for (let i = 1; i <= 5; i++) {
    await prisma.category.create({
      data: {
        name: `Category ${i}`,
      },
    });
  }

  // SUB CATEGORY LEVEL 1
  for (let i = 1; i <= 5; i++) {
    await prisma.subCategoryLevel1.create({
      data: {
        name: `Sub Category L1 ${i}`,
        categoryId: (i % 5) + 1,
      },
    });
  }

  // SUB CATEGORY LEVEL 2
  for (let i = 1; i <= 5; i++) {
    await prisma.subCategoryLevel2.create({
      data: {
        name: `Sub Category L2 ${i}`,
        subCategoryLevel1Id: (i % 5) + 1,
      },
    });
  }

  // EQUIPMENT
  for (let i = 1; i <= 15; i++) {
    await prisma.equipment.create({
      data: {
        name: `Name ${i}`,
        model: `Model ${i}`,
        company: `Company ${i}`,
        description: `Description for Equipment ${i}`,
        serialNumber: `S/N ${i}`,
        inventoryNumber: `I/N ${i}`,
        datePurchase: `2024 12 0${i}`,
        statusEmployment:
          i % 2 === 0
            ? StatusEmployment.free
            : StatusEmployment.work
              ? StatusEmployment.repair
              : StatusEmployment.repair,
        note: `OK ${i}`,
        kitId: (i % 5) + 1,
        categoryId: (i % 5) + 1,
        subCategoryLevel1Id: (i % 5) + 1,
        subCategoryLevel2Id: (i % 5) + 1,
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

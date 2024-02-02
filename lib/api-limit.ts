import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiUse = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: {
        userId: userId,
      },
      data: { amount: userApiLimit.amount + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: {
        userId: userId,
        amount: 1,
      },
    });
  }
};

export const checkUserApiUsage = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userApiLimit || userApiLimit.amount < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getUserApiUsage = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId: userId,
    },
  });
  if (userApiLimit) {
    return userApiLimit.amount;
  }
  return 0;
};

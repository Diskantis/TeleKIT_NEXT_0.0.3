"use server";

import { KitSchema } from "@/lib/formValidationSchemas";
import prisma from "@/lib/prisma";

type CurrentState = { success: boolean; error: boolean };

// KIT
export const createKit = async (
  currentState: CurrentState,
  data: KitSchema,
) => {
  try {
    let recipientsNum = data.recipients.map((recipient) => parseInt(recipient));
    await prisma.kit.create({
      data: {
        name: data.name,
        recipients: {
          connect: recipientsNum.map((recipientId) => ({
            id: recipientId,
          })),
        },
      },
    });

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateKit = async (
  currentState: CurrentState,
  data: KitSchema,
) => {
  try {
    let recipientsNum = data.recipients.map((recipient) => parseInt(recipient));
    await prisma.kit.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        recipients: {
          set: recipientsNum.map((recipientId) => ({
            id: recipientId,
          })),
        },
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteKit = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  const id = formData.get("id") as string;
  try {
    await prisma.kit.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

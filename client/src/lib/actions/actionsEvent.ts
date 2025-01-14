"use server";

import { EventSchema } from "@/lib/formValidationSchemas";
import prisma from "@/lib/prisma";

type CurrentState = { success: boolean; error: boolean };

// EVENT
export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema,
) => {
  try {
    let recipientsNum = data.recipients.map((recipient) => parseInt(recipient));

    await prisma.event.create({
      data: {
        title: data.title,
        start: data.start,
        end: data.end,
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

export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema,
) => {
  try {
    let recipientsNum = data.recipients.map((recipient) => parseInt(recipient));
    await prisma.event.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
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

export const deleteEvent = async (
  currentState: CurrentState,
  formData: FormData,
) => {
  const id = formData.get("id") as string;
  try {
    await prisma.event.delete({
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

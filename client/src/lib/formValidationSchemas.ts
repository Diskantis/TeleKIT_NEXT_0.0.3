import { z } from "zod";

export const eventSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Обязательное поле!" }),
  start: z.string().datetime(),
  end: z.string().datetime({ precision: 3, message: "Обязательное поле!" }),
  recipients: z.array(z.string()), // recipient ids
});
export type EventSchema = z.infer<typeof eventSchema>;

export const kitSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Обязательное поле!" }),
  recipients: z.array(z.string()), // recipient ids
});

export type KitSchema = z.infer<typeof kitSchema>;

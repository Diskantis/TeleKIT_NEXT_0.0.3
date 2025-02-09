"use client";

import React, {
  Dispatch,
  startTransition,
  useActionState,
  useEffect,
} from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/elements/InputField";
import { EventSchema, eventSchema } from "@/lib/formValidationSchemas";
import { createEvent, updateEvent } from "@/lib/actions/actionsEvent";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EventForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const [state, formAction] = useActionState(
    type === "create" ? createEvent : updateEvent,
    {
      success: false,
      error: false,
    },
  );

  const onSubmit = handleSubmit((data) => {
    startTransition(() => formAction(data));
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(
        `${type === "create" ? "Создание нового события" : "Изменение события"} успешно!`,
      );
      setOpen(false);
      router.refresh();
    }
  }, [state]);

  const { recipients } = relatedData;

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-2xl text-slate-300 font-semibold">
        {type === "create"
          ? "Создание нового события"
          : "Редактирование данных события"}
      </h1>
      <div className="flex justify-between flex-wrap gap-2">
        <InputField
          label="Название"
          name="title"
          size="w-[360px]"
          register={register}
          defaultValue={data?.title}
          error={errors?.title}
        />
        <div className="flex flex-col gap-2 w-[360px]">
          <label className="text-sm text-gray-500">Получатель</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-base w-full bg-gray-700 outline-none"
            {...register("recipients")}
            defaultValue={data?.recipients}
          >
            {recipients.map(
              (recipient: {
                id: number;
                lastName: string;
                firstName: string;
                surName: string;
              }) => (
                <option value={recipient.id} key={recipient.id}>
                  {recipient.lastName +
                    " " +
                    recipient.firstName[0] +
                    ". " +
                    recipient.surName[0] +
                    "."}
                </option>
              ),
            )}
          </select>
          {errors.recipients?.message && (
            <p className="text-xs text-red-400">
              {errors.recipients.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Дата начала"
          name="start"
          type="date"
          size="w-[360px]"
          padding="py-[7px]"
          register={register}
          defaultValue={data?.start}
          error={errors?.start}
        />
        <InputField
          label="Дата окончания"
          name="end"
          type="date"
          size="w-[360px]"
          padding="py-[7px]"
          register={register}
          defaultValue={data?.end}
          error={errors?.end}
        />
        <InputField
          label="Время начала"
          name="start"
          type="time"
          size="w-[360px]"
          padding="py-[7px]"
          register={register}
          defaultValue={data?.start}
          error={errors?.start}
        />
        <InputField
          label="Время окончания"
          name="end"
          type="time"
          size="w-[360px]"
          padding="py-[7px]"
          register={register}
          defaultValue={data?.end}
          error={errors?.end}
        />
        {/*<InputField*/}
        {/*  label="Дата начала"*/}
        {/*  name="start"*/}
        {/*  type="datetime-local"*/}
        {/*  size="w-[360px]"*/}
        {/*  padding="py-[7px]"*/}
        {/*  register={register}*/}
        {/*  defaultValue={data?.start}*/}
        {/*  error={errors?.start}*/}
        {/*/>*/}
      </div>
      <button className="bg-blue-400 text-white mt-2 p-2 rounded-md">
        {type === "create" ? "Создать" : "Обновить"}
      </button>
    </form>
  );
};

export default EventForm;

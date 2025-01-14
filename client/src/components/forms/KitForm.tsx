"use client";

import React, {
  useEffect,
  useActionState,
  Dispatch,
  startTransition,
} from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/elements/InputField";
import { kitSchema, KitSchema } from "@/lib/formValidationSchemas";
import { createKit, updateKit } from "@/lib/actions/actionsKit";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const KitForm = ({
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
  } = useForm<KitSchema>({
    resolver: zodResolver(kitSchema),
  });

  const [state, formAction] = useActionState(
    // createKit,
    type === "create" ? createKit : updateKit,
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
        `${type === "create" ? "Создание нового комплекта" : "Изменение комплекта"} успешно!`,
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
          ? "Создание нового комплекта"
          : "Изменение комплекта"}
      </h1>
      <div className="flex justify-between flex-wrap gap-2">
        <InputField
          label="Название"
          name="name"
          size="w-[360px]"
          register={register}
          defaultValue={data?.name}
          error={errors?.name}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            size="w-[360px]"
            register={register}
            defaultValue={data?.id}
            error={errors?.id}
            hidden
          />
        )}
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
      </div>
      {state.error && (
        <span className="text-red-500">Что-то пошло не так!</span>
      )}
      <button className="bg-blue-400 text-white mt-2 p-2 rounded-md">
        {type === "create" ? "Создать" : "Обновить"}
      </button>
    </form>
  );
};

export default KitForm;

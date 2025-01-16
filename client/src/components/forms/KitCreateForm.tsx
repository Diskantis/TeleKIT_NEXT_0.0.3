"use client";

import React, { startTransition, useActionState, useEffect } from "react";

import { kitSchema, KitSchema } from "@/lib/formValidationSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createKit, updateKit } from "@/lib/actions/actionsKit";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputField from "@/components/elements/InputField";
import TableSearch from "@/components/TableSearch";
import KitEquipmentsContainer from "@/components/KitEquipmentsContainer";

const KitCreateForm = ({
  type,
  data,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
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
      // router.refresh();
      router.push("/list/kits");
    }
  }, [state]);

  const { recipients } = relatedData;

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl text-slate-300 font-semibold">
          {type === "create"
            ? "Создание нового комплекта"
            : "Изменение комплекта"}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>
      {/*WORK AREA*/}
      <div className="w-full flex flex-col">
        <div className="w-full h-[30px] bg-cyan-950 border-b-2 rounded-t-md mb-3"></div>
        <div className="flex flex-row gap-2">
          <div className="w-1/2 bg-gray-700 rounded-md">
            <h2 className="text-xl text-center font-semibold mt-2">Комплект</h2>
            <form className="" onSubmit={onSubmit}>
              <div className="h-[calc(100vh-292px)] flex flex-col justify-between p-2">
                <div className="flex flex-row">
                  <div className="w-1/4 flex flex-col pr-2 gap-2">
                    <InputField
                      label="Название комплекта"
                      name="name"
                      size="w-full"
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
                    <div className="flex flex-col gap-2 ">
                      <label className="text-sm text-gray-400">
                        Закрепить получателя
                      </label>
                      <select
                        multiple
                        className="w-full ring-[1px] ring-gray-300 pl-2 rounded-md text-base bg-gray-700
                        outline-none overflow-y-auto scrollbar"
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
                            <option
                              className="py-1"
                              value={recipient.id}
                              key={recipient.id}
                            >
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
                  <div className="w-3/4 flex flex-col pl-2 gap-2">
                    <InputField
                      label="Название"
                      name="name"
                      size="w-full"
                      register={register}
                      defaultValue={data?.name}
                      error={errors?.name}
                    />
                  </div>
                </div>
                {state.error && (
                  <span className="text-red-500">Что-то пошло не так!</span>
                )}
                <button className="bg-blue-400 text-white mt-2 p-2 rounded-md">
                  {type === "create" ? "Создать" : "Обновить"}
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/2 h-[calc(100vh-256px)] flex flex-col justify-between bg-gray-700 rounded-md">
            <h2 className="text-xl text-center font-semibold my-2">
              Оборудование
            </h2>
            <KitEquipmentsContainer />
          </div>
        </div>
        <div className="w-full h-[30px] bg-cyan-950 border-t-2 rounded-b-md mt-3"></div>
      </div>
    </>
  );
};

export default KitCreateForm;

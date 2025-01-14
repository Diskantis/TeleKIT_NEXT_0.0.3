"use client";

import React, { Dispatch } from "react";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/elements/InputField";
import PhoneInput from "react-phone-input-2";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Имя пользователя должно быть не менее 3 символов!" })
    .max(20, {
      message: "Имя пользователя должно содержать не более 20 символов!",
    }),
  email: z.string().email({ message: "Неверный адрес электронной почты!" }),
  password: z.string().min(5, {
    message: "Пароль должен быть длиной не менее 5 символов!",
  }),
  position: z.string().min(1, { message: "Обязательное поле!" }),
  department: z.string().min(1, { message: "Обязательное поле!" }),
  stateStatus: z.enum(["contract", "freelance"]),
  role: z.enum(["ADMIN", "USER", "GUEST"]),
  lastName: z.string().min(1, { message: "Обязательное поле!" }),
  firstName: z.string().min(1, { message: "Обязательное поле!" }),
  surName: z.string(),
  phone: z
    .string({ message: "Обязательное поле!" })
    // .regex(phoneRegex, {message: "Неверный формат номера телефона"})
    .min(12, { message: "Неполный номер!" }),
  address: z.string(),
  birthday: z.string(),
  img: z.instanceof(File, { message: "Обязательное поле!" }),
});

type Inputs = z.infer<typeof schema>;

const RecipientForm = ({
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
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <h1 className="text-2xl text-slate-300 font-semibold">
        {type === "create"
          ? "Создание нового получателя"
          : "Редактирование данных получателя"}
      </h1>
      <span className="pt-4 pb-2 text-lg text-gray-400 font-medium">
        Регистрационная информация
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Имя получателя"
          // name={`${data.firstName} ${data.lastName[0]}. ${data.surName[0]}.`}
          name="username"
          size="w-[230px]"
          register={register}
          defaultValue={data?.username}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          size="w-[230px]"
          register={register}
          defaultValue={data?.email}
          error={errors?.email}
        />
        <InputField
          label="Пароль"
          name="password"
          type="password"
          size="w-[230px]"
          register={register}
          defaultValue={data?.password}
          error={errors?.password}
        />
        <InputField
          label="Дирекция"
          name="department"
          size="w-[360px]"
          register={register}
          defaultValue={data?.department}
          error={errors?.department}
        />
        <InputField
          label="Должность"
          name="position"
          size="w-[360px]"
          register={register}
          defaultValue={data?.position}
          error={errors?.position}
        />
        <div className="flex flex-col gap-2 w-[230px]">
          <label className="text-sm text-gray-500">Трудовые отношения</label>
          <select
            className="ring-[1.5px] h-[40px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-700 outline-none"
            {...register("stateStatus")}
            defaultValue={data?.stateStatus}
          >
            <option value="contract">Штатный сотрудник</option>
            <option value="freelance">Договор подряда</option>
          </select>
          {errors.stateStatus?.message && (
            <p className="text-xs text-red-400">
              {errors.stateStatus.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-[230px]">
          <label className="text-sm text-gray-500">Роль</label>
          <select
            className="ring-[1.5px] h-[40px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-700 outline-none"
            {...register("role")}
            defaultValue={data?.role}
          >
            <option value="GUEST">GUEST</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.role?.message && (
            <p className="text-xs text-red-400">
              {errors.role.message.toString()}
            </p>
          )}
        </div>
      </div>

      <span className="pt-8 pb-2 text-lg text-gray-400 font-medium">
        Персональная информация
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Фамилия"
          name="lastName"
          size="w-[230px]"
          register={register}
          defaultValue={data?.lastName}
          error={errors?.lastName}
        />
        <InputField
          label="Имя"
          name="firstName"
          size="w-[230px]"
          register={register}
          defaultValue={data?.firstName}
          error={errors?.firstName}
        />
        <InputField
          label="Отчество"
          name="surName"
          size="w-[230px]"
          register={register}
          defaultValue={data?.surName}
          error={errors?.surName}
        />
        <div className={`flex flex-col gap-2 w-[230px]`}>
          <label htmlFor="phone" className="text-sm text-gray-500">
            Телефон
          </label>
          <Controller
            defaultValue={data?.phone}
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                inputClass={
                  "ring-[1.5px] ring-gray-300 p-2 rounded-md text-base w-full bg-gray-700 outline-none"
                }
                specialLabel=""
                country={"by"}
                placeholder="+375 (__) ___ __ __"
              />
            )}
          />
          {errors.phone?.message && (
            <p className="text-xs text-red-400">
              {errors.phone?.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Адрес"
          name="address"
          size="w-[230px]"
          register={register}
          defaultValue={data?.address}
          error={errors?.address}
        />
        <InputField
          label="День рождения"
          name="birthday"
          type="date"
          size="w-[230px] h-[40px]"
          padding="py-[7px]"
          register={register}
          defaultValue={data?.birthday}
          error={errors?.birthday}
        />
        <div className="flex flex-col gap-2 pb-4 w-full md:w-4/4 items-center justify-center">
          <label
            className="text-sm text-gray-200 select-none flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <svg className="w-6 h-6 fill-gray-200">
              <use xlinkHref="/icon.svg#cloud_upload" width={24} height={24} />
            </svg>
            <span>Загрузить фото</span>
          </label>
          <input type="file" id="img" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Создать" : "Обновить"}
      </button>
    </form>
  );
};

export default RecipientForm;

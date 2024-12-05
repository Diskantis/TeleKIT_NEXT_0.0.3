"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
import React from "react";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "User name must be at least 3 characters long!" })
    .max(20, { message: "User name must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "Fist name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required!" }),
  age: z.number().min(10).optional(),
});

type Inputs = z.infer<typeof schema>;

const RecipientForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
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
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        Создание нового получателя оборудования
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Регистрационная информация
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          register={register}
          defaultValue={data?.username}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          defaultValue={data?.email}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          defaultValue={data?.password}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Персональная информация
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          name="firstName"
          register={register}
          defaultValue={data?.firstName}
          error={errors?.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          register={register}
          defaultValue={data?.lastName}
          error={errors?.lastName}
        />
        <InputField
          label="phone"
          name="phone"
          register={register}
          defaultValue={data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="address"
          name="address"
          register={register}
          defaultValue={data?.address}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          register={register}
          defaultValue={data?.bloodType}
          error={errors?.bloodType}
        />
        <InputField
          label="Data of Birth"
          name="birthday"
          type="date"
          register={register}
          defaultValue={data?.birthday}
          error={errors?.birthday}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 select-none flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <svg className="w-6 h-6 fill-gray-500">
              <use xlinkHref="/icon.svg#cloud_upload" width={24} height={24} />
            </svg>
            <span>Upload a photo</span>
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
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default RecipientForm;

import React from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  size?: string;
  padding?: string;
  register: any;
  name: string;
  defaultValue?: string;
  pattern?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  size = "w-full md:w-1/4",
  padding,
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={`flex flex-col gap-2 ${size}`}>
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        defaultValue={defaultValue}
        className={`ring-[1.5px] ring-gray-300 p-2 ${padding} rounded-md text-base w-full bg-gray-700 outline-none`}
        {...register(name)}
        {...inputProps}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;

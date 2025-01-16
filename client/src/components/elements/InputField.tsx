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
  disable?: boolean;
  error?: FieldError;
  hidden?: boolean;
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
  disable,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : `flex flex-col gap-2 ${size}`}>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        disabled={disable}
        type={type}
        defaultValue={defaultValue}
        className={`w-full p-2 ${padding} rounded-md text-xs outline-none
        ${disable ? "ring-0 bg-gray-800" : "ring-[1px] ring-gray-300 bg-gray-700"}`}
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

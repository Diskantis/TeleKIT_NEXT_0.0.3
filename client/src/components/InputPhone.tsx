import React, { useState } from "react";

import { FieldError, Noop } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

type InputFieldProps = {
  // label: string;
  // type?: string;
  // size?: string;
  // name: string;

  field: {
    name: "phone";
    onChange: (...event: any[]) => void;
    onBlur?: Noop;
    value: string;
    disabled?: boolean | undefined;
  };
  defaultValue?: string;
  label: string;
  size: string;
  error?: FieldError;
};

const InputPhone = ({
  label,
  size = "w-full md:w-1/4",
  defaultValue,
  error,
  field,
}: InputFieldProps) => {
  return (
    <div className={`flex flex-col gap-2 ${size}`}>
      <label className="text-sm text-gray-500">{label}</label>
      <PhoneInput
        {...field}
        value={defaultValue}
        inputClass={
          "ring-[1.5px] ring-gray-300 p-2 rounded-md text-base w-full bg-gray-700 outline-none"
        }
        specialLabel=""
        country={"by"}
        placeholder="+375 (__) ___ __ __"
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputPhone;

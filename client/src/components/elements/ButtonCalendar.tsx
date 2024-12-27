type ButtonProps = {
  value?: string;
  name?: string;
  size?: string;
  mode?: string;
  onClick?: (...event: any) => void;
};

const ButtonCalendar = ({
  value,
  name,
  size = "w-[4vw]",
  mode,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`${size} flex items-center justify-center p-1 border-[1px]
      rounded-md hover:bg-cyan-900 ${name === mode ? "bg-cyan-950" : "bg-gray-900"}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default ButtonCalendar;

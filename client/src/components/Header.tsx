import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-[50px] mb-2 flex items-center justify-between px-4 bg-gradient-to-r from-cyan-950 to-teal-800">
      <Link
        href="/"
        className="flex items-center justify-center lg:justify-start gap-2"
      >
        <span className="hidden lg:block font-bold">TeleKIT</span>
      </Link>
    </div>
  );
};

export default Header;

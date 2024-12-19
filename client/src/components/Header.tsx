import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();
  return (
    <div className="w-full h-[50px] mb-2 flex items-center justify-between px-4 bg-gradient-to-r from-cyan-950 to-teal-800">
      <Link
        href="/"
        className="flex items-center justify-center lg:justify-start gap-2"
      >
        <span className="hidden lg:block font-bold">TeleKIT</span>
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <div className="flex gap-1">
            <span className="text-xs leading-3 font-medium text-gray-50">
              {user?.lastName as string}
            </span>
            <span className="text-xs leading-3 font-medium text-gray-50">
              {user?.firstName as string}
            </span>
          </div>
          <span className="text-[10px] text-gray-50 text-right">
            {(user?.publicMetadata?.role as string) === "admin"
              ? "администратор"
              : (user?.publicMetadata?.role as string) === "user"
                ? "пользователь"
                : "гость"}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;

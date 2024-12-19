"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role: any = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <>
      {/*MAIN*/}
      <div className="flex">
        {/*LEFT*/}
        <div className="w-[12%] sm:w-[13%] lg:w-[12%]">
          <div
            className="h-[calc(100vh-96px)] flex flex-col justify-between bg-gray-900 mx-4 py-4
          rounded-md xs:pr-0 md:pr-4"
          >
            <div className="mt-4">
              <h1 className="uppercase pb-[20px] font-light pl-4 cursor-default">
                Телевизионный
                <br />
                журналистский
                <br />
                комплект
              </h1>
              <p className="uppercase text-orange-300 mt-4 pl-4 italic lg:block cursor-default">
                ЗАО «Второй
                <br />
                национальный
                <br />
                телеканал»
              </p>
            </div>
          </div>
        </div>
        {/*RIGHT*/}
        <div className="w-[88%] sm:w-[87%] lg:w-[88%]">
          <div className="h-full flex items-center justify-center bg-gray-900 mr-4 rounded-md">
            <SignIn.Root>
              <SignIn.Step
                name="start"
                className="bg-gray-700 p-10 rounded-md shadow-2xl flex flex-col gap-2"
              >
                <div className="flex flex-col items-center">
                  <h1 className="text-xl font-bold flex items-center">
                    TeleKIT
                  </h1>
                  <h2 className="text-gray-400">Войдите в свой аккаунт</h2>
                </div>

                <Clerk.GlobalError className="text-sm text-red-400" />
                <Clerk.Field name="identifier" className="flex flex-col gap-2">
                  <Clerk.Label className="text-xs text-gray-500">
                    Username
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    required
                    className="p-2 rounded-md right-1 ring-gray-300 bg-gray-800 outline-none"
                  />
                  <Clerk.FieldError className="text-xs text-red-400" />
                </Clerk.Field>
                <Clerk.Field name="password" className="flex flex-col gap-2">
                  <Clerk.Label className="text-xs text-gray-500">
                    Пароль
                  </Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    className="p-2 rounded-md right-1 ring-gray-300 bg-gray-800 outline-none"
                  />
                  <Clerk.FieldError className="text-xs text-red-400" />
                </Clerk.Field>
                <SignIn.Action
                  submit
                  className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
                >
                  Войти
                </SignIn.Action>
              </SignIn.Step>
            </SignIn.Root>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

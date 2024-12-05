import React from "react";

import Image from "next/image";
import FormModal from "@/components/FormModal";

const SingleUserPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-900 mr-4 p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-2xl font-semibold">
          Страница пользователя
        </h1>
      </div>
      <div className="w-full h-[30px] bg-cyan-950 border-b-2 rounded-t-md"></div>
      <div className="flex flex-col lg:flex-row gap-4">
        {/*USER INFO CARD*/}
        <div className="flex-1 bg-lamaSky py-6 px-4 rounded-md flex items-center justify-between gap-4">
          <div className="w-2/3 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">John Doe</h1>
              <FormModal
                table="user"
                type="update"
                data={{
                  id: 1,
                  username: "Diskantis",
                  email: "mn.zajkov@gmail.com",
                  password: "password",
                  position: "ведущий инженер",
                  stateStatus: "Штатный сотрудник",
                  role: "ADMIN",
                  lastName: "Зайков",
                  firstName: "Михаил",
                  surName: "Николаевич",
                  phone: "+375297739600",
                  address: "г.Минск, ул.Лобанка, д.48, кв.56",
                  birthday: "1975-09-02",
                  img: "https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200",
                }}
              />
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </p>
            <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-2">
                <svg className="w-5 h-5 flex fill-gray-400 hover:fill-gray-50">
                  <use xlinkHref="/icon.svg#date" width={20} height={20} />
                </svg>
                <span>7 January 2025</span>
              </div>
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <svg className="w-5 h-5 flex fill-gray-400 hover:fill-gray-50">
                  <use xlinkHref="/icon.svg#envelope" width={20} height={20} />
                </svg>
                <span>john@doe.com</span>
              </div>
              <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/2 flex items-center gap-2">
                <svg className="w-5 h-5 flex fill-gray-400 hover:fill-gray-50">
                  <use xlinkHref="/icon.svg#telephone" width={20} height={20} />
                </svg>
                <span>+375 29 773 96 00</span>
              </div>
            </div>
          </div>
          <div className="w-1/3 flex justify-end">
            <Image
              src="https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt=""
              width={240}
              height={240}
              className="w-60 h-60 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[30px] bg-cyan-950 border-t-2 rounded-b-md"></div>
    </div>
  );
};

export default SingleUserPage;

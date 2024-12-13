import React from "react";

const Homepage = () => {
  return (
    <>
      {/*MAIN*/}
      <div className="flex">
        {/*LEFT*/}
        <div className="w-[12%] sm:w-[13%] lg:w-[12%]">
          <div className="h-[calc(100vh-96px)] flex flex-col justify-between bg-gray-900 mx-4 py-4 rounded-md xs:pr-0 md:pr-4">
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
          <div className="h-full flex flex-col justify-between bg-gray-900 mr-4 p-4 rounded-md">
            <div className="flex items-center justify-between">
              <h1 className="hidden md:block text-2xl font-semibold">
                Homepage
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

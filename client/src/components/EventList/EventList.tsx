import React from "react";

// TEMPORARY
const events = [
  {
    id: 1,
    title: "ТЖК №1",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 2,
    title: "ТЖК №2",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 3,
    title: "ТЖК №3",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 4,
    title: "ТЖК №4",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 5,
    title: "ТЖК №5",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 6,
    title: "ТЖК №6",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 7,
    title: "ТЖК №7",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 8,
    title: "ТЖК №8",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 9,
    title: "ТЖК №9",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 10,
    title: "ТЖК №10",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 11,
    title: "ТЖК №11",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 12,
    title: "ТЖК №12",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 13,
    title: "ТЖК №13",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 14,
    title: "ТЖК №14",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 15,
    title: "ТЖК №15",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 16,
    title: "ТЖК №16",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 17,
    title: "ТЖК №17",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 18,
    title: "ТЖК №18",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 19,
    title: "ТЖК №19",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 20,
    title: "ТЖК №20",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 21,
    title: "ТЖК №21",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 22,
    title: "ТЖК №22",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 23,
    title: "ТЖК №23",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 24,
    title: "ТЖК №24",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 25,
    title: "ТЖК №25",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
  {
    id: 26,
    title: "ТЖК №26",
    time: "09:00 - 18:00",
    recipient: "Recipient 01",
  },
];

const EventList = () => {
  return (
    <div className="h-full bg-gray-700 flex flex-col rounded-md pb-4 px-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-2 ml-2">Съёмки</h1>
        <svg className="w-6 h-5 mr-2 hiddenjustify-center fill-gray-300 xs:flex lg:hidden 2xl:flex">
          <use xlinkHref={"/icon.svg#more"} width={20} height={20} />
        </svg>
      </div>
      <div className="h-[calc(100vh-188px)] flex flex-wrap gap-3 pr-1 overflow-y-auto scrollbar">
        {events.map((event) => (
          <div
            className="w-[31%] flex flex-col items-center justify-between p-2 bg-gray-600
              rounded-md border-2 border-gray-100 bordet-t-4 odd:border-blue-400 even:border-amber-500 cursor-pointer"
            key={event.id}
          >
            <h1 className="font-semibold text-gray-100">{event.title}</h1>
            <span className="text-gray-300 text-sm">{event.time}</span>
            <p className="text-gray-200 ">{event.recipient}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

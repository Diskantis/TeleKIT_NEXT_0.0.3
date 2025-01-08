import prisma from "@/lib/prisma";
import ModerCalendar from "@/components/ModerCalendar/ModerCalendar";

const ModerCalendarContainer = async () => {
  const dataRes = await prisma.event.findMany({
    include: {
      recipients: true,
      kits: true,
    },
  });

  const data = dataRes.map((event) => ({
    title: event.title,
    start: event.start,
    end: event.end,
    recipients: event.recipients,
  }));
  return (
    <div className="">
      <ModerCalendar data={data} />
    </div>
  );
};

export default ModerCalendarContainer;

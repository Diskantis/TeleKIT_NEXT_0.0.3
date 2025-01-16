import CreateForm from "@/components/CreateForm";
import prisma from "@/lib/prisma";

export type CreateFormContainerProps = {
  table: "user" | "recipient" | "event" | "kit";
  type: "create" | "update";
  data?: any;
  id?: number | string;
};

const CreateFormContainer = async ({
  table,
  type,
  data,
  id,
}: CreateFormContainerProps) => {
  // CREATE RELATION DATA
  let relatedData = {};

  switch (table) {
    case "event":
      const eventRecipients = await prisma.recipient.findMany({
        select: { id: true, lastName: true, firstName: true, surName: true },
      });
      relatedData = { recipients: eventRecipients };
      break;
    case "kit":
      const kitRecipients = await prisma.recipient.findMany({
        select: { id: true, lastName: true, firstName: true, surName: true },
      });
      relatedData = { recipients: kitRecipients };
      break;
    default:
      break;
  }

  return (
    <div className="">
      <CreateForm
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default CreateFormContainer;

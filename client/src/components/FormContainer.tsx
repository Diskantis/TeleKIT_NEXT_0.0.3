import FormModal from "@/components/FormModal";
import prisma from "@/lib/prisma";

export type FormContainerProps = {
  table: "user" | "recipient" | "event" | "kit";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  if (type !== "delete") {
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
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;

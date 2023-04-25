import { Button } from "@tremor/react";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export const CreateInvoiceButton = () => {
  const { push } = useRouter();
  return (
    <Button
      icon={PlusCircleIcon}
      color="emerald"
      onClick={() => push("/new")}
    >
      Create Invoice
    </Button>
  );
};

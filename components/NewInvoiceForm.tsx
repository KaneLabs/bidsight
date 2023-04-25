import {
  StatusOnlineIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { Button, Card, Title } from "@tremor/react";

import { Invoice, useInvoicesCtx } from "../state/InvoicesProvider";
import { TextInput } from "@tremor/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const initialDraft = {
  name: "",
  due_date: "",
  status: "",
  charges: [],
};

export const selectPersistedInvoice: () => Invoice[] = () => {
  try {
    const localInvoices = localStorage.getItem("persisted_invoices");
    if (localInvoices) {
      return JSON.parse(localInvoices);
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const NewInvoiceForm = () => {
  const { invoices, fetchInvoices, setInvoices, error, isLoading } =
    useInvoicesCtx();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const [draftInvoice, setDraftInvoice] = useState(initialDraft);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraftInvoice((draftInvoice) => ({
      ...draftInvoice,
      [e.target.id]: e.target.value,
    }));
  };

  const { push } = useRouter();

  const addInvoice = () => {
    const persistedInvoices = selectPersistedInvoice();

    const nextId = invoices.length + persistedInvoices.length + 1;
    const nextInvoice = { id: nextId, ...draftInvoice };

    const combinedInvoices = [
      ...invoices,
      ...persistedInvoices,
      nextInvoice,
    ].sort((a, b) => a.id - b.id);
    setInvoices(combinedInvoices);

    localStorage.setItem(
      "persisted_invoices",
      JSON.stringify([...persistedInvoices, { id: nextId, ...draftInvoice }])
    );
    setDraftInvoice(initialDraft);
    push("/");
  };

  console.log("invoices", invoices);

  return (
    <Card className="max-w-6xl mx-auto w-full">
      <div className="space-y-4">
        <div className="flex w-full justify-between">
          <Title>New Invoice</Title>
          <Button color="emerald" onClick={addInvoice}>
            Save
          </Button>
        </div>
        <TextInput id="name" onChange={handleInput} placeholder="Name" />
        <TextInput
          id="due_date"
          onChange={handleInput}
          placeholder="Due Date"
        />
        <TextInput id="status" onChange={handleInput} placeholder="Status" />
      </div>
    </Card>
  );
};

import React, { createContext, useState } from "react";

// Define the invoice type
export type Invoice = {
  id: number;
  name: string;
  status: string;
  due_date: string;
  charges: InvoiceCharge[];
};

export type InvoiceCharge = Record<string, string>;

// Define the initial state for the invoices array
const initialInvoices: Invoice[] = [];

// Create the context for the invoices array
export const InvoicesContext = createContext<{
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  fetchInvoices: () => void;
  error?: Error;
  isLoading: boolean;
  //   addInvoice: (invoice: Invoice) => void;
}>({
  invoices: initialInvoices,
  //   addInvoice: () => {},
  setInvoices: () => {},
  fetchInvoices: () => {},
  error: undefined,
  isLoading: false,
});

// Create the provider component for the invoices context
export const InvoicesProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const addInvoice = (invoice: Invoice) => {
  //     setInvoices([...invoices, invoice]);
  //   };

  const fetchInvoices = async () => {
    try {
        setIsLoading(true);
        const response = await fetch(
          "https://takehome.api.bidsight.io/v1/invoices"
        );
        const data = await response.json();
        setInvoices(data);
        setIsLoading(false);
        setError(undefined);
    } catch (error) {
        setIsLoading(false);
        setError(error as Error);
    }
  };

  return (
    <InvoicesContext.Provider value={{ invoices, setInvoices, fetchInvoices, error, isLoading }}>
      {children}
    </InvoicesContext.Provider>
  );
};

export const useInvoicesCtx = () => {
  return React.useContext(InvoicesContext);
};

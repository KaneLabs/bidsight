import React, { createContext, useState } from "react";

// Define the invoice type
type Invoice = {
  id: number;
  name: string;
  status: string;
  due_date: string;
  charges: InvoiceCharge[];
};

type InvoiceCharge = Record<string, string>

// Define the initial state for the invoices array
const initialInvoices: Invoice[] = [];

// Create the context for the invoices array
export const InvoicesContext = createContext<{
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
//   addInvoice: (invoice: Invoice) => void;
}>({
  invoices: initialInvoices,
//   addInvoice: () => {},
  setInvoices: () => {},
});

// Create the provider component for the invoices context
export const InvoicesProvider: React.FC<{ children: JSX.Element}> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

//   const addInvoice = (invoice: Invoice) => {
//     setInvoices([...invoices, invoice]);
//   };

  return (
    <InvoicesContext.Provider value={{ invoices, setInvoices }}>
      {children}
    </InvoicesContext.Provider>
  );
};

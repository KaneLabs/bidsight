import { useEffect } from "react";
import { useInvoicesCtx } from "../state/InvoicesProvider";

export const InvoicesList = () => {
  const { invoices, fetchInvoices, error, isLoading } = useInvoicesCtx();

  useEffect(() => {
    console.log("fetching invoices");
    fetchInvoices();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div>
      <h1>Invoices</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <a>{invoice.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

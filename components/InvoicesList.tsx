import { useEffect } from "react";
import { Invoice, useInvoicesCtx } from "../state/InvoicesProvider";
import {
  AccordionList,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@tremor/react";

export const InvoicesList = () => {
  const { invoices, fetchInvoices, error, isLoading } = useInvoicesCtx();

  useEffect(() => {
    console.log("fetching invoices");
    fetchInvoices();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return <AccordionInvoiceList invoices={invoices} />;
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


export const AccordionInvoiceList: React.FC<{ invoices: Invoice[] }> = ({
  invoices,
}) => (
  <AccordionList className="max-w-3xl mx-auto w-full">
    {invoices.map((invoice) => (
      <Accordion key={invoice.id}>
        <AccordionHeader>
          <span>{invoice.name}</span> {invoice.status}
        </AccordionHeader>
        <AccordionBody>
          <div>{invoice.due_date}</div>
          <div>{invoice.status}</div>

          {invoice.charges.map((charge) => {
            console.log("charge", charge);
            const [key, value] = Object.entries(charge)[0];
            return (
              <div key={key}>
                <div>{key}</div>
                <div>{value}</div>
              </div>
            );
          })}
        </AccordionBody>
      </Accordion>
    ))}
  </AccordionList>
);

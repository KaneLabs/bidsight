import {
  StatusOnlineIcon,
  CheckIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";
import { useEffect, useMemo } from "react";

import { InvoiceCharge, useInvoicesCtx } from "../state/InvoicesProvider";
import { CreateInvoiceButton } from "./CreateInvoiceButton";
import { selectPersistedInvoice } from "./NewInvoiceForm";

export const getChargesTotalBaseCurrency = (charges: InvoiceCharge[]) => {
  const totalBaseCurrency = charges.reduce((total, curr) => {
    const [key, value] = Object.entries(curr)[0];
    return total + parseFloat(value) * 100;
  }, 0);

  return totalBaseCurrency;
};

const selectStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "emerald";
    case "outstanding":
      return "red";
    case "pending":
      return "yellow";
    case "draft":
      return "gray";
    default:
      return "gray";
  }
};

const selectStatusIcon = (status: string) => {
  switch (status) {
    case "paid":
      return CheckIcon;
    case "outstanding":
      return StatusOnlineIcon;
    case "draft":
      return PencilIcon;
  }
};

export const InvoicesTable = () => {
  const { invoices, fetchInvoices, error, isLoading } = useInvoicesCtx();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const combinedInvoices = useMemo(() => {
    try {
      if (window) {
        const persistedInvoices = selectPersistedInvoice();
        return [...invoices, ...persistedInvoices].sort((a, b) => a.id - b.id);
      }
      return invoices;
    } catch (error) {
      return invoices;
    }
  }, [invoices]);

  return (
    <Card className="max-w-6xl mx-auto w-full">
      <div className="flex w-full justify-between">
        <Title>{isLoading ? "Loading Invoices" : "Invoices"}</Title>
        <CreateInvoiceButton />
      </div>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Due Date</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {combinedInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>
                <Text>{invoice.name}</Text>
              </TableCell>
              <TableCell>
                <Badge
                  color={selectStatusColor(invoice.status)}
                  icon={selectStatusIcon(invoice.status)}
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Text>{invoice.due_date}</Text>
              </TableCell>
              <TableCell>
                <Text>
                  {(getChargesTotalBaseCurrency(invoice.charges) / 100).toFixed(
                    2
                  )}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

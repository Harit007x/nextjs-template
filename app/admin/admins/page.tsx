"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import IconWrapper from "@/components/icons-wrapper";
import { Icons } from "@/components/icons";
import { DataTableColumnHeader } from "@/components/data-table/data-column-header";

type Sale = {
  name: string;
  email: string;
  amount: string;
  status: string;
  date: string;
};

const adminUsers: Sale[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    status: "Success",
    date: "2023-01-23",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    status: "Pending",
    date: "2023-02-12",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    status: "Success",
    date: "2023-03-05",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    status: "Processing",
    date: "2023-04-15",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    status: "Success",
    date: "2023-05-20",
  },
];

const columns: ColumnDef<Sale>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Status",
    cell: ({ row }) => {
      const sale = row.original;

      return (
        <Badge
          variant={
            sale.status === "Success"
              ? "green"
              : sale.status === "Pending"
                ? "orange"
                : "blue"
          }
        >
          {sale.status}
        </Badge>
      );
    },
  },
  {
    header: "Method",
    accessorKey: "date",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
        id: "actions",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => {
          return (
            <div className="w-fit flex gap-1">
              <IconWrapper
                className="cursor-pointer text-blue hover:fill-blueBackground hover:bg-blueBackground hover:dark:bg-blueBackground"
                onClick={() => {
                  // props.handleEdit(row.original)
                }}
                // disable={!row.original.is_editable}
                // tooltipContent={tooltipSuggestions.edit}
              >
                <Icons.pencil className="h-4 w-4" />
              </IconWrapper>
              <IconWrapper
                className="cursor-pointer text-red hover:fill-redBackground hover:bg-redBackground hover:dark:bg-redBackground"
                onClick={() => {
                  // props.handlePatientNoteDelete(row.original.id)
                }}
                // disable={!row.original.is_editable}
                // tooltipContent={tooltipSuggestions.delete}
              >
                <Icons.trash className="h-4 w-4" />
              </IconWrapper>
            </div>
          )
        },
      },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="inline-block text-xl justify-self-start font-bold tracking-tight">
          Admins
        </h2>
        <p className="text-sm font-medium">Manage active users</p>
      </div>

      <DataTable
              columns={columns}
              data={adminUsers}
              gridCount={adminUsers.length}
            />
    </div>
  );
}

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
import { DataTableColumnHeader } from "@/components/data-table/data-column-header";
import IconWrapper from "@/components/icons-wrapper";
import { Icons } from "@/components/icons";

type Sale = {
  question: string;
  status: string;
};

const faqData: Sale[] = [
  {
    question: "Can I make payments in dollor ?",
    status: "Noraml",
  },
{
    question: "Can I change my name from profile ?",
    status: "Medium",
  },
];

const columns: ColumnDef<Sale>[] = [
  {
    header: "Question",
    accessorKey: "question",
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
              : sale.status === "Medium"
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

export default function UsersPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="inline-block text-xl justify-self-start font-bold tracking-tight">
          Faqs
        </h2>
        <p className="text-sm font-medium">Frequently asked questions</p>
      </div>

            <DataTable
              columns={columns}
              data={faqData}
              gridCount={faqData.length}
            />
    </div>
  );
}

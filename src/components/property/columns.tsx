"use client";

import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropertyType } from "@/mock-api/type";

export const columns: ColumnDef<PropertyType, any>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: null,
    },
  },
  {
    accessorFn: (row) => row.address,
    id: "address",
    header: "Address",
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: null,
    },
    enableSorting: false,
  },

  {
    accessorKey: "price",
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(price);

      return <div className="text-left font-medium">{formatted}</div>;
    },
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "type",
    header: "Property type",
    meta: {
      filterVariant: "select",
    },
    enableSorting: false,
  },
  {
    accessorKey: "squareFootage",
    header: "Square footage",
    meta: {
      filterVariant: null,
    },
  },
  {
    accessorKey: "bedrooms",
    header: "Bedrooms",
    meta: {
      filterVariant: null,
    },
  },
  {
    accessorKey: "bathrooms",
    header: "Bathrooms",
    meta: {
      filterVariant: null,
    },
  },
  {
    accessorKey: "dateListed",
    header: "Date listed",
    meta: {
      filterVariant: null,
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const property = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(property.address)}
            >
              Copy property address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push(`/details/${property.id}`);
              }}
            >
              View property details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

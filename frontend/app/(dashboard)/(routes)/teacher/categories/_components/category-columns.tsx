"use client"
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";

export type Course = {
    name: string,
    _id: string,
    icon: {},
    isPublished: boolean,
}

export const CAtegorycolumns: ColumnDef<Course>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Published
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({row}) => {
          const isPublished = row.getValue("isPublished") || false;

          return(
            <Badge className={cn(" bg-slate-500 ", isPublished && " bg-sky-700")}>
                {isPublished ? "Published" : "Draft"}
            </Badge>
          )
      },
  },
  {
    id: "action",
    cell: ({row}) => {
        const {_id} = row.original;

        return(
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant={"ghost"} className=" h-4 w-8 p-0">
      <span className=" sr-only">Open menu</span>
      <MoreHorizontal className=" h-4 w-4 mr-2" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel className=" text-center">Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <Link href={`/teacher/categories/${_id}`}>
    <DropdownMenuItem>
        <Pencil className=" h-4 w-4 mr-2"/> Edit
    </DropdownMenuItem>
    </Link>
  </DropdownMenuContent>
</DropdownMenu>
        )
    }
  }
]

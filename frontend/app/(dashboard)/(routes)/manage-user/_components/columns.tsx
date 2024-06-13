"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  UserCogIcon,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export type Member = {
  name: string;
  _id: string;
  role: string;
  email: string;
  membership: boolean;
  activeMember: boolean | string;
};

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "membership",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Member
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const member = row.getValue("membership") || false;

      return (
        <Badge
          className={cn(
            " bg-slate-500 ",
            member ? " bg-green-400" : " bg-red-400"
          )}
        >
          {member ? "Member" : "Not Member"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role") || "";

      return (
        <Badge
          className={cn(" bg-slate-500 ", role === "Admin" && " bg-green-500")}
        >
          {role === "Admin" ? "Admin" : "User"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "activeMember",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Active
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const active = row.getValue("activeMember") || "";
      return (
        <Badge className={cn(" bg-slate-500 ", active && " bg-green-500")}>
          {active ? "Active" : "Deactivate"}
        </Badge>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const { _id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className=" h-4 w-8 p-0">
              <span className=" sr-only">Open menu</span>
              <MoreHorizontal className=" h-4 w-4 mr-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className=" text-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          <Link href={`/manage-user/${_id}`}>
          <DropdownMenuItem>
              <UserCogIcon className=" h-4 w-4 mr-2" /> user details
            </DropdownMenuItem>
          </Link>
            <Link href={`/teacher/analytics/${_id}`}>
            <DropdownMenuItem>
              <WalletCards className=" h-4 w-4 mr-2" /> See enrollments
            </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

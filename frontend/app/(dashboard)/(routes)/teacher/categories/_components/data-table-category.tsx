"use client"
import * as React from "react"
import axios from "axios";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { CategoryCreationModal } from "@/components/modals/category-creationModal";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function CategoryDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
      )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })
  const {toast} = useToast();
    const [name, setName] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()
    const onConfirm = async () => {
      try {
        setLoading(true);
         await axios.post(`/category/create`,{
           name
         },{withCredentials: true}).then((res) => {
            toast({
              title:"Success",
              description: res.data.message
            })
            router.refresh();
            router.push(`/teacher/categories/${res.data.category._id}`)
         }).catch((error) => {
          toast({
            variant:"destructive",
            title:"Error",
            description: error.response.data.message
          })
         }).finally(() => {
            setLoading(false);
         })
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  return (
    <div>
          <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter category..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      <div>
      <CategoryCreationModal loading={loading} name={name} setName={setName} onConFirm={() => onConfirm()}>
        <Button>
            <PlusCircle className=" w-4 h-4 mr-2" />
            New category
        </Button>
        </CategoryCreationModal>
      </div>
     
      </div>
        <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

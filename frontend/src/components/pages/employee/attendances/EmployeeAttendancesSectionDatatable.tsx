import { useState, useMemo } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { format, isValid } from "date-fns"
import type { MetadataType } from "@/lib/types/apiType"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isAdmin?: boolean
    selectedDate?: Date
    onDateChange?: (date: Date) => void
    metadata?: MetadataType | null
    page?: number
    perPage?: number
    onPageChange?: (page: number) => void
    onPerPageChange?: (perPage: number) => void
}



export function EmployeeAttendancesSectionDatatable<TData, TValue>({
    columns,
    data,
    isAdmin = false,
    selectedDate,
    onDateChange = () => { },
    metadata,
    page = 1,
    perPage = 10,
    onPageChange = () => { },
    onPerPageChange = () => { },
}: DataTableProps<TData, TValue>) {
    const [calendarOpen, setCalendarOpen] = useState(false)

    const today = useMemo(() => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        return d
    }, [])

    const safeDate = selectedDate instanceof Date && isValid(selectedDate) ? selectedDate : today

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
    })

    const pageCount = metadata?.pageCount ?? 1
    const totalCount = metadata?.totalCount ?? data.length
    const startEntry = totalCount === 0 ? 0 : (page - 1) * perPage + 1
    const endEntry = Math.min(page * perPage, totalCount)

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm shrink-0">
                    <span>Show</span>

                    <Select
                        value={String(perPage)}
                        onValueChange={(v) => onPerPageChange(Number(v))}
                    >
                        <SelectTrigger id="attendance-page-size" className="w-20 h-8 text-sm">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                        </SelectContent>
                    </Select>

                    <span>entries</span>
                </div>

                {
                    isAdmin && (
                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    id="attendance-date-filter"
                                    variant="outline"
                                    className="h-8 text-sm font-normal gap-2"
                                >
                                    <CalendarIcon className="size-4 text-muted-foreground" />
                                    {format(safeDate, "dd MMM yyyy")}
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0" align="end">
                                <Calendar
                                    key={safeDate.toISOString()}
                                    mode="single"
                                    selected={safeDate}
                                    onSelect={(date) => {
                                        if (date) {
                                            onDateChange(date)
                                            setCalendarOpen(false)
                                        }
                                    }}
                                    defaultMonth={safeDate}
                                    disabled={{ after: today }}
                                />
                            </PopoverContent>
                        </Popover>
                    )
                }
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
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
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No employees found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 text-sm text-muted-foreground">
                <span>
                    Showing {startEntry}–{endEntry} of {totalCount} entries
                </span>

                <div className="flex items-center gap-1">
                    <Button
                        id="attendance-prev-page"
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page <= 1}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronLeft className="size-4" />
                    </Button>

                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                        <Button
                            key={p}
                            variant={page === p ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(p)}
                            className="h-8 w-8 p-0 text-xs"
                        >
                            {p}
                        </Button>
                    ))}

                    <Button
                        id="attendance-next-page"
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page >= pageCount}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
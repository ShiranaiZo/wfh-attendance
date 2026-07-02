import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EditIcon } from "lucide-react"

export type Employee = {
    id: string
    name: string
    email: string
    position: string | null
    role: string
    createdAt: string
    updatedAt: string
}


export interface CreateEmployeePayload {
    name: string
    email: string
    password: string
    position?: string
}

export interface UpdateEmployeePayload {
    name: string
    position?: string
    password?: string
}
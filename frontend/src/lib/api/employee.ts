import { api } from "./api"
import type { CreateEmployeePayload, Employee, UpdateEmployeePayload } from "../types/employee"

export async function apiGetEmployees(): Promise<Employee[]> {
    const res = await api.get("/employees")
    if (!res.data?.success) {
        throw new Error(res.data?.message ?? "Failed to get employees")
    }
    return res.data?.data?.employees ?? []
}

export async function apiGetEmployee(id: string): Promise<Employee> {
    const res = await api.get(`/employees/${id}`)

    if (!res.data?.success) {
        throw new Error(res.data?.message ?? "Failed to get employee")
    }

    return res.data?.data?.employee
}

export async function apiCreateEmployee(data: CreateEmployeePayload): Promise<void> {
    const res = await api.post("/employees", data)
    if (!res.data?.success) {
        const err: any = new Error(res.data?.message ?? "Failed to create employee")
        err.response = { data: res.data }
        throw err
    }
}

export async function apiUpdateEmployee(id: string, data: UpdateEmployeePayload): Promise<void> {
    const res = await api.put(`/employees/${id}`, data)
    if (!res.data?.success) {
        const err: any = new Error(res.data?.message ?? "Failed to update employee")
        err.response = { data: res.data }
        throw err
    }
}

export async function apiDeleteEmployee(id: string): Promise<void> {
    const res = await api.delete(`/employees/${id}`)
    if (!res.data?.success) {
        throw new Error(res.data?.message ?? "Failed to delete employee")
    }
}

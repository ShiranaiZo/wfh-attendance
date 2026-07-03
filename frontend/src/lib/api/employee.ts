import { api } from "./api"
import type { EmployeeType, CreateEmployeePayloadType, UpdateEmployeePayloadType } from "../types/employee"
import type { MetadataType } from "../types/apiType"


export async function apiGetEmployees(page?: number, perPage?: number): Promise<{ data: EmployeeType[], metadata: MetadataType }> {
    const params: Record<string, any> = {}
    if (page !== undefined) params.page = page
    if (perPage !== undefined) params.perPage = perPage

    const res = await api.get("/employees", { params })
    if (!res.data?.success) {
        throw new Error(res.data?.message ?? "Failed to get employees")
    }
    return {
        data: res.data?.data ?? [],
        metadata: res.data?.metadata ?? null,
    }
}

export async function apiGetEmployee(id: string): Promise<EmployeeType> {
    const res = await api.get(`/employees/${id}`)

    if (!res.data?.success) {
        throw new Error(res.data?.message ?? "Failed to get employee")
    }

    return res.data?.data
}

export async function apiCreateEmployee(data: CreateEmployeePayloadType): Promise<void> {
    const res = await api.post("/employees", data)
    if (!res.data?.success) {
        const err: any = new Error(res.data?.message ?? "Failed to create employee")
        err.response = { data: res.data }
        throw err
    }
}

export async function apiUpdateEmployee(id: string, data: UpdateEmployeePayloadType): Promise<void> {
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

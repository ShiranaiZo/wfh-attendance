import { api } from "./api"
import type { AttendanceType } from "../types/attendance"
import type { MetadataType } from "../types/apiType"

export async function apiGetAttendances(date?: string, page?: number, perPage?: number): Promise<{ data: AttendanceType[], metadata: MetadataType }> {
    const params: Record<string, any> = {}
    if (date) params.date = date
    if (page !== undefined) params.page = page
    if (perPage !== undefined) params.perPage = perPage

    const res = await api.get("/attendances", { params })
    if (!res.data?.success) {
        throw new Error(res.data?.message ?? "Failed to get attendances")
    }
    return {
        data: res.data?.data ?? [],
        metadata: res.data?.metadata ?? null,
    }
}

export async function apiClockIn(image: File, notes: string): Promise<void> {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("notes", notes)

    const res = await api.post("/attendances/clockin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    })

    if (!res.data?.success) {
        const err: any = new Error(res.data?.message ?? "Failed to clock in")
        err.response = { data: res.data }
        throw err
    }
}
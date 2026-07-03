import { api } from "./api"
import type { AttendanceType } from "../types/attendance"

export async function apiGetAttendances(date?: string): Promise<AttendanceType[]> {
    const params = date ? { date } : {}
    const res = await api.get("/attendances", { params })
    if (!res.data?.success) {
        throw new Error(res.data?.message ?? "Failed to get attendances")
    }
    return res.data?.data?.attendances ?? []
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
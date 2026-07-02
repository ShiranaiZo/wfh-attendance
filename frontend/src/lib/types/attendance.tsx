import type { EmployeeType } from "./employee";

export type AttendanceType = {
    id: string;
    userId: string;
    clockIn: string;
    image: string;
    notes: string;
    employee: EmployeeType;
    createdAt: string;
    updatedAt: string;
}
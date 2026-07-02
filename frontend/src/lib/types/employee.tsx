export type EmployeeType = {
    id: string
    name: string
    email: string
    position: string | null
    role: string
    createdAt: string
    updatedAt: string
}


export interface CreateEmployeePayloadType {
    name: string
    email: string
    password: string
    position?: string
}

export interface UpdateEmployeePayloadType {
    name: string
    position?: string
    password?: string
}
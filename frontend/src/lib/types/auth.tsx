import type { UserRoles } from "../helpers/auth";

export type RolesType = (typeof UserRoles)[keyof typeof UserRoles]

export interface BaseAuthType {
    email: string
}

export interface LoginType extends BaseAuthType {
    password: string;
}

export interface AuthPayloadType extends BaseAuthType {
    id: string;
    role: RolesType;
}

export const AppRoutes = {
    EMPLOYEE: '/',
    LOGIN: '/login',

    // Admin
    ADMIN: '/admin',
    ADMIN_ATTENDANCES: '/admin/attendances',
    ADMIN_EMPLOYEES: '/admin/employees',
    ADMIN_EMPLOYEES_CREATE: '/admin/employees/create',
    ADMIN_EMPLOYEES_EDIT: '/admin/employees/edit/:id',
} as const
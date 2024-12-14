import {ProjectedRoutes} from "@/types/ProtectedRoute";


export const LOGIN_PATH = '/auth/login';
export const REGISTER_PATH = '/auth/register';
export const ROOT_PATH = '/';
export const LOGIN_REDIRECT_PATH = '/dashboard';

export const PROTECTED_ROUTES: ProjectedRoutes = [
    // { path: '/', roles: ['user'], exact: true },
    { path: '/admin', roles: ['admin'] },
    { path: '/user/profile', roles: ['user', 'admin'] },
    { path: '/settings', roles: ['admin', 'editor'] },
    { path: '/dashboard', roles: ['ADMIN'] },
];

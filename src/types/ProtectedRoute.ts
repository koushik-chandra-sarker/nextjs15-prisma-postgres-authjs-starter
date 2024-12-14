interface ProtectedRoute {
    path: string;
    roles?: string[];
    exact?: boolean ;
}

export type ProjectedRoutes = ProtectedRoute[];

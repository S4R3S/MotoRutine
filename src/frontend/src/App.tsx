import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Vehicles = lazy(() => import("./pages/Vehicles"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Maintenance = lazy(() => import("./pages/Maintenance"));

function PageSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      <Skeleton className="h-8 w-40" />
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
      </Layout>
      <Toaster richColors position="top-right" />
    </>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const vehiclesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vehicles",
  component: Vehicles,
});

const jobsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/jobs",
  component: Jobs,
});

const maintenanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/maintenance",
  component: Maintenance,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  vehiclesRoute,
  jobsRoute,
  maintenanceRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

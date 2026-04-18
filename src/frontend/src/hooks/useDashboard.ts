import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { DashboardSummary, Job, MaintenanceItem } from "../types";

export function useDashboardSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardSummary>({
    queryKey: ["dashboardSummary"],
    queryFn: async () => {
      if (!actor) {
        return {
          vehicleCount: 0n,
          pendingJobsCount: 0n,
          overdueMaintenanceCount: 0n,
          totalExpenses: 0n,
        };
      }
      return actor.getDashboardSummary();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useRecentJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["recentJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentJobs();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useMaintenanceSchedule() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MaintenanceItem[]>({
    queryKey: ["maintenanceSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUpcomingOrOverdueMaintenance();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

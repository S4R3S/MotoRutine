import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  CreateMaintenanceRequest,
  MaintenanceId,
  MaintenanceItem,
  UpdateMaintenanceRequest,
} from "../types";

export function useMaintenance() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MaintenanceItem[]>({
    queryKey: ["maintenance"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMaintenance();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMaintenanceItem(id: MaintenanceId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<MaintenanceItem | null>({
    queryKey: ["maintenanceItem", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getMaintenance(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateMaintenance() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<MaintenanceItem, Error, CreateMaintenanceRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.addMaintenance(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["maintenanceSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export function useUpdateMaintenance() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    MaintenanceItem | null,
    Error,
    { id: MaintenanceId; req: UpdateMaintenanceRequest }
  >({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.updateMaintenance(id, req);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      queryClient.invalidateQueries({
        queryKey: ["maintenanceItem", id.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["maintenanceSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export function useDeleteMaintenance() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, MaintenanceId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteMaintenance(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["maintenanceSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

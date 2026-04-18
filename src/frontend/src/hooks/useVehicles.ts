import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CreateVehicleRequest, Vehicle, VehicleId } from "../types";

export function useVehicles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Vehicle[]>({
    queryKey: ["vehicles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listVehicles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useVehicle(id: VehicleId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Vehicle | null>({
    queryKey: ["vehicle", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getVehicle(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateVehicle() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Vehicle, Error, CreateVehicleRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.addVehicle(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export function useUpdateVehicle() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<
    Vehicle | null,
    Error,
    { id: VehicleId; req: CreateVehicleRequest }
  >({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.updateVehicle(id, req);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicle", id.toString()] });
    },
  });
}

export function useDeleteVehicle() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, VehicleId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteVehicle(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { CreateJobRequest, Job, JobId, UpdateJobRequest } from "../types";

export function useJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useJob(id: JobId | null) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Job | null>({
    queryKey: ["job", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getJob(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateJob() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Job, Error, CreateJobRequest>({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.addJob(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recentJobs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export function useUpdateJob() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<Job | null, Error, { id: JobId; req: UpdateJobRequest }>({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.updateJob(id, req);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", id.toString()] });
      queryClient.invalidateQueries({ queryKey: ["recentJobs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export function useDeleteJob() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation<boolean, Error, JobId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteJob(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recentJobs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    },
  });
}

export type {
  Vehicle,
  Job,
  MaintenanceItem,
  DashboardSummary,
  CreateVehicleRequest,
  CreateJobRequest,
  CreateMaintenanceRequest,
  UpdateJobRequest,
  UpdateMaintenanceRequest,
  VehicleId,
  JobId,
  MaintenanceId,
  Timestamp,
} from "../backend";

export { JobStatus, MaintenanceStatus, VehicleType } from "../backend";

// Spanish display labels for job statuses
export const JOB_STATUS_LABEL: Record<string, string> = {
  pending: "Pendiente",
  in_progress: "En Progreso",
  completed: "Completado",
};

export const JOB_STATUS_BADGE: Record<string, string> = {
  pending: "badge-pending",
  in_progress: "badge-in-progress",
  completed: "badge-success",
};

// Spanish display labels for maintenance statuses
export const MAINTENANCE_STATUS_LABEL: Record<string, string> = {
  upcoming: "Próximo",
  completed: "Completado",
  overdue: "Vencido",
};

export const MAINTENANCE_STATUS_BADGE: Record<string, string> = {
  upcoming: "badge-upcoming",
  completed: "badge-success",
  overdue: "badge-overdue",
};

// Spanish display labels for vehicle types
export const VEHICLE_TYPE_LABEL: Record<string, string> = {
  auto: "Automóvil",
  moto: "Motovehículo",
};

export function formatCurrency(value: bigint): string {
  return `$${Number(value).toLocaleString("es-AR")}`;
}

export function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

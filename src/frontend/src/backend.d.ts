import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CreateVehicleRequest {
    model: string;
    vehicleType: VehicleType;
    licensePlate: string;
    name: string;
    year: bigint;
    brand: string;
}
export type Timestamp = bigint;
export type VehicleId = bigint;
export type MaintenanceId = bigint;
export interface CreateJobRequest {
    title: string;
    cost: bigint;
    description: string;
    vehicleId: VehicleId;
}
export type JobId = bigint;
export interface DashboardSummary {
    pendingJobsCount: bigint;
    totalExpenses: bigint;
    overdueMaintenanceCount: bigint;
    vehicleCount: bigint;
}
export interface Vehicle {
    id: VehicleId;
    model: string;
    vehicleType: VehicleType;
    licensePlate: string;
    name: string;
    year: bigint;
    brand: string;
}
export interface UpdateJobRequest {
    status?: JobStatus;
    completedAt?: Timestamp;
    title?: string;
    cost?: bigint;
    description?: string;
}
export interface Job {
    id: JobId;
    status: JobStatus;
    completedAt?: Timestamp;
    title: string;
    cost: bigint;
    createdAt: Timestamp;
    description: string;
    vehicleId: VehicleId;
}
export interface UpdateMaintenanceRequest {
    status?: MaintenanceStatus;
    completedAt?: Timestamp;
    title?: string;
    dueDate?: Timestamp;
    description?: string;
}
export interface CreateMaintenanceRequest {
    title: string;
    dueDate: Timestamp;
    description: string;
    vehicleId: VehicleId;
}
export interface MaintenanceItem {
    id: MaintenanceId;
    status: MaintenanceStatus;
    completedAt?: Timestamp;
    title: string;
    dueDate: Timestamp;
    description: string;
    vehicleId: VehicleId;
}
export enum JobStatus {
    pending = "pending",
    in_progress = "in_progress",
    completed = "completed"
}
export enum MaintenanceStatus {
    upcoming = "upcoming",
    completed = "completed",
    overdue = "overdue"
}
export enum VehicleType {
    auto = "auto",
    moto = "moto"
}
export interface backendInterface {
    addJob(req: CreateJobRequest): Promise<Job>;
    addMaintenance(req: CreateMaintenanceRequest): Promise<MaintenanceItem>;
    addVehicle(req: CreateVehicleRequest): Promise<Vehicle>;
    deleteJob(id: JobId): Promise<boolean>;
    deleteMaintenance(id: MaintenanceId): Promise<boolean>;
    deleteVehicle(id: VehicleId): Promise<boolean>;
    getDashboardSummary(): Promise<DashboardSummary>;
    getJob(id: JobId): Promise<Job | null>;
    getMaintenance(id: MaintenanceId): Promise<MaintenanceItem | null>;
    getRecentJobs(): Promise<Array<Job>>;
    getUpcomingOrOverdueMaintenance(): Promise<Array<MaintenanceItem>>;
    getVehicle(id: VehicleId): Promise<Vehicle | null>;
    listJobs(): Promise<Array<Job>>;
    listMaintenance(): Promise<Array<MaintenanceItem>>;
    listVehicles(): Promise<Array<Vehicle>>;
    updateJob(id: JobId, req: UpdateJobRequest): Promise<Job | null>;
    updateMaintenance(id: MaintenanceId, req: UpdateMaintenanceRequest): Promise<MaintenanceItem | null>;
    updateVehicle(id: VehicleId, req: CreateVehicleRequest): Promise<Vehicle | null>;
}

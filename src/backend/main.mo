import List "mo:core/List";
import Time "mo:core/Time";
import Common "types/common";
import VehicleTypes "types/vehicles";
import JobTypes "types/jobs";
import MaintenanceTypes "types/maintenance";
import VehiclesApi "mixins/vehicles-api";
import JobsApi "mixins/jobs-api";
import MaintenanceApi "mixins/maintenance-api";
import DashboardApi "mixins/dashboard-api";

actor {
  let vehicles = List.empty<VehicleTypes.Vehicle>();
  let nextVehicleId : Common.Counter = { var value = 1 };

  let jobs = List.empty<JobTypes.Job>();
  let nextJobId : Common.Counter = { var value = 1 };

  let maintenanceItems = List.empty<MaintenanceTypes.MaintenanceItem>();
  let nextMaintenanceId : Common.Counter = { var value = 1 };

  // --- Sample data ---
  // Vehicle 1: moto
  vehicles.add({
    id = 1;
    name = "Mi Moto";
    vehicleType = #moto;
    brand = "Honda";
    model = "CB500F";
    year = 2021;
    licensePlate = "AAA111";
  });
  nextVehicleId.value := 2;

  // Vehicle 2: auto
  vehicles.add({
    id = 2;
    name = "Mi Auto";
    vehicleType = #auto;
    brand = "Toyota";
    model = "Corolla";
    year = 2019;
    licensePlate = "BBB222";
  });
  nextVehicleId.value := 3;

  // Jobs
  // now reference: Apr 18 2026 ≈ 1745539200_000_000_000 ns
  let sampleNow : Int = 1_745_539_200_000_000_000;

  jobs.add({
    id = 1;
    vehicleId = 1;
    title = "Cambio de aceite";
    description = "Cambio de aceite y filtro";
    status = #completed;
    cost = 3500;
    createdAt = sampleNow - 10_000_000_000_000;
    completedAt = ?(sampleNow - 5_000_000_000_000);
  });
  jobs.add({
    id = 2;
    vehicleId = 2;
    title = "Revisión de frenos";
    description = "Inspección y ajuste del sistema de frenos";
    status = #in_progress;
    cost = 7000;
    createdAt = sampleNow - 3_000_000_000_000;
    completedAt = null;
  });
  jobs.add({
    id = 3;
    vehicleId = 1;
    title = "Cambio de cadena";
    description = "Reemplazo de cadena y piñones";
    status = #pending;
    cost = 5000;
    createdAt = sampleNow - 1_000_000_000_000;
    completedAt = null;
  });
  jobs.add({
    id = 4;
    vehicleId = 2;
    title = "Alineación y balanceo";
    description = "Alineación de dirección y balanceo de ruedas";
    status = #pending;
    cost = 4000;
    createdAt = sampleNow - 500_000_000_000;
    completedAt = null;
  });
  nextJobId.value := 5;

  // Maintenance items
  // 1 overdue (dueDate in the past), 2 upcoming (dueDate in the future)
  maintenanceItems.add({
    id = 1;
    vehicleId = 2;
    title = "Cambio de filtro de aire";
    description = "Reemplazo del filtro de aire del motor";
    dueDate = sampleNow - 2_592_000_000_000_000; // ~30 days ago
    completedAt = null;
    status = #overdue;
  });
  maintenanceItems.add({
    id = 2;
    vehicleId = 1;
    title = "Revisión de bujías";
    description = "Inspección y cambio de bujías";
    dueDate = sampleNow + 1_296_000_000_000_000; // ~15 days from now
    completedAt = null;
    status = #upcoming;
  });
  maintenanceItems.add({
    id = 3;
    vehicleId = 2;
    title = "Cambio de correa de distribución";
    description = "Reemplazo de la correa de distribución";
    dueDate = sampleNow + 5_184_000_000_000_000; // ~60 days from now
    completedAt = null;
    status = #upcoming;
  });
  nextMaintenanceId.value := 4;

  include VehiclesApi(vehicles, nextVehicleId);
  include JobsApi(jobs, nextJobId);
  include MaintenanceApi(maintenanceItems, nextMaintenanceId);
  include DashboardApi(vehicles, jobs, maintenanceItems);
};

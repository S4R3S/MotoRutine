import List "mo:core/List";
import VehicleTypes "../types/vehicles";
import JobTypes "../types/jobs";
import MaintenanceTypes "../types/maintenance";
import DashboardTypes "../types/dashboard";
import Common "../types/common";

module {
  public func getDashboardSummary(
    vehicles : List.List<VehicleTypes.Vehicle>,
    jobs : List.List<JobTypes.Job>,
    maintenanceItems : List.List<MaintenanceTypes.MaintenanceItem>,
    now : Common.Timestamp,
  ) : DashboardTypes.DashboardSummary {
    let vehicleCount = vehicles.size();

    let pendingJobsCount = jobs.foldLeft(0, func(acc, j) {
      switch (j.status) { case (#pending) acc + 1; case _ acc };
    });

    let overdueMaintenanceCount = maintenanceItems.foldLeft(0, func(acc, m) {
      switch (m.status) {
        case (#completed) acc;
        case _ { if (m.dueDate < now) acc + 1 else acc };
      };
    });

    let totalExpenses = jobs.foldLeft(0, func(acc, j) {
      switch (j.status) { case (#completed) acc + j.cost; case _ acc };
    });

    { vehicleCount; pendingJobsCount; overdueMaintenanceCount; totalExpenses };
  };
};

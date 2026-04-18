import List "mo:core/List";
import Time "mo:core/Time";
import DashboardLib "../lib/dashboard";
import VehicleTypes "../types/vehicles";
import JobTypes "../types/jobs";
import MaintenanceTypes "../types/maintenance";
import DashboardTypes "../types/dashboard";

mixin (
  vehicles : List.List<VehicleTypes.Vehicle>,
  jobs : List.List<JobTypes.Job>,
  maintenanceItems : List.List<MaintenanceTypes.MaintenanceItem>,
) {
  public query func getDashboardSummary() : async DashboardTypes.DashboardSummary {
    DashboardLib.getDashboardSummary(vehicles, jobs, maintenanceItems, Time.now());
  };
};

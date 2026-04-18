import List "mo:core/List";
import Time "mo:core/Time";
import MaintenanceLib "../lib/maintenance";
import MaintenanceTypes "../types/maintenance";
import Common "../types/common";

mixin (
  maintenanceItems : List.List<MaintenanceTypes.MaintenanceItem>,
  nextMaintenanceId : Common.Counter,
) {
  public query func listMaintenance() : async [MaintenanceTypes.MaintenanceItem] {
    MaintenanceLib.listMaintenance(maintenanceItems);
  };

  public query func getMaintenance(id : Common.MaintenanceId) : async ?MaintenanceTypes.MaintenanceItem {
    MaintenanceLib.getMaintenanceItem(maintenanceItems, id);
  };

  public func addMaintenance(req : MaintenanceTypes.CreateMaintenanceRequest) : async MaintenanceTypes.MaintenanceItem {
    let m = MaintenanceLib.createMaintenanceItem(maintenanceItems, nextMaintenanceId.value, req, Time.now());
    nextMaintenanceId.value := nextMaintenanceId.value + 1;
    m;
  };

  public func updateMaintenance(id : Common.MaintenanceId, req : MaintenanceTypes.UpdateMaintenanceRequest) : async ?MaintenanceTypes.MaintenanceItem {
    MaintenanceLib.updateMaintenanceItem(maintenanceItems, id, req);
  };

  public func deleteMaintenance(id : Common.MaintenanceId) : async Bool {
    MaintenanceLib.deleteMaintenanceItem(maintenanceItems, id);
  };

  public query func getUpcomingOrOverdueMaintenance() : async [MaintenanceTypes.MaintenanceItem] {
    MaintenanceLib.getMaintenanceSchedule(maintenanceItems, Time.now());
  };
};

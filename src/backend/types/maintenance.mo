import Common "common";

module {
  public type MaintenanceStatus = { #upcoming; #overdue; #completed };

  public type MaintenanceItem = {
    id : Common.MaintenanceId;
    vehicleId : Common.VehicleId;
    title : Text;
    description : Text;
    dueDate : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    status : MaintenanceStatus;
  };

  public type CreateMaintenanceRequest = {
    vehicleId : Common.VehicleId;
    title : Text;
    description : Text;
    dueDate : Common.Timestamp;
  };

  public type UpdateMaintenanceRequest = {
    title : ?Text;
    description : ?Text;
    dueDate : ?Common.Timestamp;
    status : ?MaintenanceStatus;
    completedAt : ?Common.Timestamp;
  };
};

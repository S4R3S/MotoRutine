import List "mo:core/List";
import VehicleLib "../lib/vehicles";
import VehicleTypes "../types/vehicles";
import Common "../types/common";

mixin (
  vehicles : List.List<VehicleTypes.Vehicle>,
  nextVehicleId : Common.Counter,
) {
  public query func listVehicles() : async [VehicleTypes.Vehicle] {
    VehicleLib.listVehicles(vehicles);
  };

  public query func getVehicle(id : Common.VehicleId) : async ?VehicleTypes.Vehicle {
    VehicleLib.getVehicle(vehicles, id);
  };

  public func addVehicle(req : VehicleTypes.CreateVehicleRequest) : async VehicleTypes.Vehicle {
    let v = VehicleLib.createVehicle(vehicles, nextVehicleId.value, req);
    nextVehicleId.value := nextVehicleId.value + 1;
    v;
  };

  public func updateVehicle(id : Common.VehicleId, req : VehicleTypes.CreateVehicleRequest) : async ?VehicleTypes.Vehicle {
    VehicleLib.updateVehicle(vehicles, id, req);
  };

  public func deleteVehicle(id : Common.VehicleId) : async Bool {
    VehicleLib.deleteVehicle(vehicles, id);
  };
};

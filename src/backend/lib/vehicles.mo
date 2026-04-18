import List "mo:core/List";
import Types "../types/vehicles";
import Common "../types/common";

module {
  public func listVehicles(vehicles : List.List<Types.Vehicle>) : [Types.Vehicle] {
    vehicles.toArray();
  };

  public func getVehicle(vehicles : List.List<Types.Vehicle>, id : Common.VehicleId) : ?Types.Vehicle {
    vehicles.find(func(v) { v.id == id });
  };

  public func createVehicle(
    vehicles : List.List<Types.Vehicle>,
    nextId : Nat,
    req : Types.CreateVehicleRequest,
  ) : Types.Vehicle {
    let v : Types.Vehicle = {
      id = nextId;
      name = req.name;
      vehicleType = req.vehicleType;
      brand = req.brand;
      model = req.model;
      year = req.year;
      licensePlate = req.licensePlate;
    };
    vehicles.add(v);
    v;
  };

  public func updateVehicle(
    vehicles : List.List<Types.Vehicle>,
    id : Common.VehicleId,
    req : Types.CreateVehicleRequest,
  ) : ?Types.Vehicle {
    var updated : ?Types.Vehicle = null;
    vehicles.mapInPlace(func(v) {
      if (v.id == id) {
        let u : Types.Vehicle = {
          id = v.id;
          name = req.name;
          vehicleType = req.vehicleType;
          brand = req.brand;
          model = req.model;
          year = req.year;
          licensePlate = req.licensePlate;
        };
        updated := ?u;
        u;
      } else { v };
    });
    updated;
  };

  public func deleteVehicle(vehicles : List.List<Types.Vehicle>, id : Common.VehicleId) : Bool {
    let sizeBefore = vehicles.size();
    let filtered = vehicles.filter(func(v) { v.id != id });
    vehicles.clear();
    vehicles.append(filtered);
    vehicles.size() < sizeBefore;
  };

  public func countVehicles(vehicles : List.List<Types.Vehicle>) : Nat {
    vehicles.size();
  };
};

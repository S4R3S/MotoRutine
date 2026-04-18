import Common "common";

module {
  public type VehicleType = { #moto; #auto };

  public type Vehicle = {
    id : Common.VehicleId;
    name : Text;
    vehicleType : VehicleType;
    brand : Text;
    model : Text;
    year : Nat;
    licensePlate : Text;
  };

  public type CreateVehicleRequest = {
    name : Text;
    vehicleType : VehicleType;
    brand : Text;
    model : Text;
    year : Nat;
    licensePlate : Text;
  };
};

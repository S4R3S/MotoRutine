import Common "common";

module {
  public type JobStatus = { #pending; #in_progress; #completed };

  public type Job = {
    id : Common.JobId;
    vehicleId : Common.VehicleId;
    title : Text;
    description : Text;
    status : JobStatus;
    cost : Nat;
    createdAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
  };

  public type CreateJobRequest = {
    vehicleId : Common.VehicleId;
    title : Text;
    description : Text;
    cost : Nat;
  };

  public type UpdateJobRequest = {
    title : ?Text;
    description : ?Text;
    status : ?JobStatus;
    cost : ?Nat;
    completedAt : ?Common.Timestamp;
  };
};

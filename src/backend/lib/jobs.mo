import List "mo:core/List";
import Iter "mo:core/Iter";
import Types "../types/jobs";
import Common "../types/common";

module {
  public func listJobs(jobs : List.List<Types.Job>) : [Types.Job] {
    jobs.toArray();
  };

  public func getJob(jobs : List.List<Types.Job>, id : Common.JobId) : ?Types.Job {
    jobs.find(func(j) { j.id == id });
  };

  public func createJob(
    jobs : List.List<Types.Job>,
    nextId : Nat,
    req : Types.CreateJobRequest,
    createdAt : Common.Timestamp,
  ) : Types.Job {
    let j : Types.Job = {
      id = nextId;
      vehicleId = req.vehicleId;
      title = req.title;
      description = req.description;
      status = #pending;
      cost = req.cost;
      createdAt = createdAt;
      completedAt = null;
    };
    jobs.add(j);
    j;
  };

  public func updateJob(
    jobs : List.List<Types.Job>,
    id : Common.JobId,
    req : Types.UpdateJobRequest,
  ) : ?Types.Job {
    var updated : ?Types.Job = null;
    jobs.mapInPlace(func(j) {
      if (j.id == id) {
        let u : Types.Job = {
          id = j.id;
          vehicleId = j.vehicleId;
          title = switch (req.title) { case (?t) t; case null j.title };
          description = switch (req.description) { case (?d) d; case null j.description };
          status = switch (req.status) { case (?s) s; case null j.status };
          cost = switch (req.cost) { case (?c) c; case null j.cost };
          createdAt = j.createdAt;
          completedAt = switch (req.completedAt) { case (?ts) ?ts; case null j.completedAt };
        };
        updated := ?u;
        u;
      } else { j };
    });
    updated;
  };

  public func deleteJob(jobs : List.List<Types.Job>, id : Common.JobId) : Bool {
    let sizeBefore = jobs.size();
    let filtered = jobs.filter(func(j) { j.id != id });
    jobs.clear();
    jobs.append(filtered);
    jobs.size() < sizeBefore;
  };

  public func countPendingJobs(jobs : List.List<Types.Job>) : Nat {
    jobs.foldLeft<Nat, Types.Job>(0, func(acc, j) {
      switch (j.status) { case (#pending) acc + 1; case _ acc };
    });
  };

  public func sumCompletedJobsCost(jobs : List.List<Types.Job>) : Nat {
    jobs.foldLeft<Nat, Types.Job>(0, func(acc, j) {
      switch (j.status) { case (#completed) acc + j.cost; case _ acc };
    });
  };

  public func getRecentJobs(jobs : List.List<Types.Job>, limit : Nat) : [Types.Job] {
    // Sort descending by createdAt and take first `limit`
    let sorted = jobs.sort(func(a, b) {
      if (a.createdAt > b.createdAt) { #less }
      else if (a.createdAt < b.createdAt) { #greater }
      else { #equal }
    });
    sorted.values().take(limit).toArray();
  };
};

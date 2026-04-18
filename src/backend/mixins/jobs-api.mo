import List "mo:core/List";
import Time "mo:core/Time";
import JobLib "../lib/jobs";
import JobTypes "../types/jobs";
import Common "../types/common";

mixin (
  jobs : List.List<JobTypes.Job>,
  nextJobId : Common.Counter,
) {
  public query func listJobs() : async [JobTypes.Job] {
    JobLib.listJobs(jobs);
  };

  public query func getJob(id : Common.JobId) : async ?JobTypes.Job {
    JobLib.getJob(jobs, id);
  };

  public func addJob(req : JobTypes.CreateJobRequest) : async JobTypes.Job {
    let j = JobLib.createJob(jobs, nextJobId.value, req, Time.now());
    nextJobId.value := nextJobId.value + 1;
    j;
  };

  public func updateJob(id : Common.JobId, req : JobTypes.UpdateJobRequest) : async ?JobTypes.Job {
    JobLib.updateJob(jobs, id, req);
  };

  public func deleteJob(id : Common.JobId) : async Bool {
    JobLib.deleteJob(jobs, id);
  };

  public query func getRecentJobs() : async [JobTypes.Job] {
    JobLib.getRecentJobs(jobs, 3);
  };
};

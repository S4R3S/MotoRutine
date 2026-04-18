import List "mo:core/List";
import Iter "mo:core/Iter";
import Types "../types/maintenance";
import Common "../types/common";

module {
  public func listMaintenance(items : List.List<Types.MaintenanceItem>) : [Types.MaintenanceItem] {
    items.toArray();
  };

  public func getMaintenanceItem(items : List.List<Types.MaintenanceItem>, id : Common.MaintenanceId) : ?Types.MaintenanceItem {
    items.find(func(m) { m.id == id });
  };

  public func createMaintenanceItem(
    items : List.List<Types.MaintenanceItem>,
    nextId : Nat,
    req : Types.CreateMaintenanceRequest,
    now : Common.Timestamp,
  ) : Types.MaintenanceItem {
    let status : Types.MaintenanceStatus = if (req.dueDate < now) { #overdue } else { #upcoming };
    let m : Types.MaintenanceItem = {
      id = nextId;
      vehicleId = req.vehicleId;
      title = req.title;
      description = req.description;
      dueDate = req.dueDate;
      completedAt = null;
      status = status;
    };
    items.add(m);
    m;
  };

  public func updateMaintenanceItem(
    items : List.List<Types.MaintenanceItem>,
    id : Common.MaintenanceId,
    req : Types.UpdateMaintenanceRequest,
  ) : ?Types.MaintenanceItem {
    var updated : ?Types.MaintenanceItem = null;
    items.mapInPlace(func(m) {
      if (m.id == id) {
        let u : Types.MaintenanceItem = {
          id = m.id;
          vehicleId = m.vehicleId;
          title = switch (req.title) { case (?t) t; case null m.title };
          description = switch (req.description) { case (?d) d; case null m.description };
          dueDate = switch (req.dueDate) { case (?d) d; case null m.dueDate };
          status = switch (req.status) { case (?s) s; case null m.status };
          completedAt = switch (req.completedAt) { case (?ts) ?ts; case null m.completedAt };
        };
        updated := ?u;
        u;
      } else { m };
    });
    updated;
  };

  public func deleteMaintenanceItem(items : List.List<Types.MaintenanceItem>, id : Common.MaintenanceId) : Bool {
    let sizeBefore = items.size();
    let filtered = items.filter(func(m) { m.id != id });
    items.clear();
    items.append(filtered);
    items.size() < sizeBefore;
  };

  public func countOverdueMaintenance(items : List.List<Types.MaintenanceItem>, now : Common.Timestamp) : Nat {
    items.foldLeft<Nat, Types.MaintenanceItem>(0, func(acc, m) {
      switch (m.status) {
        case (#completed) acc;
        case _ { if (m.dueDate < now) acc + 1 else acc };
      };
    });
  };

  // Returns non-completed items: overdue first (dueDate < now), then upcoming, sorted by dueDate ascending
  public func getMaintenanceSchedule(items : List.List<Types.MaintenanceItem>, now : Common.Timestamp) : [Types.MaintenanceItem] {
    let nonCompleted = items.filter(func(m) {
      switch (m.status) { case (#completed) false; case _ true };
    });
    // Sort: overdue (dueDate < now) before upcoming, within each group ascending by dueDate
    let sorted = nonCompleted.sort(func(a, b) {
      let aOverdue = a.dueDate < now;
      let bOverdue = b.dueDate < now;
      if (aOverdue and not bOverdue) { #less }
      else if (not aOverdue and bOverdue) { #greater }
      else {
        if (a.dueDate < b.dueDate) { #less }
        else if (a.dueDate > b.dueDate) { #greater }
        else { #equal }
      }
    });
    sorted.toArray();
  };

  public func refreshStatuses(items : List.List<Types.MaintenanceItem>, now : Common.Timestamp) {
    items.mapInPlace(func(m) {
      switch (m.status) {
        case (#completed) m;
        case _ {
          let newStatus : Types.MaintenanceStatus = if (m.dueDate < now) { #overdue } else { #upcoming };
          { m with status = newStatus };
        };
      };
    });
  };
};

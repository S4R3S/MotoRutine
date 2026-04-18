import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Car,
  DollarSign,
  ExternalLink,
  Wrench,
} from "lucide-react";
import {
  useDashboardSummary,
  useMaintenanceSchedule,
  useRecentJobs,
} from "../hooks/useDashboard";
import { useVehicles } from "../hooks/useVehicles";
import {
  JOB_STATUS_BADGE,
  JOB_STATUS_LABEL,
  MAINTENANCE_STATUS_BADGE,
  MAINTENANCE_STATUS_LABEL,
  formatCurrency,
  formatDate,
  formatDateTime,
} from "../types";

function MetricCard({
  label,
  value,
  sublabel,
  colorClass,
  icon: Icon,
  to,
  ocid,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  colorClass: string;
  icon: React.ElementType;
  to: string;
  ocid: string;
}) {
  return (
    <Link
      to={to}
      data-ocid={ocid}
      className={`metric-card ${colorClass} block hover:shadow-elevated transition-smooth group`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="metric-label truncate">{label}</p>
          <p className="metric-value mt-1">{value}</p>
          {sublabel && <p className="metric-sublabel">{sublabel}</p>}
        </div>
        <div className="p-1.5 rounded bg-muted shrink-0">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: recentJobs, isLoading: jobsLoading } = useRecentJobs();
  const { data: maintenance, isLoading: maintLoading } =
    useMaintenanceSchedule();
  const { data: vehicles } = useVehicles();

  const vehicleNameMap = new Map(
    (vehicles ?? []).map((v) => [
      v.id.toString(),
      `${v.brand} ${v.model} (${v.licensePlate})`,
    ]),
  );

  const upcomingOrOverdue = (maintenance ?? [])
    .filter((m) => m.status === "upcoming" || m.status === "overdue")
    .sort((a, b) => {
      if (a.status === "overdue" && b.status !== "overdue") return -1;
      if (a.status !== "overdue" && b.status === "overdue") return 1;
      return Number(a.dueDate - b.dueDate);
    });

  return (
    <div className="space-y-5 animate-fade-in" data-ocid="dashboard.page">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold font-display text-foreground">
          Dashboard
        </h1>
      </div>

      {/* Metric cards */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        data-ocid="dashboard.metrics_section"
      >
        {summaryLoading ? (
          [1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24" />)
        ) : (
          <>
            <MetricCard
              label="Vehículos"
              value={Number(summary?.vehicleCount ?? 0)}
              sublabel="Registrados"
              colorClass="metric-card-primary"
              icon={Car}
              to="/vehicles"
              ocid="dashboard.vehicles_metric"
            />
            <MetricCard
              label="Trabajos Pendientes"
              value={Number(summary?.pendingJobsCount ?? 0)}
              sublabel="Sin completar"
              colorClass="metric-card-secondary"
              icon={Wrench}
              to="/jobs"
              ocid="dashboard.pending_jobs_metric"
            />
            <MetricCard
              label="Mant. Vencidos"
              value={Number(summary?.overdueMaintenanceCount ?? 0)}
              sublabel="Urgentes"
              colorClass="metric-card-accent"
              icon={AlertTriangle}
              to="/maintenance"
              ocid="dashboard.overdue_maintenance_metric"
            />
            <MetricCard
              label="Gasto Total"
              value={formatCurrency(summary?.totalExpenses ?? 0n)}
              sublabel="Acumulado"
              colorClass="metric-card-muted"
              icon={DollarSign}
              to="/jobs"
              ocid="dashboard.total_expense_metric"
            />
          </>
        )}
      </div>

      {/* Recent jobs */}
      <div className="section-card" data-ocid="dashboard.recent_jobs_section">
        <div className="section-header flex items-center justify-between">
          <h2 className="section-title">Últimos Trabajos</h2>
          <Link
            to="/jobs"
            className="text-xs text-primary hover:underline flex items-center gap-1"
            data-ocid="dashboard.jobs_link"
          >
            Ver todos <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {jobsLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : (recentJobs ?? []).length === 0 ? (
          <div
            className="p-8 text-center"
            data-ocid="dashboard.recent_jobs_empty_state"
          >
            <p className="text-sm text-muted-foreground">
              No hay trabajos registrados.
            </p>
            <Link
              to="/jobs"
              className="text-xs text-primary hover:underline mt-1 inline-block"
              data-ocid="dashboard.jobs_cta_link"
            >
              Registrar primer trabajo →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Fecha
                  </th>
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Vehículo
                  </th>
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Servicio
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium">
                    Costo
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {(recentJobs ?? []).slice(0, 3).map((job, i) => (
                  <tr
                    key={job.id.toString()}
                    className="list-item hover:bg-muted/20"
                    data-ocid={`dashboard.recent_jobs.item.${i + 1}`}
                  >
                    <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">
                      {formatDateTime(job.createdAt)}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-foreground truncate max-w-[140px]">
                      {vehicleNameMap.get(job.vehicleId.toString()) ??
                        `Vehículo #${job.vehicleId}`}
                    </td>
                    <td className="px-4 py-2.5 text-foreground truncate max-w-[180px]">
                      {job.title}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-foreground whitespace-nowrap">
                      {formatCurrency(job.cost)}
                    </td>
                    <td className="px-4 py-2.5 text-right whitespace-nowrap">
                      <span
                        className={
                          JOB_STATUS_BADGE[job.status] ?? "badge-pending"
                        }
                      >
                        {JOB_STATUS_LABEL[job.status] ?? job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upcoming / Overdue Maintenance */}
      <div className="section-card" data-ocid="dashboard.maintenance_section">
        <div className="section-header flex items-center justify-between">
          <h2 className="section-title">Mantenimientos Próximos/Vencidos</h2>
          <Link
            to="/maintenance"
            className="text-xs text-primary hover:underline flex items-center gap-1"
            data-ocid="dashboard.maintenance_link"
          >
            Ver todos <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {maintLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : upcomingOrOverdue.length === 0 ? (
          <div
            className="p-8 text-center"
            data-ocid="dashboard.maintenance_empty_state"
          >
            <p className="text-sm text-muted-foreground">
              No hay mantenimientos pendientes.
            </p>
            <Link
              to="/maintenance"
              className="text-xs text-primary hover:underline mt-1 inline-block"
              data-ocid="dashboard.maintenance_cta_link"
            >
              Programar mantenimiento →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Descripción
                  </th>
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Vehículo
                  </th>
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Fecha urgencia
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium">
                    Estado
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium" />
                </tr>
              </thead>
              <tbody>
                {upcomingOrOverdue.map((item, i) => (
                  <tr
                    key={item.id.toString()}
                    className="list-item hover:bg-muted/20"
                    data-ocid={`dashboard.maintenance.item.${i + 1}`}
                  >
                    <td className="px-4 py-2.5 font-medium text-foreground truncate max-w-[220px]">
                      {item.title}
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground truncate max-w-[140px]">
                      {vehicleNameMap.get(item.vehicleId.toString()) ??
                        `Vehículo #${item.vehicleId}`}
                    </td>
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {formatDate(item.dueDate)}
                        </span>
                        <span
                          className={
                            MAINTENANCE_STATUS_BADGE[item.status] ??
                            "badge-pending"
                          }
                        >
                          {MAINTENANCE_STATUS_LABEL[item.status] ?? item.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right" aria-hidden="true" />
                    <td className="px-4 py-2.5 text-right whitespace-nowrap">
                      <Link
                        to="/maintenance"
                        className="text-xs text-primary hover:underline"
                        data-ocid={`dashboard.maintenance.details_link.${i + 1}`}
                      >
                        Ver Detalles
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

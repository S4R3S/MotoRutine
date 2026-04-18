import { c as createLucideIcon, j as jsxRuntimeExports, S as Skeleton, C as Car, W as Wrench, L as Link } from "./index-CI3iF-qF.js";
import { u as useActor, a as useQuery, c as createActor, b as useVehicles, f as formatCurrency, d as formatDateTime, J as JOB_STATUS_LABEL, e as JOB_STATUS_BADGE, g as formatDate, M as MAINTENANCE_STATUS_LABEL, h as MAINTENANCE_STATUS_BADGE } from "./index-CY98sN_Q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function useDashboardSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["dashboardSummary"],
    queryFn: async () => {
      if (!actor) {
        return {
          vehicleCount: 0n,
          pendingJobsCount: 0n,
          overdueMaintenanceCount: 0n,
          totalExpenses: 0n
        };
      }
      return actor.getDashboardSummary();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useRecentJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["recentJobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentJobs();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useMaintenanceSchedule() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["maintenanceSchedule"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUpcomingOrOverdueMaintenance();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function MetricCard({
  label,
  value,
  sublabel,
  colorClass,
  icon: Icon,
  to,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to,
      "data-ocid": ocid,
      className: `metric-card ${colorClass} block hover:shadow-elevated transition-smooth group`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-label truncate", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-value mt-1", children: value }),
          sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "metric-sublabel", children: sublabel })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-muted-foreground" }) })
      ] })
    }
  );
}
function Dashboard() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: recentJobs, isLoading: jobsLoading } = useRecentJobs();
  const { data: maintenance, isLoading: maintLoading } = useMaintenanceSchedule();
  const { data: vehicles } = useVehicles();
  const vehicleNameMap = new Map(
    (vehicles ?? []).map((v) => [
      v.id.toString(),
      `${v.brand} ${v.model} (${v.licensePlate})`
    ])
  );
  const upcomingOrOverdue = (maintenance ?? []).filter((m) => m.status === "upcoming" || m.status === "overdue").sort((a, b) => {
    if (a.status === "overdue" && b.status !== "overdue") return -1;
    if (a.status !== "overdue" && b.status === "overdue") return 1;
    return Number(a.dueDate - b.dueDate);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 animate-fade-in", "data-ocid": "dashboard.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground", children: "Dashboard" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
        "data-ocid": "dashboard.metrics_section",
        children: summaryLoading ? [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Vehículos",
              value: Number((summary == null ? void 0 : summary.vehicleCount) ?? 0),
              sublabel: "Registrados",
              colorClass: "metric-card-primary",
              icon: Car,
              to: "/vehicles",
              ocid: "dashboard.vehicles_metric"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Trabajos Pendientes",
              value: Number((summary == null ? void 0 : summary.pendingJobsCount) ?? 0),
              sublabel: "Sin completar",
              colorClass: "metric-card-secondary",
              icon: Wrench,
              to: "/jobs",
              ocid: "dashboard.pending_jobs_metric"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Mant. Vencidos",
              value: Number((summary == null ? void 0 : summary.overdueMaintenanceCount) ?? 0),
              sublabel: "Urgentes",
              colorClass: "metric-card-accent",
              icon: TriangleAlert,
              to: "/maintenance",
              ocid: "dashboard.overdue_maintenance_metric"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MetricCard,
            {
              label: "Gasto Total",
              value: formatCurrency((summary == null ? void 0 : summary.totalExpenses) ?? 0n),
              sublabel: "Acumulado",
              colorClass: "metric-card-muted",
              icon: DollarSign,
              to: "/jobs",
              ocid: "dashboard.total_expense_metric"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-card", "data-ocid": "dashboard.recent_jobs_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Últimos Trabajos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/jobs",
            className: "text-xs text-primary hover:underline flex items-center gap-1",
            "data-ocid": "dashboard.jobs_link",
            children: [
              "Ver todos ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      jobsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, i)) }) : (recentJobs ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-8 text-center",
          "data-ocid": "dashboard.recent_jobs_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No hay trabajos registrados." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/jobs",
                className: "text-xs text-primary hover:underline mt-1 inline-block",
                "data-ocid": "dashboard.jobs_cta_link",
                children: "Registrar primer trabajo →"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Fecha" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Vehículo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Servicio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Costo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Estado" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (recentJobs ?? []).slice(0, 3).map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "list-item hover:bg-muted/20",
            "data-ocid": `dashboard.recent_jobs.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground whitespace-nowrap", children: formatDateTime(job.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground truncate max-w-[140px]", children: vehicleNameMap.get(job.vehicleId.toString()) ?? `Vehículo #${job.vehicleId}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground truncate max-w-[180px]", children: job.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-mono text-foreground whitespace-nowrap", children: formatCurrency(job.cost) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: JOB_STATUS_BADGE[job.status] ?? "badge-pending",
                  children: JOB_STATUS_LABEL[job.status] ?? job.status
                }
              ) })
            ]
          },
          job.id.toString()
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-card", "data-ocid": "dashboard.maintenance_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section-header flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Mantenimientos Próximos/Vencidos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/maintenance",
            className: "text-xs text-primary hover:underline flex items-center gap-1",
            "data-ocid": "dashboard.maintenance_link",
            children: [
              "Ver todos ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3 h-3" })
            ]
          }
        )
      ] }),
      maintLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, i)) }) : upcomingOrOverdue.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "p-8 text-center",
          "data-ocid": "dashboard.maintenance_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No hay mantenimientos pendientes." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/maintenance",
                className: "text-xs text-primary hover:underline mt-1 inline-block",
                "data-ocid": "dashboard.maintenance_cta_link",
                children: "Programar mantenimiento →"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Descripción" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Vehículo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Fecha urgencia" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Estado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: upcomingOrOverdue.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "list-item hover:bg-muted/20",
            "data-ocid": `dashboard.maintenance.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground truncate max-w-[220px]", children: item.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground truncate max-w-[140px]", children: vehicleNameMap.get(item.vehicleId.toString()) ?? `Vehículo #${item.vehicleId}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: formatDate(item.dueDate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: MAINTENANCE_STATUS_BADGE[item.status] ?? "badge-pending",
                    children: MAINTENANCE_STATUS_LABEL[item.status] ?? item.status
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/maintenance",
                  className: "text-xs text-primary hover:underline",
                  "data-ocid": `dashboard.maintenance.details_link.${i + 1}`,
                  children: "Ver Detalles"
                }
              ) })
            ]
          },
          item.id.toString()
        )) })
      ] }) })
    ] })
  ] });
}
export {
  Dashboard as default
};

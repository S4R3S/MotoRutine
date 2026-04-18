import { a as useQueryClient, r as reactExports, j as jsxRuntimeExports, S as Skeleton, W as Wrench, u as ue } from "./index-CI3iF-qF.js";
import { B as Button, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, L as Label, S as Select, e as SelectTrigger, f as SelectValue, g as SelectContent, h as SelectItem, I as Input, d as Pencil, T as Trash2 } from "./select-DqWvkUTi.js";
import { T as Textarea } from "./textarea-Di7Xvcor.js";
import { u as useActor, a as useQuery, m as useMutation, c as createActor, b as useVehicles, n as JobStatus, d as formatDateTime, f as formatCurrency, J as JOB_STATUS_LABEL, e as JOB_STATUS_BADGE } from "./index-CY98sN_Q.js";
function useJobs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateJob() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.addJob(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recentJobs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useUpdateJob() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.updateJob(id, req);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job", id.toString()] });
      queryClient.invalidateQueries({ queryKey: ["recentJobs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useDeleteJob() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteJob(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["recentJobs"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
const STATUS_OPTIONS = [
  { value: JobStatus.pending, label: "Pendiente" },
  { value: JobStatus.in_progress, label: "En Progreso" },
  { value: JobStatus.completed, label: "Completado" }
];
function JobRow({
  job,
  idx,
  vehicleName,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "list-item hover:bg-muted/20 text-xs",
      "data-ocid": `jobs.item.${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground whitespace-nowrap", children: formatDateTime(job.createdAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground truncate max-w-[120px]", children: vehicleName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground truncate max-w-[200px]", children: job.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-mono whitespace-nowrap", children: formatCurrency(job.cost) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: JOB_STATUS_BADGE[job.status] ?? "badge-pending", children: JOB_STATUS_LABEL[job.status] ?? job.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              onClick: () => onEdit(job),
              "aria-label": "Editar trabajo",
              "data-ocid": `jobs.edit_button.${idx}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6 text-destructive hover:text-destructive",
              onClick: () => onDelete(job.id),
              "aria-label": "Eliminar trabajo",
              "data-ocid": `jobs.delete_button.${idx}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ] }) })
      ]
    }
  );
}
function Jobs() {
  const { data: jobs, isLoading } = useJobs();
  const { data: vehicles } = useVehicles();
  const create = useCreateJob();
  const update = useUpdateJob();
  const del = useDeleteJob();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    cost: 0n,
    vehicleId: 0n
  });
  const [statusOverride, setStatusOverride] = reactExports.useState(
    JobStatus.pending
  );
  const vehicleMap = new Map(
    (vehicles ?? []).map((v) => [
      v.id.toString(),
      `${v.brand} ${v.model} (${v.licensePlate})`
    ])
  );
  const openCreate = () => {
    var _a;
    setEditing(null);
    setForm({
      title: "",
      description: "",
      cost: 0n,
      vehicleId: ((_a = vehicles == null ? void 0 : vehicles[0]) == null ? void 0 : _a.id) ?? 0n
    });
    setStatusOverride(JobStatus.pending);
    setOpen(true);
  };
  const openEdit = (job) => {
    setEditing(job);
    setForm({
      title: job.title,
      description: job.description,
      cost: job.cost,
      vehicleId: job.vehicleId
    });
    setStatusOverride(job.status);
    setOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const req = {
          title: form.title,
          description: form.description,
          cost: form.cost,
          status: statusOverride
        };
        await update.mutateAsync({ id: editing.id, req });
        ue.success("Trabajo actualizado");
      } else {
        await create.mutateAsync(form);
        ue.success("Trabajo registrado");
      }
      setOpen(false);
      setEditing(null);
    } catch {
      ue.error("Error al guardar trabajo");
    }
  };
  const handleDelete = async (id) => {
    try {
      await del.mutateAsync(id);
      ue.success("Trabajo eliminado");
    } catch {
      ue.error("Error al eliminar trabajo");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-fade-in", "data-ocid": "jobs.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground", children: "Trabajos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "h-8 text-xs gap-1.5",
          onClick: openCreate,
          "data-ocid": "jobs.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Agregar"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-card", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, i)) }) : (jobs ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", "data-ocid": "jobs.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sin trabajos registrados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Registrá el primer trabajo realizado." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "mt-3 h-8 text-xs gap-1.5",
          onClick: openCreate,
          "data-ocid": "jobs.empty_add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Agregar Trabajo"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Fecha" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Vehículo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Servicio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Costo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Estado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (jobs ?? []).map((job, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        JobRow,
        {
          job,
          idx: i + 1,
          vehicleName: vehicleMap.get(job.vehicleId.toString()) ?? `Vehículo #${job.vehicleId}`,
          onEdit: openEdit,
          onDelete: handleDelete
        },
        job.id.toString()
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Dialog,
      {
        open,
        onOpenChange: (o) => {
          setOpen(o);
          if (!o) setEditing(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "jobs.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-display", children: editing ? "Editar Trabajo" : "Nuevo Trabajo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-3 mt-2",
              "data-ocid": "job_form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Vehículo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: form.vehicleId.toString(),
                      onValueChange: (v) => setForm((f) => ({ ...f, vehicleId: BigInt(v) })),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-8 text-xs mt-1",
                            "data-ocid": "job_form.vehicle_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Seleccionar vehículo" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (vehicles ?? []).map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: v.id.toString(), children: [
                          v.brand,
                          " ",
                          v.model,
                          " (",
                          v.licensePlate,
                          ")"
                        ] }, v.id.toString())) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "jtitle", className: "text-xs", children: "Servicio / Título" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "jtitle",
                      value: form.title,
                      onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                      required: true,
                      className: "h-8 text-xs mt-1",
                      "data-ocid": "job_form.title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "jdesc", className: "text-xs", children: "Descripción" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "jdesc",
                      value: form.description,
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      rows: 2,
                      className: "text-xs mt-1 resize-none",
                      "data-ocid": "job_form.description_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "jcost", className: "text-xs", children: "Costo ($)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "jcost",
                      type: "number",
                      min: 0,
                      value: form.cost.toString(),
                      onChange: (e) => setForm((f) => ({
                        ...f,
                        cost: BigInt(
                          Math.max(0, Number.parseInt(e.target.value) || 0)
                        )
                      })),
                      required: true,
                      className: "h-8 text-xs mt-1",
                      "data-ocid": "job_form.cost_input"
                    }
                  )
                ] }),
                editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Estado" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Select,
                    {
                      value: statusOverride,
                      onValueChange: (v) => setStatusOverride(v),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          SelectTrigger,
                          {
                            className: "h-8 text-xs mt-1",
                            "data-ocid": "job_form.status_select",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.value, children: s.label }, s.value)) })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: create.isPending || update.isPending,
                    className: "w-full h-8 text-xs",
                    "data-ocid": "job_form.submit_button",
                    children: create.isPending || update.isPending ? "Guardando..." : "Guardar Trabajo"
                  }
                )
              ]
            }
          )
        ] })
      }
    )
  ] });
}
export {
  Jobs as default
};

import { a as useQueryClient, r as reactExports, j as jsxRuntimeExports, S as Skeleton, b as ClipboardList, u as ue } from "./index-CI3iF-qF.js";
import { B as Button, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, L as Label, S as Select, e as SelectTrigger, f as SelectValue, g as SelectContent, h as SelectItem, I as Input, d as Pencil, T as Trash2 } from "./select-DqWvkUTi.js";
import { T as Textarea } from "./textarea-Di7Xvcor.js";
import { u as useActor, a as useQuery, m as useMutation, c as createActor, b as useVehicles, o as MaintenanceStatus, g as formatDate, M as MAINTENANCE_STATUS_LABEL, h as MAINTENANCE_STATUS_BADGE } from "./index-CY98sN_Q.js";
function useMaintenance() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["maintenance"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMaintenance();
    },
    enabled: !!actor && !isFetching
  });
}
function useCreateMaintenance() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.addMaintenance(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["maintenanceSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useUpdateMaintenance() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, req }) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.updateMaintenance(id, req);
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      queryClient.invalidateQueries({
        queryKey: ["maintenanceItem", id.toString()]
      });
      queryClient.invalidateQueries({ queryKey: ["maintenanceSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function useDeleteMaintenance() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor no disponible");
      return actor.deleteMaintenance(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["maintenanceSchedule"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardSummary"] });
    }
  });
}
function dateToTimestamp(dateStr) {
  return BigInt(new Date(dateStr).getTime()) * 1000000n;
}
function timestampToDateInput(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toISOString().slice(0, 10);
}
function MaintenanceRow({
  item,
  idx,
  vehicleName,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "list-item hover:bg-muted/20 text-xs",
      "data-ocid": `maintenance.item.${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground truncate max-w-[220px]", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground truncate max-w-[140px]", children: vehicleName }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              onClick: () => onEdit(item),
              "aria-label": "Editar mantenimiento",
              "data-ocid": `maintenance.edit_button.${idx}`,
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
              onClick: () => onDelete(item.id),
              "aria-label": "Eliminar mantenimiento",
              "data-ocid": `maintenance.delete_button.${idx}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ] }) })
      ]
    }
  );
}
function Maintenance() {
  const { data: items, isLoading } = useMaintenance();
  const { data: vehicles } = useVehicles();
  const create = useCreateMaintenance();
  const update = useUpdateMaintenance();
  const del = useDeleteMaintenance();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    vehicleId: 0n,
    dueDate: dateToTimestamp((/* @__PURE__ */ new Date()).toISOString().slice(0, 10))
  });
  const [dateStr, setDateStr] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [statusOverride, setStatusOverride] = reactExports.useState(
    MaintenanceStatus.upcoming
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
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    setDateStr(today);
    setForm({
      title: "",
      description: "",
      vehicleId: ((_a = vehicles == null ? void 0 : vehicles[0]) == null ? void 0 : _a.id) ?? 0n,
      dueDate: dateToTimestamp(today)
    });
    setStatusOverride(MaintenanceStatus.upcoming);
    setOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item);
    const ds = timestampToDateInput(item.dueDate);
    setDateStr(ds);
    setForm({
      title: item.title,
      description: item.description,
      vehicleId: item.vehicleId,
      dueDate: item.dueDate
    });
    setStatusOverride(item.status);
    setOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        const req = {
          title: form.title,
          description: form.description,
          dueDate: form.dueDate,
          status: statusOverride
        };
        await update.mutateAsync({ id: editing.id, req });
        ue.success("Mantenimiento actualizado");
      } else {
        await create.mutateAsync(form);
        ue.success("Mantenimiento registrado");
      }
      setOpen(false);
      setEditing(null);
    } catch {
      ue.error("Error al guardar mantenimiento");
    }
  };
  const handleDelete = async (id) => {
    try {
      await del.mutateAsync(id);
      ue.success("Mantenimiento eliminado");
    } catch {
      ue.error("Error al eliminar mantenimiento");
    }
  };
  const STATUS_OPTIONS = [
    { value: MaintenanceStatus.upcoming, label: "Próximo" },
    { value: MaintenanceStatus.completed, label: "Completado" },
    { value: MaintenanceStatus.overdue, label: "Vencido" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-fade-in", "data-ocid": "maintenance.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground", children: "Mantenimiento" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "h-8 text-xs gap-1.5",
          onClick: openCreate,
          "data-ocid": "maintenance.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Agregar"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-card", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10" }, i)) }) : (items ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", "data-ocid": "maintenance.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sin mantenimientos registrados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Programá el primer mantenimiento de tus vehículos." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "mt-3 h-8 text-xs gap-1.5",
          onClick: openCreate,
          "data-ocid": "maintenance.empty_add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Programar Mantenimiento"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Descripción" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Vehículo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Fecha urgencia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (items ?? []).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MaintenanceRow,
        {
          item,
          idx: i + 1,
          vehicleName: vehicleMap.get(item.vehicleId.toString()) ?? `Vehículo #${item.vehicleId}`,
          onEdit: openEdit,
          onDelete: handleDelete
        },
        item.id.toString()
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
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "maintenance.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-display", children: editing ? "Editar Mantenimiento" : "Nuevo Mantenimiento" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleSubmit,
              className: "space-y-3 mt-2",
              "data-ocid": "maintenance_form",
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
                            "data-ocid": "maintenance_form.vehicle_select",
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mtitle", className: "text-xs", children: "Título" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "mtitle",
                      value: form.title,
                      onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                      required: true,
                      className: "h-8 text-xs mt-1",
                      "data-ocid": "maintenance_form.title_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mdesc", className: "text-xs", children: "Descripción" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "mdesc",
                      value: form.description,
                      onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                      rows: 2,
                      className: "text-xs mt-1 resize-none",
                      "data-ocid": "maintenance_form.description_textarea"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mdate", className: "text-xs", children: "Fecha de vencimiento" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "mdate",
                      type: "date",
                      value: dateStr,
                      onChange: (e) => {
                        setDateStr(e.target.value);
                        setForm((f) => ({
                          ...f,
                          dueDate: dateToTimestamp(e.target.value)
                        }));
                      },
                      required: true,
                      className: "h-8 text-xs mt-1",
                      "data-ocid": "maintenance_form.date_input"
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
                            "data-ocid": "maintenance_form.status_select",
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
                    "data-ocid": "maintenance_form.submit_button",
                    children: create.isPending || update.isPending ? "Guardando..." : "Guardar Mantenimiento"
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
  Maintenance as default
};

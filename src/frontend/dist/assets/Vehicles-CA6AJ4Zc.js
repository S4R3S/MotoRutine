import { r as reactExports, j as jsxRuntimeExports, S as Skeleton, C as Car, u as ue } from "./index-CI3iF-qF.js";
import { B as Button, P as Plus, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as Pencil, T as Trash2, L as Label, I as Input, S as Select, e as SelectTrigger, f as SelectValue, g as SelectContent, h as SelectItem } from "./select-DqWvkUTi.js";
import { b as useVehicles, i as useCreateVehicle, j as useUpdateVehicle, k as useDeleteVehicle, V as VehicleType, l as VEHICLE_TYPE_LABEL } from "./index-CY98sN_Q.js";
const EMPTY_FORM = {
  name: "",
  brand: "",
  model: "",
  year: 2024n,
  licensePlate: "",
  vehicleType: VehicleType.auto
};
function VehicleForm({
  initial,
  onSubmit,
  loading
}) {
  const [form, setForm] = reactExports.useState(initial);
  const set = (field, value) => {
    setForm((f) => ({
      ...f,
      [field]: field === "year" ? BigInt(value || 2024) : value
    }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        onSubmit(form);
      },
      className: "space-y-3 mt-2",
      "data-ocid": "vehicle_form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vname", className: "text-xs", children: "Nombre / Alias" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "vname",
                value: form.name,
                onChange: (e) => set("name", e.target.value),
                required: true,
                className: "h-8 text-xs mt-1",
                "data-ocid": "vehicle_form.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vbrand", className: "text-xs", children: "Marca" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "vbrand",
                value: form.brand,
                onChange: (e) => set("brand", e.target.value),
                required: true,
                className: "h-8 text-xs mt-1",
                "data-ocid": "vehicle_form.brand_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vmodel", className: "text-xs", children: "Modelo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "vmodel",
                value: form.model,
                onChange: (e) => set("model", e.target.value),
                required: true,
                className: "h-8 text-xs mt-1",
                "data-ocid": "vehicle_form.model_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vyear", className: "text-xs", children: "Año" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "vyear",
                type: "number",
                min: 1900,
                max: 2100,
                value: form.year.toString(),
                onChange: (e) => set("year", e.target.value),
                required: true,
                className: "h-8 text-xs mt-1",
                "data-ocid": "vehicle_form.year_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "vplate", className: "text-xs", children: "Patente" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "vplate",
                value: form.licensePlate,
                onChange: (e) => set("licensePlate", e.target.value),
                required: true,
                className: "h-8 text-xs mt-1",
                "data-ocid": "vehicle_form.plate_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Tipo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: form.vehicleType,
                onValueChange: (v) => set("vehicleType", v),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      className: "h-8 text-xs mt-1",
                      "data-ocid": "vehicle_form.type_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: VehicleType.auto, children: VEHICLE_TYPE_LABEL.auto }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: VehicleType.moto, children: VEHICLE_TYPE_LABEL.moto })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: loading,
            className: "w-full h-8 text-xs",
            "data-ocid": "vehicle_form.submit_button",
            children: loading ? "Guardando..." : "Guardar Vehículo"
          }
        )
      ]
    }
  );
}
function VehicleRow({
  v,
  idx,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "tr",
    {
      className: "list-item hover:bg-muted/20 text-xs",
      "data-ocid": `vehicles.item.${idx}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-foreground", children: v.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
            v.brand,
            " ",
            v.model,
            " · ",
            v.year.toString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: v.licensePlate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-pending", children: VEHICLE_TYPE_LABEL[v.vehicleType] ?? v.vehicleType }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
              onClick: () => onEdit(v),
              "aria-label": "Editar vehículo",
              "data-ocid": `vehicles.edit_button.${idx}`,
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
              onClick: () => onDelete(v.id),
              "aria-label": "Eliminar vehículo",
              "data-ocid": `vehicles.delete_button.${idx}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
            }
          )
        ] }) })
      ]
    }
  );
}
function Vehicles() {
  const { data: vehicles, isLoading } = useVehicles();
  const create = useCreateVehicle();
  const update = useUpdateVehicle();
  const del = useDeleteVehicle();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const handleSubmit = async (req) => {
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, req });
        ue.success("Vehículo actualizado");
      } else {
        await create.mutateAsync(req);
        ue.success("Vehículo registrado");
      }
      setOpen(false);
      setEditing(null);
    } catch {
      ue.error("Error al guardar vehículo");
    }
  };
  const handleDelete = async (id) => {
    try {
      await del.mutateAsync(id);
      ue.success("Vehículo eliminado");
    } catch {
      ue.error("Error al eliminar vehículo");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 animate-fade-in", "data-ocid": "vehicles.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold font-display text-foreground", children: "Vehículos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "h-8 text-xs gap-1.5",
          onClick: () => {
            setEditing(null);
            setOpen(true);
          },
          "data-ocid": "vehicles.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Agregar"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "section-card", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12" }, i)) }) : (vehicles ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-10 text-center", "data-ocid": "vehicles.empty_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Sin vehículos registrados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Agregá tu primer vehículo para comenzar." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          size: "sm",
          className: "mt-3 h-8 text-xs gap-1.5",
          onClick: () => setOpen(true),
          "data-ocid": "vehicles.empty_add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            " Agregar Vehículo"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Vehículo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Patente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 text-muted-foreground font-medium", children: "Tipo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 text-muted-foreground font-medium", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (vehicles ?? []).map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        VehicleRow,
        {
          v,
          idx: i + 1,
          onEdit: (veh) => {
            setEditing(veh);
            setOpen(true);
          },
          onDelete: handleDelete
        },
        v.id.toString()
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
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", "data-ocid": "vehicles.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-display", children: editing ? "Editar Vehículo" : "Nuevo Vehículo" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            VehicleForm,
            {
              initial: editing ? {
                name: editing.name,
                brand: editing.brand,
                model: editing.model,
                year: editing.year,
                licensePlate: editing.licensePlate,
                vehicleType: editing.vehicleType
              } : EMPTY_FORM,
              onSubmit: handleSubmit,
              loading: create.isPending || update.isPending
            }
          )
        ] })
      }
    )
  ] });
}
export {
  Vehicles as default
};

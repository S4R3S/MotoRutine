import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { ClipboardList, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateMaintenance,
  useDeleteMaintenance,
  useMaintenance,
  useUpdateMaintenance,
} from "../hooks/useMaintenance";
import { useVehicles } from "../hooks/useVehicles";
import type {
  CreateMaintenanceRequest,
  MaintenanceId,
  MaintenanceItem,
  UpdateMaintenanceRequest,
} from "../types";
import {
  MAINTENANCE_STATUS_BADGE,
  MAINTENANCE_STATUS_LABEL,
  MaintenanceStatus,
  formatDate,
} from "../types";

function dateToTimestamp(dateStr: string): bigint {
  return BigInt(new Date(dateStr).getTime()) * 1_000_000n;
}

function timestampToDateInput(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toISOString().slice(0, 10);
}

function MaintenanceRow({
  item,
  idx,
  vehicleName,
  onEdit,
  onDelete,
}: {
  item: MaintenanceItem;
  idx: number;
  vehicleName: string;
  onEdit: (m: MaintenanceItem) => void;
  onDelete: (id: MaintenanceId) => void;
}) {
  return (
    <tr
      className="list-item hover:bg-muted/20 text-xs"
      data-ocid={`maintenance.item.${idx}`}
    >
      <td className="px-4 py-2.5 font-medium text-foreground truncate max-w-[220px]">
        {item.title}
      </td>
      <td className="px-4 py-2.5 text-muted-foreground truncate max-w-[140px]">
        {vehicleName}
      </td>
      <td className="px-4 py-2.5 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            {formatDate(item.dueDate)}
          </span>
          <span
            className={MAINTENANCE_STATUS_BADGE[item.status] ?? "badge-pending"}
          >
            {MAINTENANCE_STATUS_LABEL[item.status] ?? item.status}
          </span>
        </div>
      </td>
      <td className="px-4 py-2.5 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onEdit(item)}
            aria-label="Editar mantenimiento"
            data-ocid={`maintenance.edit_button.${idx}`}
          >
            <Pencil className="w-3 h-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive hover:text-destructive"
            onClick={() => onDelete(item.id)}
            aria-label="Eliminar mantenimiento"
            data-ocid={`maintenance.delete_button.${idx}`}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function Maintenance() {
  const { data: items, isLoading } = useMaintenance();
  const { data: vehicles } = useVehicles();
  const create = useCreateMaintenance();
  const update = useUpdateMaintenance();
  const del = useDeleteMaintenance();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MaintenanceItem | null>(null);
  const [form, setForm] = useState<CreateMaintenanceRequest>({
    title: "",
    description: "",
    vehicleId: 0n,
    dueDate: dateToTimestamp(new Date().toISOString().slice(0, 10)),
  });
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 10));
  const [statusOverride, setStatusOverride] = useState<MaintenanceStatus>(
    MaintenanceStatus.upcoming,
  );

  const vehicleMap = new Map(
    (vehicles ?? []).map((v) => [
      v.id.toString(),
      `${v.brand} ${v.model} (${v.licensePlate})`,
    ]),
  );

  const openCreate = () => {
    setEditing(null);
    const today = new Date().toISOString().slice(0, 10);
    setDateStr(today);
    setForm({
      title: "",
      description: "",
      vehicleId: vehicles?.[0]?.id ?? 0n,
      dueDate: dateToTimestamp(today),
    });
    setStatusOverride(MaintenanceStatus.upcoming);
    setOpen(true);
  };

  const openEdit = (item: MaintenanceItem) => {
    setEditing(item);
    const ds = timestampToDateInput(item.dueDate);
    setDateStr(ds);
    setForm({
      title: item.title,
      description: item.description,
      vehicleId: item.vehicleId,
      dueDate: item.dueDate,
    });
    setStatusOverride(item.status as MaintenanceStatus);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const req: UpdateMaintenanceRequest = {
          title: form.title,
          description: form.description,
          dueDate: form.dueDate,
          status: statusOverride,
        };
        await update.mutateAsync({ id: editing.id, req });
        toast.success("Mantenimiento actualizado");
      } else {
        await create.mutateAsync(form);
        toast.success("Mantenimiento registrado");
      }
      setOpen(false);
      setEditing(null);
    } catch {
      toast.error("Error al guardar mantenimiento");
    }
  };

  const handleDelete = async (id: MaintenanceId) => {
    try {
      await del.mutateAsync(id);
      toast.success("Mantenimiento eliminado");
    } catch {
      toast.error("Error al eliminar mantenimiento");
    }
  };

  const STATUS_OPTIONS = [
    { value: MaintenanceStatus.upcoming, label: "Próximo" },
    { value: MaintenanceStatus.completed, label: "Completado" },
    { value: MaintenanceStatus.overdue, label: "Vencido" },
  ];

  return (
    <div className="space-y-4 animate-fade-in" data-ocid="maintenance.page">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold font-display text-foreground">
          Mantenimiento
        </h1>
        <Button
          type="button"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={openCreate}
          data-ocid="maintenance.add_button"
        >
          <Plus className="w-3.5 h-3.5" /> Agregar
        </Button>
      </div>

      <div className="section-card">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10" />
            ))}
          </div>
        ) : (items ?? []).length === 0 ? (
          <div className="p-10 text-center" data-ocid="maintenance.empty_state">
            <ClipboardList className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              Sin mantenimientos registrados
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Programá el primer mantenimiento de tus vehículos.
            </p>
            <Button
              type="button"
              size="sm"
              className="mt-3 h-8 text-xs gap-1.5"
              onClick={openCreate}
              data-ocid="maintenance.empty_add_button"
            >
              <Plus className="w-3.5 h-3.5" /> Programar Mantenimiento
            </Button>
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
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {(items ?? []).map((item, i) => (
                  <MaintenanceRow
                    key={item.id.toString()}
                    item={item}
                    idx={i + 1}
                    vehicleName={
                      vehicleMap.get(item.vehicleId.toString()) ??
                      `Vehículo #${item.vehicleId}`
                    }
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setEditing(null);
        }}
      >
        <DialogContent className="max-w-sm" data-ocid="maintenance.dialog">
          <DialogHeader>
            <DialogTitle className="text-sm font-display">
              {editing ? "Editar Mantenimiento" : "Nuevo Mantenimiento"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="space-y-3 mt-2"
            data-ocid="maintenance_form"
          >
            <div>
              <Label className="text-xs">Vehículo</Label>
              <Select
                value={form.vehicleId.toString()}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, vehicleId: BigInt(v) }))
                }
              >
                <SelectTrigger
                  className="h-8 text-xs mt-1"
                  data-ocid="maintenance_form.vehicle_select"
                >
                  <SelectValue placeholder="Seleccionar vehículo" />
                </SelectTrigger>
                <SelectContent>
                  {(vehicles ?? []).map((v) => (
                    <SelectItem key={v.id.toString()} value={v.id.toString()}>
                      {v.brand} {v.model} ({v.licensePlate})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mtitle" className="text-xs">
                Título
              </Label>
              <Input
                id="mtitle"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
                className="h-8 text-xs mt-1"
                data-ocid="maintenance_form.title_input"
              />
            </div>
            <div>
              <Label htmlFor="mdesc" className="text-xs">
                Descripción
              </Label>
              <Textarea
                id="mdesc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                className="text-xs mt-1 resize-none"
                data-ocid="maintenance_form.description_textarea"
              />
            </div>
            <div>
              <Label htmlFor="mdate" className="text-xs">
                Fecha de vencimiento
              </Label>
              <Input
                id="mdate"
                type="date"
                value={dateStr}
                onChange={(e) => {
                  setDateStr(e.target.value);
                  setForm((f) => ({
                    ...f,
                    dueDate: dateToTimestamp(e.target.value),
                  }));
                }}
                required
                className="h-8 text-xs mt-1"
                data-ocid="maintenance_form.date_input"
              />
            </div>
            {editing && (
              <div>
                <Label className="text-xs">Estado</Label>
                <Select
                  value={statusOverride}
                  onValueChange={(v) =>
                    setStatusOverride(v as MaintenanceStatus)
                  }
                >
                  <SelectTrigger
                    className="h-8 text-xs mt-1"
                    data-ocid="maintenance_form.status_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button
              type="submit"
              disabled={create.isPending || update.isPending}
              className="w-full h-8 text-xs"
              data-ocid="maintenance_form.submit_button"
            >
              {create.isPending || update.isPending
                ? "Guardando..."
                : "Guardar Mantenimiento"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

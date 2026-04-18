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
import { Car, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateVehicle,
  useDeleteVehicle,
  useUpdateVehicle,
  useVehicles,
} from "../hooks/useVehicles";
import type { CreateVehicleRequest, Vehicle, VehicleId } from "../types";
import { VEHICLE_TYPE_LABEL, VehicleType } from "../types";

const EMPTY_FORM: CreateVehicleRequest = {
  name: "",
  brand: "",
  model: "",
  year: 2024n,
  licensePlate: "",
  vehicleType: VehicleType.auto,
};

function VehicleForm({
  initial,
  onSubmit,
  loading,
}: {
  initial: CreateVehicleRequest;
  onSubmit: (v: CreateVehicleRequest) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState(initial);

  const set = (field: keyof CreateVehicleRequest, value: string) => {
    setForm((f) => ({
      ...f,
      [field]: field === "year" ? BigInt(value || 2024) : value,
    }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-3 mt-2"
      data-ocid="vehicle_form"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Label htmlFor="vname" className="text-xs">
            Nombre / Alias
          </Label>
          <Input
            id="vname"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
            className="h-8 text-xs mt-1"
            data-ocid="vehicle_form.name_input"
          />
        </div>
        <div>
          <Label htmlFor="vbrand" className="text-xs">
            Marca
          </Label>
          <Input
            id="vbrand"
            value={form.brand}
            onChange={(e) => set("brand", e.target.value)}
            required
            className="h-8 text-xs mt-1"
            data-ocid="vehicle_form.brand_input"
          />
        </div>
        <div>
          <Label htmlFor="vmodel" className="text-xs">
            Modelo
          </Label>
          <Input
            id="vmodel"
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            required
            className="h-8 text-xs mt-1"
            data-ocid="vehicle_form.model_input"
          />
        </div>
        <div>
          <Label htmlFor="vyear" className="text-xs">
            Año
          </Label>
          <Input
            id="vyear"
            type="number"
            min={1900}
            max={2100}
            value={form.year.toString()}
            onChange={(e) => set("year", e.target.value)}
            required
            className="h-8 text-xs mt-1"
            data-ocid="vehicle_form.year_input"
          />
        </div>
        <div>
          <Label htmlFor="vplate" className="text-xs">
            Patente
          </Label>
          <Input
            id="vplate"
            value={form.licensePlate}
            onChange={(e) => set("licensePlate", e.target.value)}
            required
            className="h-8 text-xs mt-1"
            data-ocid="vehicle_form.plate_input"
          />
        </div>
        <div className="col-span-2">
          <Label className="text-xs">Tipo</Label>
          <Select
            value={form.vehicleType}
            onValueChange={(v) => set("vehicleType", v)}
          >
            <SelectTrigger
              className="h-8 text-xs mt-1"
              data-ocid="vehicle_form.type_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={VehicleType.auto}>
                {VEHICLE_TYPE_LABEL.auto}
              </SelectItem>
              <SelectItem value={VehicleType.moto}>
                {VEHICLE_TYPE_LABEL.moto}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-8 text-xs"
        data-ocid="vehicle_form.submit_button"
      >
        {loading ? "Guardando..." : "Guardar Vehículo"}
      </Button>
    </form>
  );
}

function VehicleRow({
  v,
  idx,
  onEdit,
  onDelete,
}: {
  v: Vehicle;
  idx: number;
  onEdit: (v: Vehicle) => void;
  onDelete: (id: VehicleId) => void;
}) {
  return (
    <tr
      className="list-item hover:bg-muted/20 text-xs"
      data-ocid={`vehicles.item.${idx}`}
    >
      <td className="px-4 py-2.5">
        <div className="font-medium text-foreground">{v.name}</div>
        <div className="text-muted-foreground">
          {v.brand} {v.model} · {v.year.toString()}
        </div>
      </td>
      <td className="px-4 py-2.5 text-muted-foreground">{v.licensePlate}</td>
      <td className="px-4 py-2.5">
        <span className="badge-pending">
          {VEHICLE_TYPE_LABEL[v.vehicleType] ?? v.vehicleType}
        </span>
      </td>
      <td className="px-4 py-2.5 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onEdit(v)}
            aria-label="Editar vehículo"
            data-ocid={`vehicles.edit_button.${idx}`}
          >
            <Pencil className="w-3 h-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive hover:text-destructive"
            onClick={() => onDelete(v.id)}
            aria-label="Eliminar vehículo"
            data-ocid={`vehicles.delete_button.${idx}`}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function Vehicles() {
  const { data: vehicles, isLoading } = useVehicles();
  const create = useCreateVehicle();
  const update = useUpdateVehicle();
  const del = useDeleteVehicle();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Vehicle | null>(null);

  const handleSubmit = async (req: CreateVehicleRequest) => {
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, req });
        toast.success("Vehículo actualizado");
      } else {
        await create.mutateAsync(req);
        toast.success("Vehículo registrado");
      }
      setOpen(false);
      setEditing(null);
    } catch {
      toast.error("Error al guardar vehículo");
    }
  };

  const handleDelete = async (id: VehicleId) => {
    try {
      await del.mutateAsync(id);
      toast.success("Vehículo eliminado");
    } catch {
      toast.error("Error al eliminar vehículo");
    }
  };

  return (
    <div className="space-y-4 animate-fade-in" data-ocid="vehicles.page">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold font-display text-foreground">
          Vehículos
        </h1>
        <Button
          type="button"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          data-ocid="vehicles.add_button"
        >
          <Plus className="w-3.5 h-3.5" /> Agregar
        </Button>
      </div>

      <div className="section-card">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : (vehicles ?? []).length === 0 ? (
          <div className="p-10 text-center" data-ocid="vehicles.empty_state">
            <Car className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              Sin vehículos registrados
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Agregá tu primer vehículo para comenzar.
            </p>
            <Button
              type="button"
              size="sm"
              className="mt-3 h-8 text-xs gap-1.5"
              onClick={() => setOpen(true)}
              data-ocid="vehicles.empty_add_button"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar Vehículo
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Vehículo
                  </th>
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Patente
                  </th>
                  <th className="text-left px-4 py-2 text-muted-foreground font-medium">
                    Tipo
                  </th>
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {(vehicles ?? []).map((v, i) => (
                  <VehicleRow
                    key={v.id.toString()}
                    v={v}
                    idx={i + 1}
                    onEdit={(veh) => {
                      setEditing(veh);
                      setOpen(true);
                    }}
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
        <DialogContent className="max-w-sm" data-ocid="vehicles.dialog">
          <DialogHeader>
            <DialogTitle className="text-sm font-display">
              {editing ? "Editar Vehículo" : "Nuevo Vehículo"}
            </DialogTitle>
          </DialogHeader>
          <VehicleForm
            initial={
              editing
                ? {
                    name: editing.name,
                    brand: editing.brand,
                    model: editing.model,
                    year: editing.year,
                    licensePlate: editing.licensePlate,
                    vehicleType: editing.vehicleType,
                  }
                : EMPTY_FORM
            }
            onSubmit={handleSubmit}
            loading={create.isPending || update.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

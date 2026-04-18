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
import { Pencil, Plus, Trash2, Wrench } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateJob,
  useDeleteJob,
  useJobs,
  useUpdateJob,
} from "../hooks/useJobs";
import { useVehicles } from "../hooks/useVehicles";
import type { CreateJobRequest, Job, JobId, UpdateJobRequest } from "../types";
import {
  JOB_STATUS_BADGE,
  JOB_STATUS_LABEL,
  JobStatus,
  formatCurrency,
  formatDateTime,
} from "../types";

const STATUS_OPTIONS = [
  { value: JobStatus.pending, label: "Pendiente" },
  { value: JobStatus.in_progress, label: "En Progreso" },
  { value: JobStatus.completed, label: "Completado" },
];

function JobRow({
  job,
  idx,
  vehicleName,
  onEdit,
  onDelete,
}: {
  job: Job;
  idx: number;
  vehicleName: string;
  onEdit: (j: Job) => void;
  onDelete: (id: JobId) => void;
}) {
  return (
    <tr
      className="list-item hover:bg-muted/20 text-xs"
      data-ocid={`jobs.item.${idx}`}
    >
      <td className="px-4 py-2.5 text-muted-foreground whitespace-nowrap">
        {formatDateTime(job.createdAt)}
      </td>
      <td className="px-4 py-2.5 font-medium text-foreground truncate max-w-[120px]">
        {vehicleName}
      </td>
      <td className="px-4 py-2.5 text-foreground truncate max-w-[200px]">
        {job.title}
      </td>
      <td className="px-4 py-2.5 text-right font-mono whitespace-nowrap">
        {formatCurrency(job.cost)}
      </td>
      <td className="px-4 py-2.5 text-right whitespace-nowrap">
        <span className={JOB_STATUS_BADGE[job.status] ?? "badge-pending"}>
          {JOB_STATUS_LABEL[job.status] ?? job.status}
        </span>
      </td>
      <td className="px-4 py-2.5 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onEdit(job)}
            aria-label="Editar trabajo"
            data-ocid={`jobs.edit_button.${idx}`}
          >
            <Pencil className="w-3 h-3" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive hover:text-destructive"
            onClick={() => onDelete(job.id)}
            aria-label="Eliminar trabajo"
            data-ocid={`jobs.delete_button.${idx}`}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function Jobs() {
  const { data: jobs, isLoading } = useJobs();
  const { data: vehicles } = useVehicles();
  const create = useCreateJob();
  const update = useUpdateJob();
  const del = useDeleteJob();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [form, setForm] = useState<CreateJobRequest>({
    title: "",
    description: "",
    cost: 0n,
    vehicleId: 0n,
  });
  const [statusOverride, setStatusOverride] = useState<JobStatus>(
    JobStatus.pending,
  );

  const vehicleMap = new Map(
    (vehicles ?? []).map((v) => [
      v.id.toString(),
      `${v.brand} ${v.model} (${v.licensePlate})`,
    ]),
  );

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      cost: 0n,
      vehicleId: vehicles?.[0]?.id ?? 0n,
    });
    setStatusOverride(JobStatus.pending);
    setOpen(true);
  };

  const openEdit = (job: Job) => {
    setEditing(job);
    setForm({
      title: job.title,
      description: job.description,
      cost: job.cost,
      vehicleId: job.vehicleId,
    });
    setStatusOverride(job.status as JobStatus);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const req: UpdateJobRequest = {
          title: form.title,
          description: form.description,
          cost: form.cost,
          status: statusOverride,
        };
        await update.mutateAsync({ id: editing.id, req });
        toast.success("Trabajo actualizado");
      } else {
        await create.mutateAsync(form);
        toast.success("Trabajo registrado");
      }
      setOpen(false);
      setEditing(null);
    } catch {
      toast.error("Error al guardar trabajo");
    }
  };

  const handleDelete = async (id: JobId) => {
    try {
      await del.mutateAsync(id);
      toast.success("Trabajo eliminado");
    } catch {
      toast.error("Error al eliminar trabajo");
    }
  };

  return (
    <div className="space-y-4 animate-fade-in" data-ocid="jobs.page">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold font-display text-foreground">
          Trabajos
        </h1>
        <Button
          type="button"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={openCreate}
          data-ocid="jobs.add_button"
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
        ) : (jobs ?? []).length === 0 ? (
          <div className="p-10 text-center" data-ocid="jobs.empty_state">
            <Wrench className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              Sin trabajos registrados
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Registrá el primer trabajo realizado.
            </p>
            <Button
              type="button"
              size="sm"
              className="mt-3 h-8 text-xs gap-1.5"
              onClick={openCreate}
              data-ocid="jobs.empty_add_button"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar Trabajo
            </Button>
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
                  <th className="text-right px-4 py-2 text-muted-foreground font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {(jobs ?? []).map((job, i) => (
                  <JobRow
                    key={job.id.toString()}
                    job={job}
                    idx={i + 1}
                    vehicleName={
                      vehicleMap.get(job.vehicleId.toString()) ??
                      `Vehículo #${job.vehicleId}`
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
        <DialogContent className="max-w-sm" data-ocid="jobs.dialog">
          <DialogHeader>
            <DialogTitle className="text-sm font-display">
              {editing ? "Editar Trabajo" : "Nuevo Trabajo"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="space-y-3 mt-2"
            data-ocid="job_form"
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
                  data-ocid="job_form.vehicle_select"
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
              <Label htmlFor="jtitle" className="text-xs">
                Servicio / Título
              </Label>
              <Input
                id="jtitle"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
                className="h-8 text-xs mt-1"
                data-ocid="job_form.title_input"
              />
            </div>
            <div>
              <Label htmlFor="jdesc" className="text-xs">
                Descripción
              </Label>
              <Textarea
                id="jdesc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={2}
                className="text-xs mt-1 resize-none"
                data-ocid="job_form.description_textarea"
              />
            </div>
            <div>
              <Label htmlFor="jcost" className="text-xs">
                Costo ($)
              </Label>
              <Input
                id="jcost"
                type="number"
                min={0}
                value={form.cost.toString()}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    cost: BigInt(
                      Math.max(0, Number.parseInt(e.target.value) || 0),
                    ),
                  }))
                }
                required
                className="h-8 text-xs mt-1"
                data-ocid="job_form.cost_input"
              />
            </div>
            {editing && (
              <div>
                <Label className="text-xs">Estado</Label>
                <Select
                  value={statusOverride}
                  onValueChange={(v) => setStatusOverride(v as JobStatus)}
                >
                  <SelectTrigger
                    className="h-8 text-xs mt-1"
                    data-ocid="job_form.status_select"
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
              data-ocid="job_form.submit_button"
            >
              {create.isPending || update.isPending
                ? "Guardando..."
                : "Guardar Trabajo"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

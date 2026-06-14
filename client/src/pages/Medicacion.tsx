import { useState } from 'react';
import { Pill, CheckCircle2, Circle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Medicamento {
  id: string;
  nombre: string;
  dosis: string;
  hora: string;
  administrado: boolean;
}

interface PacienteMedicacion {
  id: string;
  nombre: string;
  apellido: string;
  area: string;
  medicamentos: Medicamento[];
}

const pacientes: PacienteMedicacion[] = [
  {
    id: '1',
    nombre: 'María',
    apellido: 'Acosta',
    area: 'Ala Norte',
    medicamentos: [
      { id: '1-1', nombre: 'Metformina', dosis: '500mg', hora: '08:00', administrado: true },
      { id: '1-2', nombre: 'Enalapril', dosis: '10mg', hora: '08:00', administrado: true },
      { id: '1-3', nombre: 'Calcio + Vitamina D', dosis: '1 comprimido', hora: '12:00', administrado: false },
      { id: '1-4', nombre: 'Metformina', dosis: '500mg', hora: '20:00', administrado: false },
    ],
  },
  {
    id: '2',
    nombre: 'Carlos',
    apellido: 'Benítez',
    area: 'Ala Sur',
    medicamentos: [
      { id: '2-1', nombre: 'Digoxina', dosis: '0.25mg', hora: '08:00', administrado: true },
      { id: '2-2', nombre: 'Furosemida', dosis: '40mg', hora: '08:00', administrado: true },
      { id: '2-3', nombre: 'Atenolol', dosis: '50mg', hora: '20:00', administrado: false },
    ],
  },
  {
    id: '3',
    nombre: 'Rosa',
    apellido: 'Cabrera',
    area: 'Ala Este',
    medicamentos: [
      { id: '3-1', nombre: 'Ibuprofeno', dosis: '400mg', hora: '08:00', administrado: true },
      { id: '3-2', nombre: 'Omeprazol', dosis: '20mg', hora: '08:00', administrado: true },
      { id: '3-3', nombre: 'Ibuprofeno', dosis: '400mg', hora: '20:00', administrado: false },
    ],
  },
  {
    id: '4',
    nombre: 'Juan',
    apellido: 'Díaz',
    area: 'Ala Oeste',
    medicamentos: [
      { id: '4-1', nombre: 'Paracetamol', dosis: '500mg', hora: '08:00', administrado: true },
      { id: '4-2', nombre: 'Loratadina', dosis: '10mg', hora: '12:00', administrado: false },
      { id: '4-3', nombre: 'Paracetamol', dosis: '500mg', hora: '20:00', administrado: false },
    ],
  },
];

export default function Medicacion() {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState('1');
  const [medicamentos, setMedicamentos] = useState(pacientes[0].medicamentos);

  const handleSelectPaciente = (id: string) => {
    setPacienteSeleccionado(id);
    const paciente = pacientes.find((p) => p.id === id);
    if (paciente) {
      setMedicamentos(paciente.medicamentos);
    }
  };

  const handleToggleMedicamento = (id: string) => {
    setMedicamentos(
      medicamentos.map((med) =>
        med.id === id ? { ...med, administrado: !med.administrado } : med
      )
    );
  };

  const pacienteActual = pacientes.find((p) => p.id === pacienteSeleccionado);
  const medicamentosAdministrados = medicamentos.filter((m) => m.administrado).length;
  const totalMedicamentos = medicamentos.length;
  const porcentajeAdministrado = Math.round((medicamentosAdministrados / totalMedicamentos) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Control de Medicación</h1>
        <p className="text-muted-foreground">Interfaz para administrar medicaciones diarias</p>
      </div>

      {/* Selector de Paciente */}
      <div className="card-warm p-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Seleccionar Paciente</label>
        <Select value={pacienteSeleccionado} onValueChange={handleSelectPaciente}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {pacientes.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.nombre} {p.apellido} - {p.area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Progress Card */}
      {pacienteActual && (
        <div className="card-warm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {pacienteActual.nombre} {pacienteActual.apellido}
              </h2>
              <p className="text-sm text-muted-foreground">{pacienteActual.area}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{porcentajeAdministrado}%</p>
              <p className="text-sm text-muted-foreground">
                {medicamentosAdministrados} de {totalMedicamentos} medicaciones
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${porcentajeAdministrado}%` }}
            />
          </div>
        </div>
      )}

      {/* Medicamentos List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Pill className="w-5 h-5 text-primary" />
          Medicaciones del Día
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicamentos.map((medicamento) => (
            <div
              key={medicamento.id}
              className={`card-warm p-6 cursor-pointer transition-all duration-200 ${
                medicamento.administrado ? 'bg-green-50 border-green-200' : ''
              }`}
              onClick={() => handleToggleMedicamento(medicamento.id)}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <div className="pt-1">
                  {medicamento.administrado ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-bold ${medicamento.administrado ? 'text-green-700 line-through' : 'text-foreground'}`}>
                      {medicamento.nombre}
                    </h4>
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded">
                      {medicamento.hora}
                    </span>
                  </div>
                  <p className={`text-sm ${medicamento.administrado ? 'text-green-600' : 'text-muted-foreground'}`}>
                    Dosis: {medicamento.dosis}
                  </p>
                  {medicamento.administrado && (
                    <p className="text-xs text-green-600 mt-2 font-medium">✓ Administrado</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {medicamentos.length === 0 && (
          <div className="card-warm p-12 text-center">
            <p className="text-muted-foreground">No hay medicaciones registradas para este paciente.</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="card-warm p-6 bg-primary/5 border-primary/20">
        <h3 className="font-bold text-foreground mb-3">Resumen del Día</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Administradas</p>
            <p className="text-2xl font-bold text-green-600">{medicamentosAdministrados}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Pendientes</p>
            <p className="text-2xl font-bold text-amber-600">{totalMedicamentos - medicamentosAdministrados}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-2xl font-bold text-foreground">{totalMedicamentos}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  area: string;
  enfermedad: string;
  alergia: string;
  planPago: string;
}

const pacientes: Paciente[] = [
  { id: '1', nombre: 'María', apellido: 'Acosta', area: 'Ala Norte', enfermedad: 'Diabetes', alergia: 'Penicilina', planPago: 'Plan A' },
  { id: '2', nombre: 'Carlos', apellido: 'Benítez', area: 'Ala Sur', enfermedad: 'Hipertensión', alergia: 'Aspirina', planPago: 'Plan B' },
  { id: '3', nombre: 'Rosa', apellido: 'Cabrera', area: 'Ala Este', enfermedad: 'Diabetes', alergia: 'Ninguna', planPago: 'Plan A' },
  { id: '4', nombre: 'Juan', apellido: 'Díaz', area: 'Ala Oeste', enfermedad: 'Artritis', alergia: 'Penicilina', planPago: 'Plan C' },
  { id: '5', nombre: 'Ana', apellido: 'Espinoza', area: 'Ala Norte', enfermedad: 'Hipertensión', alergia: 'Ninguna', planPago: 'Plan B' },
  { id: '6', nombre: 'Pedro', apellido: 'Fernández', area: 'Ala Sur', enfermedad: 'Osteoporosis', alergia: 'Aspirina', planPago: 'Plan A' },
  { id: '7', nombre: 'Teresa', apellido: 'García', area: 'Ala Este', enfermedad: 'Diabetes', alergia: 'Penicilina', planPago: 'Plan B' },
  { id: '8', nombre: 'Luis', apellido: 'González', area: 'Ala Oeste', enfermedad: 'Hipertensión', alergia: 'Ninguna', planPago: 'Plan C' },
];

const areas = ['Todas', 'Ala Norte', 'Ala Sur', 'Ala Este', 'Ala Oeste'];
const enfermedades = ['Todas', 'Diabetes', 'Hipertensión', 'Artritis', 'Osteoporosis'];
const alergias = ['Todas', 'Penicilina', 'Aspirina', 'Ninguna'];
const planesPago = ['Todos', 'Plan A', 'Plan B', 'Plan C'];

export default function Clinica() {
  const [filtroArea, setFiltroArea] = useState('Todas');
  const [filtroEnfermedad, setFiltroEnfermedad] = useState('Todas');
  const [filtroAlergia, setFiltroAlergia] = useState('Todas');
  const [filtroPlan, setFiltroPlan] = useState('Todos');

  const pacientesFiltrados = pacientes.filter((p) => {
    const areaMatch = filtroArea === 'Todas' || p.area === filtroArea;
    const enfermedadMatch = filtroEnfermedad === 'Todas' || p.enfermedad === filtroEnfermedad;
    const alergiaMatch = filtroAlergia === 'Todas' || p.alergia === filtroAlergia;
    const planMatch = filtroPlan === 'Todos' || p.planPago === filtroPlan;
    return areaMatch && enfermedadMatch && alergiaMatch && planMatch;
  });

  const handleReset = () => {
    setFiltroArea('Todas');
    setFiltroEnfermedad('Todas');
    setFiltroAlergia('Todas');
    setFiltroPlan('Todos');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Agrupación Clínica</h1>
        <p className="text-muted-foreground">Filtra y agrupa residentes según criterios clínicos</p>
      </div>

      {/* Filters */}
      <div className="card-warm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Filtros</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Área</label>
            <Select value={filtroArea} onValueChange={setFiltroArea}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Enfermedad</label>
            <Select value={filtroEnfermedad} onValueChange={setFiltroEnfermedad}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {enfermedades.map((enfermedad) => (
                  <SelectItem key={enfermedad} value={enfermedad}>
                    {enfermedad}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Alergia</label>
            <Select value={filtroAlergia} onValueChange={setFiltroAlergia}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {alergias.map((alergia) => (
                  <SelectItem key={alergia} value={alergia}>
                    {alergia}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Plan de Pago</label>
            <Select value={filtroPlan} onValueChange={setFiltroPlan}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {planesPago.map((plan) => (
                  <SelectItem key={plan} value={plan}>
                    {plan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleReset}
          variant="outline"
          className="w-full md:w-auto"
        >
          <X className="w-4 h-4 mr-2" />
          Limpiar Filtros
        </Button>
      </div>

      {/* Results */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">
          Resultados: <span className="text-primary">{pacientesFiltrados.length}</span> paciente(s)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pacientesFiltrados.map((paciente) => (
            <div key={paciente.id} className="card-warm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-bold text-foreground">
                    {paciente.nombre} {paciente.apellido}
                  </h4>
                  <p className="text-sm text-muted-foreground">{paciente.area}</p>
                </div>
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">{paciente.nombre[0]}</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Enfermedad Principal</p>
                  <p className="text-sm font-medium text-foreground">{paciente.enfermedad}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Alergia</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    paciente.alergia === 'Ninguna'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {paciente.alergia}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Plan de Pago</p>
                  <p className="text-sm font-medium text-foreground">{paciente.planPago}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pacientesFiltrados.length === 0 && (
          <div className="card-warm p-12 text-center">
            <p className="text-muted-foreground">No se encontraron pacientes con los filtros seleccionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}

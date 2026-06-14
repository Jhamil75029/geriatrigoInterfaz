import { useState } from 'react';
import { FileText, DollarSign, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Contrato {
  id: string;
  numeroContrato: string;
  fechaInicio: string;
  fechaFin: string;
  servicios: string[];
  precioMensual: number;
  estado: 'activo' | 'vencido' | 'pendiente';
}

interface ResidenteContrato {
  id: string;
  nombre: string;
  apellido: string;
  area: string;
  contrato: Contrato;
}

const residentes: ResidenteContrato[] = [
  {
    id: '1',
    nombre: 'María',
    apellido: 'Acosta',
    area: 'Ala Norte',
    contrato: {
      id: 'c1',
      numeroContrato: 'RES-2024-001',
      fechaInicio: '2024-01-15',
      fechaFin: '2025-01-14',
      servicios: [
        'Alojamiento en habitación privada',
        'Alimentación (3 comidas diarias)',
        'Atención médica 24/7',
        'Medicación y cuidados de enfermería',
        'Actividades recreativas',
        'Lavandería y limpieza',
      ],
      precioMensual: 45000,
      estado: 'activo',
    },
  },
  {
    id: '2',
    nombre: 'Carlos',
    apellido: 'Benítez',
    area: 'Ala Sur',
    contrato: {
      id: 'c2',
      numeroContrato: 'RES-2024-002',
      fechaInicio: '2024-03-01',
      fechaFin: '2025-02-28',
      servicios: [
        'Alojamiento en habitación compartida',
        'Alimentación (3 comidas diarias)',
        'Atención médica básica',
        'Medicación',
        'Actividades recreativas',
      ],
      precioMensual: 32000,
      estado: 'activo',
    },
  },
  {
    id: '3',
    nombre: 'Rosa',
    apellido: 'Cabrera',
    area: 'Ala Este',
    contrato: {
      id: 'c3',
      numeroContrato: 'RES-2024-003',
      fechaInicio: '2024-06-10',
      fechaFin: '2025-06-09',
      servicios: [
        'Alojamiento en habitación privada',
        'Alimentación (3 comidas diarias)',
        'Atención médica 24/7',
        'Medicación y cuidados de enfermería',
        'Fisioterapia',
        'Actividades recreativas',
        'Lavandería y limpieza',
      ],
      precioMensual: 55000,
      estado: 'activo',
    },
  },
  {
    id: '4',
    nombre: 'Juan',
    apellido: 'Díaz',
    area: 'Ala Oeste',
    contrato: {
      id: 'c4',
      numeroContrato: 'RES-2023-045',
      fechaInicio: '2023-11-01',
      fechaFin: '2024-10-31',
      servicios: [
        'Alojamiento en habitación compartida',
        'Alimentación (3 comidas diarias)',
        'Atención médica básica',
      ],
      precioMensual: 28000,
      estado: 'vencido',
    },
  },
];

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'bg-green-100 text-green-700';
    case 'vencido':
      return 'bg-red-100 text-red-700';
    case 'pendiente':
      return 'bg-amber-100 text-amber-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getEstadoLabel = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'Activo';
    case 'vencido':
      return 'Vencido';
    case 'pendiente':
      return 'Pendiente';
    default:
      return 'Desconocido';
  }
};

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function Contratos() {
  const [residenteSeleccionado, setResidenteSeleccionado] = useState('1');

  const residente = residentes.find((r) => r.id === residenteSeleccionado) || residentes[0];
  const contrato = residente.contrato;

  const diasRestantes = Math.ceil(
    (new Date(contrato.fechaFin).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Contratos</h1>
        <p className="text-muted-foreground">Gestión de contratos y servicios de residentes</p>
      </div>

      {/* Selector de Residente */}
      <div className="card-warm p-6">
        <label className="text-sm font-medium text-foreground mb-3 block">Seleccionar Residente</label>
        <Select value={residenteSeleccionado} onValueChange={setResidenteSeleccionado}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {residentes.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.nombre} {r.apellido} - {r.area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Contrato Principal */}
      <div className="card-warm p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {residente.nombre} {residente.apellido}
            </h2>
            <p className="text-sm text-muted-foreground">{residente.area}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getEstadoBadge(contrato.estado)}`}>
            {getEstadoLabel(contrato.estado)}
          </span>
        </div>

        {/* Información del Contrato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Datos Principales */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <p className="text-xs text-muted-foreground">Número de Contrato</p>
              </div>
              <p className="text-lg font-bold text-foreground">{contrato.numeroContrato}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <p className="text-xs text-muted-foreground">Fecha de Inicio</p>
              </div>
              <p className="text-lg font-medium text-foreground">{formatearFecha(contrato.fechaInicio)}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <p className="text-xs text-muted-foreground">Fecha de Vencimiento</p>
              </div>
              <p className="text-lg font-medium text-foreground">{formatearFecha(contrato.fechaFin)}</p>
              {diasRestantes > 0 && (
                <p className="text-sm text-green-600 mt-1">Faltan {diasRestantes} días</p>
              )}
              {diasRestantes <= 0 && (
                <p className="text-sm text-red-600 mt-1">Contrato vencido hace {Math.abs(diasRestantes)} días</p>
              )}
            </div>
          </div>

          {/* Precio Mensual */}
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-primary" />
              <p className="text-sm text-muted-foreground">Precio Mensual</p>
            </div>
            <p className="text-4xl font-bold text-primary mb-2">${contrato.precioMensual.toLocaleString('es-AR')}</p>
            <p className="text-sm text-muted-foreground">Pago mensual por servicios incluidos</p>
          </div>
        </div>

        {/* Servicios Incluidos */}
        <div className="border-t border-border pt-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Servicios Incluidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contrato.servicios.map((servicio, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-foreground">{servicio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resumen de Contratos */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Resumen de Contratos Activos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {residentes
            .filter((r) => r.contrato.estado === 'activo')
            .slice(0, 3)
            .map((r) => (
              <div key={r.id} className="card-warm p-6">
                <h4 className="font-bold text-foreground mb-2">
                  {r.nombre} {r.apellido}
                </h4>
                <p className="text-sm text-muted-foreground mb-3">{r.contrato.numeroContrato}</p>
                <p className="text-2xl font-bold text-primary">${r.contrato.precioMensual.toLocaleString('es-AR')}</p>
                <p className="text-xs text-muted-foreground mt-2">Vencimiento: {formatearFecha(r.contrato.fechaFin)}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

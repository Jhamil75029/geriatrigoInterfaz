import { Users, Clock } from 'lucide-react';

interface Enfermera {
  id: string;
  nombre: string;
  apellido: string;
  area: string;
  cargo: string;
  turnoActual: string;
  estado: 'activo' | 'descanso' | 'ausente';
}

const personal: Enfermera[] = [
  {
    id: '1',
    nombre: 'Marcela',
    apellido: 'Rodríguez',
    area: 'Ala Norte',
    cargo: 'Enfermera Jefe',
    turnoActual: 'Mañana (06:00 - 14:00)',
    estado: 'activo',
  },
  {
    id: '2',
    nombre: 'Patricia',
    apellido: 'López',
    area: 'Ala Sur',
    cargo: 'Enfermera',
    turnoActual: 'Mañana (06:00 - 14:00)',
    estado: 'activo',
  },
  {
    id: '3',
    nombre: 'Roberto',
    apellido: 'Martínez',
    area: 'Ala Este',
    cargo: 'Enfermero',
    turnoActual: 'Tarde (14:00 - 22:00)',
    estado: 'activo',
  },
  {
    id: '4',
    nombre: 'Silvia',
    apellido: 'García',
    area: 'Ala Oeste',
    cargo: 'Enfermera',
    turnoActual: 'Noche (22:00 - 06:00)',
    estado: 'activo',
  },
  {
    id: '5',
    nombre: 'Jorge',
    apellido: 'Sánchez',
    area: 'Ala Norte',
    cargo: 'Auxiliar de Enfermería',
    turnoActual: 'Descanso',
    estado: 'descanso',
  },
  {
    id: '6',
    nombre: 'Claudia',
    apellido: 'Fernández',
    area: 'Ala Sur',
    cargo: 'Enfermera',
    turnoActual: 'Tarde (14:00 - 22:00)',
    estado: 'activo',
  },
  {
    id: '7',
    nombre: 'Miguel',
    apellido: 'González',
    area: 'Ala Este',
    cargo: 'Auxiliar de Enfermería',
    turnoActual: 'Ausente',
    estado: 'ausente',
  },
  {
    id: '8',
    nombre: 'Verónica',
    apellido: 'Díaz',
    area: 'Ala Oeste',
    cargo: 'Enfermera Jefe',
    turnoActual: 'Noche (22:00 - 06:00)',
    estado: 'activo',
  },
];

const getEstadoBadge = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'bg-green-100 text-green-700';
    case 'descanso':
      return 'bg-amber-100 text-amber-700';
    case 'ausente':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getEstadoLabel = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'Activo';
    case 'descanso':
      return 'Descanso';
    case 'ausente':
      return 'Ausente';
    default:
      return 'Desconocido';
  }
};

export default function Personal() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Personal de Enfermería</h1>
        <p className="text-muted-foreground">Gestión del equipo de enfermería y turnos</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Personal</p>
              <p className="text-3xl font-bold text-foreground">{personal.length}</p>
            </div>
            <Users className="w-10 h-10 text-primary opacity-20" />
          </div>
        </div>
        <div className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Personal Activo</p>
              <p className="text-3xl font-bold text-green-600">{personal.filter((p) => p.estado === 'activo').length}</p>
            </div>
            <Clock className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">En Descanso</p>
              <p className="text-3xl font-bold text-amber-600">{personal.filter((p) => p.estado === 'descanso').length}</p>
            </div>
            <Clock className="w-10 h-10 text-amber-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-warm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nombre Completo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Cargo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Área</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Turno Actual</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Estado</th>
              </tr>
            </thead>
            <tbody>
              {personal.map((enfermera) => (
                <tr
                  key={enfermera.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">
                    {enfermera.nombre} {enfermera.apellido}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{enfermera.cargo}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                      {enfermera.area}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{enfermera.turnoActual}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEstadoBadge(enfermera.estado)}`}>
                      {getEstadoLabel(enfermera.estado)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

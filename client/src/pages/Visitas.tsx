import { Calendar, Clock, User, Heart } from 'lucide-react';

interface Visita {
  id: string;
  fecha: string;
  hora: string;
  visitante: string;
  residenteVisitado: string;
  parentesco: string;
  motivo: string;
}

const visitas: Visita[] = [
  {
    id: '1',
    fecha: '2026-06-14',
    hora: '14:30',
    visitante: 'Juan Acosta',
    residenteVisitado: 'María Acosta',
    parentesco: 'Hijo',
    motivo: 'Visita familiar',
  },
  {
    id: '2',
    fecha: '2026-06-14',
    hora: '15:00',
    visitante: 'Patricia Benítez',
    residenteVisitado: 'Carlos Benítez',
    parentesco: 'Esposa',
    motivo: 'Acompañamiento',
  },
  {
    id: '3',
    fecha: '2026-06-14',
    hora: '16:15',
    visitante: 'Roberto García',
    residenteVisitado: 'Rosa Cabrera',
    parentesco: 'Nieto',
    motivo: 'Visita familiar',
  },
  {
    id: '4',
    fecha: '2026-06-13',
    hora: '10:00',
    visitante: 'Dr. Miguel López',
    residenteVisitado: 'Juan Díaz',
    parentesco: 'Médico',
    motivo: 'Consulta médica',
  },
  {
    id: '5',
    fecha: '2026-06-13',
    hora: '11:30',
    visitante: 'Silvia González',
    residenteVisitado: 'Ana Espinoza',
    parentesco: 'Amiga',
    motivo: 'Visita social',
  },
  {
    id: '6',
    fecha: '2026-06-13',
    hora: '15:45',
    visitante: 'Fernando Martínez',
    residenteVisitado: 'Pedro Fernández',
    parentesco: 'Hermano',
    motivo: 'Visita familiar',
  },
  {
    id: '7',
    fecha: '2026-06-12',
    hora: '09:00',
    visitante: 'Dra. Claudia Sánchez',
    residenteVisitado: 'Teresa García',
    parentesco: 'Médica',
    motivo: 'Revisión de medicación',
  },
  {
    id: '8',
    fecha: '2026-06-12',
    hora: '14:00',
    visitante: 'Luis González',
    residenteVisitado: 'Marta Hernández',
    parentesco: 'Sobrino',
    motivo: 'Visita familiar',
  },
];

const formatearFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-AR', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const getColorMotivo = (motivo: string) => {
  if (motivo.includes('médica') || motivo.includes('Consulta') || motivo.includes('Revisión')) {
    return 'bg-blue-100 text-blue-700';
  }
  if (motivo.includes('familiar')) {
    return 'bg-green-100 text-green-700';
  }
  return 'bg-amber-100 text-amber-700';
};

export default function Visitas() {
  const visitasOrdenadas = [...visitas].sort((a, b) => {
    const dateA = new Date(`${a.fecha}T${a.hora}`);
    const dateB = new Date(`${b.fecha}T${b.hora}`);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Registro de Visitas</h1>
        <p className="text-muted-foreground">Bitácora de visitas de la última semana</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de Visitas</p>
              <p className="text-3xl font-bold text-foreground">{visitas.length}</p>
            </div>
            <User className="w-10 h-10 text-primary opacity-20" />
          </div>
        </div>
        <div className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Visitas Hoy</p>
              <p className="text-3xl font-bold text-green-600">
                {visitas.filter((v) => v.fecha === '2026-06-14').length}
              </p>
            </div>
            <Calendar className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>
        <div className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Visitas Médicas</p>
              <p className="text-3xl font-bold text-blue-600">
                {visitas.filter((v) => v.parentesco === 'Médico' || v.parentesco === 'Médica').length}
              </p>
            </div>
            <Heart className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {visitasOrdenadas.map((visita, index) => (
          <div key={visita.id} className="card-warm p-6 hover:shadow-md transition-shadow">
            <div className="flex gap-6">
              {/* Timeline Dot */}
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-primary rounded-full mt-2" />
                {index < visitasOrdenadas.length - 1 && (
                  <div className="w-0.5 h-16 bg-border mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground">{visita.visitante}</h3>
                    <p className="text-sm text-muted-foreground">Visitó a {visita.residenteVisitado}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getColorMotivo(visita.motivo)}`}>
                    {visita.motivo}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Fecha</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium text-foreground">{formatearFecha(visita.fecha)}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Hora</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <p className="font-medium text-foreground">{visita.hora}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Parentesco</p>
                    <p className="font-medium text-foreground">{visita.parentesco}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Residente</p>
                    <p className="font-medium text-foreground">{visita.residenteVisitado}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';

interface ResidenteDetalle {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  area: string;
  fechaNacimiento: string;
  genero: string;
  estadoCivil: string;
  telefono: string;
  email: string;
  direccion: string;
  historialMedico: string[];
  alergias: string[];
  medicacionActual: string[];
  contactoEmergencia: {
    nombre: string;
    relacion: string;
    telefono: string;
  };
}

const residentes: Record<string, ResidenteDetalle> = {
  '1': {
    id: '1',
    nombre: 'María',
    apellido: 'Acosta',
    dni: '12345678',
    area: 'Ala Norte',
    fechaNacimiento: '1945-03-15',
    genero: 'Femenino',
    estadoCivil: 'Viuda',
    telefono: '+54 9 11 2345-6789',
    email: 'maria.acosta@email.com',
    direccion: 'Calle Principal 123, Apt 4B',
    historialMedico: [
      'Hipertensión arterial',
      'Diabetes tipo 2',
      'Osteoporosis',
      'Artritis reumatoide',
    ],
    alergias: ['Penicilina', 'Aspirina'],
    medicacionActual: [
      'Metformina 500mg - 2 veces al día',
      'Enalapril 10mg - 1 vez al día',
      'Calcio + Vitamina D - 1 vez al día',
    ],
    contactoEmergencia: {
      nombre: 'Juan Acosta',
      relacion: 'Hijo',
      telefono: '+54 9 11 9876-5432',
    },
  },
  '2': {
    id: '2',
    nombre: 'Carlos',
    apellido: 'Benítez',
    dni: '23456789',
    area: 'Ala Sur',
    fechaNacimiento: '1940-07-22',
    genero: 'Masculino',
    estadoCivil: 'Casado',
    telefono: '+54 9 11 3456-7890',
    email: 'carlos.benitez@email.com',
    direccion: 'Avenida Central 456, Apt 2A',
    historialMedico: [
      'Insuficiencia cardíaca',
      'Fibrilación auricular',
      'Hipertensión',
    ],
    alergias: ['Warfarina'],
    medicacionActual: [
      'Digoxina 0.25mg - 1 vez al día',
      'Furosemida 40mg - 2 veces al día',
      'Atenolol 50mg - 1 vez al día',
    ],
    contactoEmergencia: {
      nombre: 'Patricia Benítez',
      relacion: 'Esposa',
      telefono: '+54 9 11 5678-9012',
    },
  },
};

export default function DetalleResidente() {
  const [location, navigate] = useLocation();
  const params = new URLSearchParams(location.split('?')[1] || '');
  const residenteId = location.split('/')[2];

  const residente = residentes[residenteId] || residentes['1'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => navigate('/residentes')}
          variant="ghost"
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {residente.nombre} {residente.apellido}
          </h1>
          <p className="text-muted-foreground">DNI: {residente.dni}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="card-warm p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-primary">
                {residente.nombre[0]}{residente.apellido[0]}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              {residente.nombre} {residente.apellido}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">{residente.area}</p>
            <div className="space-y-2 text-sm text-foreground">
              <p><strong>Edad:</strong> {new Date().getFullYear() - new Date(residente.fechaNacimiento).getFullYear()} años</p>
              <p><strong>Género:</strong> {residente.genero}</p>
              <p><strong>Estado Civil:</strong> {residente.estadoCivil}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-primary" />
              <span>{residente.telefono}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-primary" />
              <span className="truncate">{residente.email}</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{residente.direccion}</span>
            </div>
          </div>
        </div>

        {/* Medical Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información Personal */}
          <div className="card-warm p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Información Personal</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">DNI</p>
                <p className="font-medium text-foreground">{residente.dni}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Fecha de Nacimiento</p>
                <p className="font-medium text-foreground">
                  {new Date(residente.fechaNacimiento).toLocaleDateString('es-AR')}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Área</p>
                <p className="font-medium text-foreground">{residente.area}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Estado Civil</p>
                <p className="font-medium text-foreground">{residente.estadoCivil}</p>
              </div>
            </div>
          </div>

          {/* Historial Médico */}
          <div className="card-warm p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Historial Médico</h3>
            <div className="space-y-2">
              {residente.historialMedico.map((condicion, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-foreground">{condicion}</span>
                </div>
              ))}
            </div>

            {/* Alergias */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground mb-3 text-red-600">Alergias</h4>
              <div className="space-y-2">
                {residente.alergias.map((alergia, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-red-50 rounded">
                    <div className="w-2 h-2 bg-red-600 rounded-full" />
                    <span className="text-sm text-foreground font-medium">{alergia}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medicación Actual */}
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="font-semibold text-foreground mb-3">Medicación Actual</h4>
              <div className="space-y-2">
                {residente.medicacionActual.map((med, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <div className="w-2 h-2 bg-green-600 rounded-full" />
                    <span className="text-sm text-foreground">{med}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contacto de Emergencia */}
          <div className="card-warm p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Contacto de Emergencia</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Nombre</p>
                <p className="font-medium text-foreground">{residente.contactoEmergencia.nombre}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Relación</p>
                <p className="font-medium text-foreground">{residente.contactoEmergencia.relacion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Teléfono</p>
                <p className="font-medium text-foreground">{residente.contactoEmergencia.telefono}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

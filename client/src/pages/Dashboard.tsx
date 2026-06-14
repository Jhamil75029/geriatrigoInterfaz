import { Button } from '@/components/ui/button';
import { Users, Stethoscope, Heart, TrendingUp } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Dashboard() {
  const [, navigate] = useLocation();

  const stats = [
    {
      title: 'Total de Residentes',
      value: '42',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Personal de Enfermería',
      value: '8',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Visitas Hoy',
      value: '12',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Medicaciones Pendientes',
      value: '5',
      icon: <Heart className="w-8 h-8" />,
      color: 'bg-red-100',
      iconColor: 'text-red-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="card-warm p-8 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Bienvenido al Sistema de Gestión
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Administra de manera integral la residencia de adultos mayores. Accede a información de residentes, personal, medicación y más.
            </p>
            <Button
              onClick={() => navigate('/residentes')}
              className="btn-primary"
            >
              Entrar al Sistema
            </Button>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <Heart className="w-24 h-24 text-primary mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground">Imagen de Residencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Estadísticas Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="card-warm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <div className={stat.iconColor}>{stat.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Ver Residentes', path: '/residentes', desc: 'Consulta la lista completa de residentes' },
            { title: 'Registrar Visita', path: '/visitas', desc: 'Registra una nueva visita' },
            { title: 'Control de Medicación', path: '/medicacion', desc: 'Administra las medicaciones del día' },
            { title: 'Personal de Enfermería', path: '/personal', desc: 'Consulta el personal disponible' },
            { title: 'Agrupación Clínica', path: '/clinica', desc: 'Filtra residentes por criterios clínicos' },
            { title: 'Gestión de Contratos', path: '/contratos', desc: 'Revisa los contratos de residentes' },
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="card-warm p-6 text-left hover:shadow-md transition-all duration-200 group"
            >
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

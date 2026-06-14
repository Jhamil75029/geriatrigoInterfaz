import { ReactNode, useState } from 'react';
import { Menu, X, Home, Users, Stethoscope, Calendar, Pill, FileText, BarChart3, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Inicio', icon: <Home className="w-5 h-5" />, path: '/' },
  { id: 'residentes', label: 'Residentes', icon: <Users className="w-5 h-5" />, path: '/residentes' },
  { id: 'personal', label: 'Personal de Enfermería', icon: <Stethoscope className="w-5 h-5" />, path: '/personal' },
  { id: 'clinica', label: 'Agrupación Clínica', icon: <BarChart3 className="w-5 h-5" />, path: '/clinica' },
  { id: 'visitas', label: 'Registro de Visitas', icon: <Calendar className="w-5 h-5" />, path: '/visitas' },
  { id: 'medicacion', label: 'Control de Medicación', icon: <Pill className="w-5 h-5" />, path: '/medicacion' },
  { id: 'contratos', label: 'Contratos', icon: <FileText className="w-5 h-5" />, path: '/contratos' },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [location, navigate] = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sidebar-accent rounded-lg flex items-center justify-center">
              <span className="text-sidebar-accent-foreground font-bold text-lg">❤️</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">ResidenciaCare</h1>
              <p className="text-xs text-sidebar-foreground/60">Gestión Integral</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location === item.path
                      ? 'sidebar-item-active shadow-md'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/10'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/10 transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h2 className="text-xl font-bold text-foreground hidden lg:block">Panel de Administración</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Residente {
  id: string;
  apellido: string;
  nombre: string;
  dni: string;
  area: string;
}

const residentes: Residente[] = [
  { id: '1', apellido: 'Acosta', nombre: 'María', dni: '12345678', area: 'Ala Norte' },
  { id: '2', apellido: 'Benítez', nombre: 'Carlos', dni: '23456789', area: 'Ala Sur' },
  { id: '3', apellido: 'Cabrera', nombre: 'Rosa', dni: '34567890', area: 'Ala Este' },
  { id: '4', apellido: 'Díaz', nombre: 'Juan', dni: '45678901', area: 'Ala Oeste' },
  { id: '5', apellido: 'Espinoza', nombre: 'Ana', dni: '56789012', area: 'Ala Norte' },
  { id: '6', apellido: 'Fernández', nombre: 'Pedro', dni: '67890123', area: 'Ala Sur' },
  { id: '7', apellido: 'García', nombre: 'Teresa', dni: '78901234', area: 'Ala Este' },
  { id: '8', apellido: 'González', nombre: 'Luis', dni: '89012345', area: 'Ala Oeste' },
  { id: '9', apellido: 'Hernández', nombre: 'Marta', dni: '90123456', area: 'Ala Norte' },
  { id: '10', apellido: 'Iglesias', nombre: 'Roberto', dni: '01234567', area: 'Ala Sur' },
];

export default function Residentes() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResidentes = residentes.filter((r) =>
    r.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.dni.includes(searchTerm)
  );

  const handleSelectResidente = (id: string) => {
    navigate(`/residente/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Residentes</h1>
        <p className="text-muted-foreground">Gestión completa de residentes de la residencia</p>
      </div>

      {/* Search Bar */}
      <div className="card-warm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por apellido, nombre o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="card-warm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Apellido</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">DNI</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Área</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Acción</th>
              </tr>
            </thead>
            <tbody>
              {filteredResidentes.map((residente) => (
                <tr
                  key={residente.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{residente.apellido}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{residente.nombre}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{residente.dni}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      {residente.area}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      onClick={() => handleSelectResidente(residente.id)}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResidentes.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No se encontraron residentes que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Mostrando <strong>{filteredResidentes.length}</strong> de <strong>{residentes.length}</strong> residentes
      </div>
    </div>
  );
}

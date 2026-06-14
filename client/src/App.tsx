import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Residentes from "./pages/Residentes";
import DetalleResidente from "./pages/DetalleResidente";
import Personal from "./pages/Personal";
import Clinica from "./pages/Clinica";
import Visitas from "./pages/Visitas";
import Medicacion from "./pages/Medicacion";
import Contratos from "./pages/Contratos";

function Router() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/residentes" component={Residentes} />
        <Route path="/residente/:id" component={DetalleResidente} />
        <Route path="/personal" component={Personal} />
        <Route path="/clinica" component={Clinica} />
        <Route path="/visitas" component={Visitas} />
        <Route path="/medicacion" component={Medicacion} />
        <Route path="/contratos" component={Contratos} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </DashboardLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

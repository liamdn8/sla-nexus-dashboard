import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SLAList from "./pages/SLAList";
import SLADetail from "./pages/SLADetail";
import Applications from "./pages/Applications";
import ApplicationDetail from "./pages/ApplicationDetail";
import Releases from "./pages/Releases";
import BuildHistory from "./pages/BuildHistory";
import BuildDetail from "./pages/BuildDetail";
import Delivery from "./pages/Delivery";
import EnvironmentManagement from "./pages/EnvironmentManagement";
import EnvironmentDetail from "./pages/EnvironmentDetail";
import CNFDetail from "./pages/CNFDetail";
import CNFList from "./pages/CNFList";
import NotFound from "./pages/NotFound";
import Customers from "./pages/Customers";
import DeliveryWorkflows from "./pages/DeliveryWorkflows";
import DeliveryWorkflowDetail from "./pages/DeliveryWorkflowDetail";
import ExternalTools from "./pages/settings/ExternalTools";
import EnvironmentMapping from "./pages/settings/EnvironmentMapping";
import DevelopmentMapping from "./pages/settings/DevelopmentMapping";
import SystemSettings from "./pages/settings/SystemSettings";
import ProjectSettings from "./pages/settings/ProjectSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import Login from "./pages/Login";
import Projects from "./pages/Projects";
import DocumentManager from "./pages/DocumentManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/sla-list" element={<SLAList />} />
          <Route path="/sla-detail/:id" element={<SLADetail />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/application-detail/:appId" element={<ApplicationDetail />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/build-history" element={<BuildHistory />} />
          <Route path="/build-detail/:buildId" element={<BuildDetail />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/environment-management" element={<EnvironmentManagement />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/cnf-list" element={<CNFList />} />
          <Route path="/delivery-workflows" element={<DeliveryWorkflows />} />
          <Route path="/delivery-workflows/:workflowId" element={<DeliveryWorkflowDetail />} />
          <Route path="/environment-detail/:systemId" element={<EnvironmentDetail />} />
          <Route path="/cnf-detail/:cnfId" element={<CNFDetail />} />
          <Route path="/document-manager" element={<DocumentManager />} />
          <Route path="/settings/external-tools" element={<ExternalTools />} />
          <Route path="/settings/environment-mapping" element={<EnvironmentMapping />} />
          <Route path="/settings/development-mapping" element={<DevelopmentMapping />} />
          <Route path="/settings/system" element={<SystemSettings />} />
          <Route path="/settings/project" element={<ProjectSettings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

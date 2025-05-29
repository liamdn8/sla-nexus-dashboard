
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SLAList from "./pages/SLAList";
import SLADetail from "./pages/SLADetail";
import Applications from "./pages/Applications";
import Releases from "./pages/Releases";
import BuildHistory from "./pages/BuildHistory";
import EnvironmentManagement from "./pages/EnvironmentManagement";
import EnvironmentDetail from "./pages/EnvironmentDetail";
import CNFDetail from "./pages/CNFDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sla-list" element={<SLAList />} />
          <Route path="/sla-detail/:id" element={<SLADetail />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/releases" element={<Releases />} />
          <Route path="/build-history" element={<BuildHistory />} />
          <Route path="/environment-management" element={<EnvironmentManagement />} />
          <Route path="/environment-detail/:systemId" element={<EnvironmentDetail />} />
          <Route path="/cnf-detail/:cnfId" element={<CNFDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

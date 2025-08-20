import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import TrustBuilder from "./pages/TrustBuilder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<div className="min-h-screen bg-background p-8"><h1 className="font-display text-3xl">Pricing Plans Coming Soon</h1></div>} />
          <Route path="/consultation" element={<div className="min-h-screen bg-background p-8"><h1 className="font-display text-3xl">Book Consultation - Calendly Integration Coming Soon</h1></div>} />
          <Route path="/education" element={<div className="min-h-screen bg-background p-8"><h1 className="font-display text-3xl">Education Modules Coming Soon</h1></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

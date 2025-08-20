import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/shared/Navigation";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { DocumentsList } from "@/components/documents/DocumentsList";
import { EnhancedWealthMetrics } from "@/components/dashboard/EnhancedWealthMetrics";
import { TrustBuilderSection } from "@/components/dashboard/TrustBuilderSection";
import { FileUp, BookOpen, Calendar, Play } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

// Sample data with crypto holdings
const sampleDocuments = [
  {
    id: '1',
    name: 'Property_Valuation_Sandton.pdf',
    category: 'asset',
    subCategory: 'Property valuations',
    uploadDate: '2024-01-15',
    size: '2.3 MB',
    type: 'application/pdf',
    extractedValue: 3500000
  },
  {
    id: '2',
    name: 'Bitcoin_Wallet_Verified',
    category: 'asset',
    subCategory: 'Cryptocurrency holdings',
    uploadDate: '2024-01-10',
    size: 'N/A',
    type: 'crypto',
    verificationStatus: 'verified' as const,
    cryptoData: {
      walletAddress: '1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T',
      amount: 0.5,
      currency: 'BTC',
      zarValue: 650000,
      blockchain: 'Bitcoin'
    }
  },
  {
    id: '3',
    name: 'Home_Mortgage_FNB.pdf',
    category: 'debt',
    subCategory: 'Home mortgage statements',
    uploadDate: '2024-01-12',
    size: '1.8 MB',
    type: 'application/pdf',
    extractedValue: 1200000
  }
];

const Index = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState(sampleDocuments);
  const [activeTrusts, setActiveTrusts] = useState(3);
  
  const portfolio = useCountUp(4700000, 1500);

  const handleDocumentUpload = (files: File[], category: string, subCategory: string, cryptoData?: any) => {
    const newDocs = files.map((file, index) => ({
      id: Date.now() + index.toString(),
      name: file.name,
      category,
      subCategory,
      uploadDate: new Date().toISOString(),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type,
      extractedValue: Math.floor(Math.random() * 1000000) + 100000
    }));

    if (cryptoData) {
      newDocs[0] = {
        ...newDocs[0],
        verificationStatus: 'pending' as const,
        cryptoData: {
          walletAddress: cryptoData.walletAddress,
          amount: cryptoData.cryptoAmount,
          currency: cryptoData.cryptoCurrency,
          zarValue: cryptoData.currentValueZAR,
          blockchain: cryptoData.blockchain
        }
      };
    }

    setDocuments(prev => [...prev, ...newDocs]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <Navigation />
      <main className="container mx-auto px-4 py-10 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur shadow-lg p-6">
          <div className="absolute inset-0 -z-10 opacity-20" style={{background:"var(--gradient-primary)"}} />
          <h1 className="font-display text-2xl mb-1">Good day, Jonathan van der Merwe</h1>
          <p className="text-muted-foreground mb-4">Your legacy at a glance</p>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="text-3xl font-semibold">R {portfolio.toLocaleString()}</div>
            <span className="text-sm text-muted-foreground">Net Worth</span>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
          <h2 className="font-display text-lg mb-3">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="hero" onClick={() => setActiveTrusts(prev => prev + 1)}>
              <FileUp />Create New Trust
            </Button>
            <Button variant="outline" onClick={() => setShowUploadModal(true)}>
              <FileUp />Upload Document
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/consultation'}>
              <Calendar />Book Consultation
            </Button>
            <Button variant="premium" onClick={() => window.location.href = '/education'}>
              <Play />Start Learning
            </Button>
          </div>
        </section>

        {/* Wealth Metrics */}
        <EnhancedWealthMetrics documents={documents} />

        {/* Trust Builder Section */}
        <TrustBuilderSection 
          activeTrusts={activeTrusts} 
          onTrustCreated={() => setActiveTrusts(prev => prev + 1)} 
        />

        {/* Documents List */}
        <section>
          <h2 className="font-display text-xl mb-4">Document Vault</h2>
          <DocumentsList
            documents={documents}
            onDelete={(id) => setDocuments(prev => prev.filter(d => d.id !== id))}
            onView={(doc) => toast({ title: "Viewing Document", description: doc.name })}
          />
        </section>
      </main>

      <DocumentUploadModal
        open={showUploadModal}
        onOpenChange={setShowUploadModal}
        onUpload={handleDocumentUpload}
      />
    </div>
  );
};

export default Index;

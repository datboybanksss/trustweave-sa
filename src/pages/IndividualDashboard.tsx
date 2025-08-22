import { useState } from "react";
import Navigation from "@/components/shared/Navigation";
import GreetingHero from "@/components/dashboard/GreetingHero";
import { ActionItems } from "@/components/dashboard/ActionItems";
import { EnhancedWealthMetrics } from "@/components/dashboard/EnhancedWealthMetrics";
import { TrustBuilderSection } from "@/components/dashboard/TrustBuilderSection";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { DocumentsList } from "@/components/documents/DocumentsList";
import { toast } from "@/hooks/use-toast";
import { useCountUp } from "@/hooks/useCountUp";
import { Document } from "@/types";

// Sample data with crypto holdings
const sampleDocuments = [
  {
    id: '1',
    name: 'Property_Valuation_Sandton.pdf',
    category: 'asset' as const,
    subCategory: 'Property valuations',
    uploadDate: '2024-01-15',
    size: '2.3 MB',
    type: 'application/pdf',
    value: 3500000
  },
  {
    id: '2',
    name: 'Bitcoin_Wallet_Verified',
    category: 'asset' as const,
    subCategory: 'Cryptocurrency holdings',
    uploadDate: '2024-01-10',
    size: 'N/A',
    type: 'crypto',
    verificationStatus: 'verified' as const,
    cryptoAmount: 0.5,
    cryptoCurrency: 'BTC',
    value: 650000,
    walletAddress: '1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T',
    blockchainNetwork: 'Bitcoin'
  },
  {
    id: '3',
    name: 'Home_Mortgage_FNB.pdf',
    category: 'debt' as const,
    subCategory: 'Home mortgage statements',
    uploadDate: '2024-01-12',
    size: '1.8 MB',
    type: 'application/pdf',
    value: 1200000
  }
];

const IndividualDashboard = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [activeTrusts, setActiveTrusts] = useState(3);
  
  const portfolio = useCountUp(4700000, 1500);

  const handleDocumentUpload = (files: File[], category: 'asset' | 'identity' | 'debt', subCategory: string, cryptoData?: any) => {
    const newDocs = files.map((file, index) => ({
      id: Date.now() + index.toString(),
      name: file.name,
      category,
      subCategory,
      uploadDate: new Date().toISOString(),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type,
      value: Math.floor(Math.random() * 1000000) + 100000,
      ...(cryptoData && {
        verificationStatus: 'pending' as const,
        cryptoAmount: cryptoData.cryptoAmount,
        cryptoCurrency: cryptoData.cryptoCurrency,
        walletAddress: cryptoData.walletAddress,
        blockchainNetwork: cryptoData.blockchain
      })
    }));

    setDocuments(prev => [...prev, ...newDocs]);
    toast({
      title: "✓ Documents Uploaded",
      description: `${files.length} document(s) uploaded successfully`
    });
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
        <ActionItems 
          onCreateTrust={() => setActiveTrusts(prev => prev + 1)}
          onUploadDocument={() => setShowUploadModal(true)}
          onBookConsultation={() => window.location.href = '/consultation'}
          onStartLearning={() => window.location.href = '/education'}
        />

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

export default IndividualDashboard;
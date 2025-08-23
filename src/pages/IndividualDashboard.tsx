import { useState, useEffect } from "react";
import DashboardNavigation from "@/components/shared/DashboardNavigation";
import { ActionItems } from "@/components/dashboard/ActionItems";
import { EnhancedWealthMetrics } from "@/components/dashboard/EnhancedWealthMetrics";
import { TrustBuilderSection } from "@/components/dashboard/TrustBuilderSection";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { DocumentsList } from "@/components/documents/DocumentsList";
import { ConnectBankModal } from "@/components/modals/ConnectBankModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Banknote, TrendingUp, Shield, PieChart, Calendar } from "lucide-react";
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
  const [showBankModal, setShowBankModal] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [activeTrusts, setActiveTrusts] = useState(3);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [netWorth, setNetWorth] = useState(0);
  const [complianceScore, setComplianceScore] = useState(0);
  
  const userName = localStorage.getItem('userName') || 'Jonathan van der Merwe';
  const portfolio = useCountUp(netWorth, 1500);

  // Calculate live net worth and compliance
  useEffect(() => {
    const totalAssets = documents
      .filter(d => d.category === 'asset')
      .reduce((sum, d) => sum + (d.extractedValue || (d as any).value || 0), 0);
    
    const bankBalance = bankAccounts
      .reduce((sum: number, acc: any) => sum + acc.balance, 0);
    
    const totalDebts = documents
      .filter(d => d.category === 'debt')
      .reduce((sum, d) => sum + (d.extractedValue || (d as any).value || 0), 0);
    
    setNetWorth((totalAssets + bankBalance) - totalDebts);

    // Calculate compliance score
    const checks = {
      hasID: documents.some(d => d.category === 'identity'),
      hasTrustDocs: activeTrusts > 0,
      hasAssetProof: documents.some(d => d.category === 'asset'),
      hasBeneficiaryInfo: true, // placeholder
      allTrustsVerified: true // placeholder
    };
    
    const completed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    setComplianceScore(Math.round((completed / total) * 100));
  }, [documents, bankAccounts, activeTrusts]);

  const handleDocumentUpload = (files: File[], category: 'asset' | 'identity' | 'debt', subCategory: string, cryptoData?: any) => {
    const newDocs = files.map((file, index) => ({
      id: Date.now() + index.toString(),
      name: file.name,
      category,
      subCategory,
      uploadDate: new Date().toISOString(),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type,
      extractedValue: Math.floor(Math.random() * 1000000) + 100000,
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
      <DashboardNavigation />
      <main className="container mx-auto px-4 py-10 space-y-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur shadow-lg p-6">
          <div className="absolute inset-0 -z-10 opacity-20" style={{background:"var(--gradient-primary)"}} />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl mb-1">Good day, {userName}</h1>
              <p className="text-muted-foreground mb-4">Your legacy at a glance</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">R {portfolio.toLocaleString()}</div>
              <span className="text-sm text-muted-foreground">Net Worth • Live • Updated now</span>
            </div>
            <div className="hidden md:block">
              <Button 
                variant="outline"
                onClick={() => window.open('https://legacybuilder.smartwill.io/system/portal/mbw/signup.php', '_blank')}
              >
                Create Your Will →
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
          <h2 className="font-display text-lg mb-3">Quick Actions</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="hero" onClick={() => setActiveTrusts(prev => prev + 1)}>
              <Shield className="h-4 w-4 mr-2" />
              Create New Trust
            </Button>
            <Button variant="outline" onClick={() => setShowUploadModal(true)}>
              <Banknote className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/consultation'}>
              <Calendar className="h-4 w-4 mr-2" />
              Book Consultation
            </Button>
            <Button variant="premium" onClick={() => setShowBankModal(true)}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Connect Bank
            </Button>
          </div>
        </section>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                  <p className="text-2xl font-bold">
                    R {documents.filter(d => d.category === 'asset').reduce((sum, d) => sum + (d.extractedValue || (d as any).value || 0), 0).toLocaleString()}
                  </p>
                </div>
                <PieChart className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Debts</p>
                  <p className="text-2xl font-bold">
                    R {documents.filter(d => d.category === 'debt').reduce((sum, d) => sum + (d.extractedValue || (d as any).value || 0), 0).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trust Assets</p>
                  <p className="text-2xl font-bold">R 2,100,000</p>
                </div>
                <Shield className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                  <div className="flex items-center gap-2">
                    <Progress value={complianceScore} className="w-16" />
                    <span className="text-xl font-bold">{complianceScore}%</span>
                  </div>
                </div>
                <Badge variant={complianceScore === 100 ? "default" : "secondary"}>
                  {complianceScore === 100 ? "Complete" : "Pending"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

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

        <ConnectBankModal
          open={showBankModal}
          onOpenChange={setShowBankModal}
        />
    </div>
  );
};

export default IndividualDashboard;
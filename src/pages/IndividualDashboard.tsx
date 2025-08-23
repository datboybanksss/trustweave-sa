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
import { Banknote, TrendingUp, Shield, PieChart, Calendar, ChevronDown, FileText, Plus, Users, MoreHorizontal } from "lucide-react";
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
  const [trusts, setTrusts] = useState([
    { id: 1, name: 'Family Trust', value: 3500000, beneficiaries: 3, creationDate: '2023-05-15', lastReview: 'Today', assetsValue: 3500000, trustees: ['John Smith', 'Sarah Smith'], documentUrl: '/trust-docs/family-trust.pdf' },
    { id: 2, name: 'Business Trust', value: 2100000, beneficiaries: 2, creationDate: '2023-08-20', lastReview: '2024-01-10', assetsValue: 2100000, trustees: ['John Smith'], documentUrl: '/trust-docs/business-trust.pdf' }
  ]);
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, name: 'Sarah Smith', relationship: 'Spouse', percentage: 50 },
    { id: 2, name: 'John Smith Jr', relationship: 'Child', percentage: 25 },
    { id: 3, name: 'Emma Smith', relationship: 'Child', percentage: 25 }
  ]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [netWorth, setNetWorth] = useState(0);
  const [complianceScore, setComplianceScore] = useState(0);
  const [expandedTrusts, setExpandedTrusts] = useState<Record<number, boolean>>({});
  
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userName = userData.name || userData.fullName || 'User';
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
      hasTrustDocs: trusts.length > 0,
      hasAssetProof: documents.some(d => d.category === 'asset'),
      hasBeneficiaryInfo: beneficiaries.length > 0,
      allTrustsVerified: trusts.length > 0
    };
    
    const completed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    setComplianceScore(Math.round((completed / total) * 100));
  }, [documents, bankAccounts, trusts, beneficiaries]);

  const toggleTrustExpansion = (trustId: number) => {
    setExpandedTrusts(prev => ({
      ...prev,
      [trustId]: !prev[trustId]
    }));
  };

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
            <Button variant="hero">
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
                    <p className="text-sm font-medium text-muted-foreground">Active Trusts</p>
                    <p className="text-2xl font-bold">{trusts.length}</p>
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

        {/* Your Active Trusts - Display Only */}
        <section className="rounded-xl border bg-card/80 backdrop-blur p-6">
          <h2 className="font-display text-xl mb-4">Your Active Trusts</h2>
          {trusts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No trusts created yet. Use the "Create New Trust" button above to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trusts.map(trust => (
                <Card key={trust.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleTrustExpansion(trust.id)}
                    >
                      <div>
                        <h3 className="font-semibold text-lg">{trust.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {trust.beneficiaries} beneficiaries • Created {trust.creationDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-bold">R {trust.value.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Last review: {trust.lastReview}</p>
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform ${expandedTrusts[trust.id] ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    {expandedTrusts[trust.id] && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Trust Details</h4>
                            <div className="space-y-1 text-sm">
                              <p><span className="text-muted-foreground">Trustees:</span> {trust.trustees.join(', ')}</p>
                              <p><span className="text-muted-foreground">Assets Value:</span> R {trust.assetsValue.toLocaleString()}</p>
                              <p><span className="text-muted-foreground">Last Review:</span> {trust.lastReview}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-center">
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              View Trust Document
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Beneficiaries Section */}
        <section className="rounded-xl border bg-card/80 backdrop-blur p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Beneficiaries ({beneficiaries.length})</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Beneficiary
            </Button>
          </div>
          
          {beneficiaries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No beneficiaries added yet. Add your first beneficiary to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {beneficiaries.map(beneficiary => (
                <Card key={beneficiary.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{beneficiary.name}</p>
                        <p className="text-sm text-muted-foreground">{beneficiary.relationship}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-semibold">{beneficiary.percentage}%</p>
                          <p className="text-xs text-muted-foreground">Allocation</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

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
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, FileText, CreditCard, Calendar, Building2, Users, TrendingUp, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { DashboardNavigation } from "@/components/shared/DashboardNavigation";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { ConnectBankModal } from "@/components/modals/ConnectBankModal";
import WealthGrowthChart from "@/components/dashboard/WealthGrowthChart";
import AssetAllocationChart from "@/components/dashboard/AssetAllocationChart";  
import CryptoHoldingsChart from "@/components/dashboard/CryptoHoldingsChart";
import DebtAllocationChart from "@/components/dashboard/DebtAllocationChart";
import { Document } from "@/types";
import { toast } from "sonner";
import { getGreetingName, getUserData } from "@/lib/userSession";

// Sample data (can be replaced by DB later)
const sampleDocuments: Document[] = [
  { 
    id: "1", 
    name: "Primary Residence", 
    category: "asset", 
    subCategory: "Property",
    extractedValue: 2500000,
    uploadDate: "2024-01-15", 
    verificationStatus: "verified",
    size: "2.5MB",
    type: "PDF"
  },
  { 
    id: "2", 
    name: "Investment Portfolio", 
    category: "asset", 
    subCategory: "Investment",
    extractedValue: 1250000,
    uploadDate: "2024-01-10", 
    verificationStatus: "verified",
    size: "1.8MB",
    type: "PDF"
  },
  { 
    id: "3", 
    name: "Business Shares", 
    category: "asset", 
    subCategory: "Business",
    extractedValue: 800000,
    uploadDate: "2024-01-08", 
    verificationStatus: "pending",
    size: "3.2MB",
    type: "PDF"
  },
  { 
    id: "4", 
    name: "Home Loan", 
    category: "debt", 
    subCategory: "Mortgage",
    extractedValue: 1200000,
    uploadDate: "2024-01-12", 
    verificationStatus: "verified",
    size: "1.1MB",
    type: "PDF"
  },
  { 
    id: "5", 
    name: "Vehicle Finance", 
    category: "debt", 
    subCategory: "Vehicle",
    extractedValue: 350000,
    uploadDate: "2024-01-14", 
    verificationStatus: "verified",
    size: "900KB",
    type: "PDF"
  }
];

const sampleTrusts = [
  { 
    id: 1, 
    name: "Family Trust", 
    value: 3200000, 
    beneficiaries: ["Sarah Johnson", "Michael Johnson", "Emma Johnson"],
    createdDate: "2024-01-01",
    status: "active"
  },
  { 
    id: 2, 
    name: "Education Trust", 
    value: 500000, 
    beneficiaries: ["Emma Johnson", "Luke Johnson"],
    createdDate: "2024-01-15",
    status: "active"
  }
];

const sampleBeneficiaries = [
  { id: 1, name: "Sarah Johnson", relationship: "Spouse", percentage: 40 },
  { id: 2, name: "Michael Johnson", relationship: "Son", percentage: 30 },
  { id: 3, name: "Emma Johnson", relationship: "Daughter", percentage: 30 }
];

const IndividualDashboard = () => {
  const userData = getUserData();
  const greetingName = getGreetingName();
  
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [trusts, setTrusts] = useState(sampleTrusts);
  const [beneficiaries, setBeneficiaries] = useState(sampleBeneficiaries);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [expandedTrusts, setExpandedTrusts] = useState<Set<number>>(new Set());
  
  // Derived metrics
  const [netWorth, setNetWorth] = useState(0);
  const [complianceScore, setComplianceScore] = useState(0);

  useEffect(() => {
    // Calculate net worth
    const assets = documents.filter(d => d.category === 'asset').reduce((sum, d) => sum + (d.extractedValue || 0), 0);
    const debts = documents.filter(d => d.category === 'debt').reduce((sum, d) => sum + (d.extractedValue || 0), 0);
    setNetWorth(assets - debts);

    // Calculate compliance score (25% each for presence of documents, trusts, beneficiaries, bank accounts)
    let score = 0;
    if (documents.length > 0) score += 25;
    if (trusts.length > 0) score += 25;
    if (beneficiaries.length > 0) score += 25;
    if (bankAccounts.length > 0) score += 25;
    setComplianceScore(score);
  }, [documents, trusts, beneficiaries, bankAccounts]);

  const toggleTrustExpansion = (trustId: number) => {
    setExpandedTrusts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trustId)) {
        newSet.delete(trustId);
      } else {
        newSet.add(trustId);
      }
      return newSet;
    });
  };

  const handleDocumentUpload = (files: File[], category: 'asset' | 'identity' | 'debt', subCategory: string, cryptoData?: any) => {
    const newDocuments = files.map((file, index) => ({
      id: `${documents.length + index + 1}`,
      name: file.name,
      category: category as 'asset' | 'debt',
      subCategory: subCategory,
      extractedValue: category === 'debt' ? 0 : Math.floor(Math.random() * 1000000) + 100000,
      uploadDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'pending' as const,
      size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
      type: file.type.split('/')[1].toUpperCase()
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
    setShowUploadModal(false);
    toast.success(`${files.length} document(s) uploaded successfully`);
  };

  const assetsSum = documents.filter(d => d.category === 'asset').reduce((sum, d) => sum + (d.extractedValue || 0), 0);
  const debtsSum = documents.filter(d => d.category === 'debt').reduce((sum, d) => sum + (d.extractedValue || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <DashboardNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-6 border border-primary/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                  Good day, {greetingName}
                </h1>
                <p className="text-muted-foreground text-lg">
                  Your legacy is growing stronger every day
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Current Net Worth</p>
                <p className="text-3xl font-bold text-primary">
                  R {netWorth.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
            onClick={() => toast.info("Trust creation coming soon!")}
          >
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Create Trust</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
            onClick={() => setShowUploadModal(true)}
          >
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Upload Document</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
            onClick={() => toast.info("Consultation booking coming soon!")}
          >
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Book Consultation</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
            onClick={() => setShowBankModal(true)}
          >
            <CreditCard className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Connect Bank</span>
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Assets</p>
                  <p className="text-2xl font-bold text-success">R {assetsSum.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Debts</p>
                  <p className="text-2xl font-bold text-destructive">R {debtsSum.toLocaleString()}</p>
                </div>
                <CreditCard className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Trusts</p>
                  <p className="text-2xl font-bold text-primary">{trusts.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Score</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-accent">{complianceScore}%</p>
                  </div>
                  <Progress value={complianceScore} className="w-full mt-2" />
                </div>
                <Shield className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Wealth Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <WealthGrowthChart />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <AssetAllocationChart />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Crypto Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <CryptoHoldingsChart />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Debt Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <DebtAllocationChart />
            </CardContent>
          </Card>
        </div>

        {/* Active Trusts */}
        <Card className="bg-card/80 backdrop-blur border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Your Active Trusts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trusts.map((trust) => (
                <div key={trust.id} className="border border-border/50 rounded-lg p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleTrustExpansion(trust.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-success rounded-full"></div>
                      <div>
                        <h4 className="font-semibold">{trust.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Created {trust.createdDate} • {trust.beneficiaries.length} beneficiaries
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold">R {trust.value.toLocaleString()}</p>
                        <Badge variant="outline" className="border-success text-success">
                          {trust.status}
                        </Badge>
                      </div>
                      {expandedTrusts.has(trust.id) ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </div>
                  </div>
                  
                  {expandedTrusts.has(trust.id) && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <h5 className="font-medium mb-2">Beneficiaries</h5>
                      <div className="flex flex-wrap gap-2">
                        {trust.beneficiaries.map((beneficiary, index) => (
                          <Badge key={index} variant="secondary">
                            {beneficiary}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Beneficiaries */}
        <Card className="bg-card/80 backdrop-blur border-border/50 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Beneficiaries
              </CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Beneficiary
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {beneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{beneficiary.name}</p>
                    <p className="text-sm text-muted-foreground">{beneficiary.relationship}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{beneficiary.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Vault */}
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Vault
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowUploadModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.category} • Uploaded {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">R {(doc.extractedValue || 0).toLocaleString()}</p>
                    <Badge 
                      variant={doc.verificationStatus === 'verified' ? 'default' : 'secondary'}
                      className={doc.verificationStatus === 'verified' ? 'bg-success' : ''}
                    >
                      {doc.verificationStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
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
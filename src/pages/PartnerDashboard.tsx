import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  FileText, 
  Shield, 
  Users, 
  DollarSign, 
  Calendar, 
  Building, 
  Plus,
  Upload,
  Phone,
  Landmark,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  Eye,
  BarChart3,
  PieChart,
  UserPlus,
  RotateCcw
} from "lucide-react";
import DashboardNavigation from "@/components/shared/DashboardNavigation";
import WealthGrowthChart from "@/components/dashboard/WealthGrowthChart";
import AssetAllocationChart from "@/components/dashboard/AssetAllocationChart";
import CryptoHoldingsChart from "@/components/dashboard/CryptoHoldingsChart";
import DebtAllocationChart from "@/components/dashboard/DebtAllocationChart";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { toast } from "sonner";
import { getUserData, getGreetingName } from "@/lib/userSession";
import { loadPartnerDemo, savePartnerDemo, resetPartnerDemo, type DemoClient } from "@/lib/partnerDemo";
import { PdfReportPreview } from "@/components/reports/PdfReportPreview";

const PartnerDashboard = () => {
  const [clients, setClients] = useState<DemoClient[]>([]);
  const [selectedClient, setSelectedClient] = useState<DemoClient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [totalAUM, setTotalAUM] = useState(0);
  const [newClient, setNewClient] = useState({
    fullName: '',
    idNumber: '',
    email: '',
    phone: ''
  });

  const userData = getUserData();
  const greetingName = getGreetingName();
  const firmName = userData?.firmName || 'Law Firm';

  // Load partner demo data on mount
  useEffect(() => {
    const demoClients = loadPartnerDemo();
    setClients(demoClients);
    const total = demoClients.reduce((sum, client) => sum + client.netWorth, 0);
    setTotalAUM(total);
  }, []);

  // Recalculate AUM when clients change
  useEffect(() => {
    const total = clients.reduce((sum, client) => sum + client.netWorth, 0);
    setTotalAUM(total);
  }, [clients]);

  const handleAddClient = () => {
    if (newClient.fullName && newClient.idNumber) {
      const client: DemoClient = {
        id: `client_${Date.now()}`,
        name: newClient.fullName,
        idNumber: newClient.idNumber,
        netWorth: 0,
        totalAssets: 0,
        totalDebts: 0,
        trustCount: 0,
        documentCount: 0,
        compliance: 25,
        joinDate: new Date().toISOString().slice(0, 10),
        lastUpdated: new Date().toISOString().slice(0, 10),
        documents: [],
        trusts: []
      };
      
      const updatedClients = [...clients, client];
      setClients(updatedClients);
      savePartnerDemo(updatedClients);
      
      setNewClient({ fullName: '', idNumber: '', email: '', phone: '' });
      setShowAddClientModal(false);
      
      toast.success(`Client ${newClient.fullName} added successfully`);
    }
  };

  const handleResetDemo = () => {
    resetPartnerDemo();
    const newDemoClients = loadPartnerDemo();
    setClients(newDemoClients);
    setSelectedClient(null);
    const total = newDemoClients.reduce((sum, client) => sum + client.netWorth, 0);
    setTotalAUM(total);
    toast.success('Demo data reset successfully');
  };

  const handleDocumentUpload = (files: File[], category: 'asset' | 'identity' | 'debt', subCategory: string, cryptoData?: any) => {
    if (!selectedClient) return;

    const newDocuments = files.map((file, index) => ({
      id: crypto.randomUUID(),
      name: file.name,
      category: category as 'asset' | 'debt',
      value: category === 'debt' ? Math.floor(Math.random() * 500000) + 50000 : Math.floor(Math.random() * 1000000) + 100000,
    }));

    // Update the selected client's documents and recalculate totals
    const updatedClient = {
      ...selectedClient,
      documents: [...selectedClient.documents, ...newDocuments],
      documentCount: selectedClient.documentCount + files.length
    };

    // Recalculate totals
    const assets = updatedClient.documents.filter(d => d.category === 'asset').reduce((sum, d) => sum + d.value, 0);
    const debts = updatedClient.documents.filter(d => d.category === 'debt').reduce((sum, d) => sum + d.value, 0);
    updatedClient.totalAssets = assets;
    updatedClient.totalDebts = debts;
    updatedClient.netWorth = assets - debts;
    updatedClient.lastUpdated = new Date().toISOString().slice(0, 10);

    // Update clients list
    const updatedClients = clients.map(c => c.id === selectedClient.id ? updatedClient : c);
    setClients(updatedClients);
    setSelectedClient(updatedClient);
    savePartnerDemo(updatedClients);

    setShowUploadModal(false);
    toast.success(`${files.length} document(s) uploaded successfully for ${selectedClient.name}`);
  };

  const switchToClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client || null);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.idNumber.includes(searchTerm)
  );

  const totalTrusts = clients.reduce((sum, client) => sum + client.trustCount, 0);
  const totalDocuments = clients.reduce((sum, client) => sum + client.documentCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <DashboardNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Partner Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">Good day, {greetingName}!</h1>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Partner Portal
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-2">{firmName}</p>
            <p className="text-muted-foreground">
              Professional client management and wealth oversight
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-1">Total AUM</p>
            <p className="text-2xl md:text-3xl font-bold text-primary">
              R {totalAUM.toLocaleString()}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleResetDemo}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset Demo Data
            </Button>
          </div>
        </div>

        {/* Client Switcher */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <label className="text-sm text-muted-foreground">Current Client:</label>
                <Select 
                  value={selectedClient?.id || 'overview'} 
                  onValueChange={(value) => {
                    if (value === 'add-new') {
                      setShowAddClientModal(true);
                    } else if (value === 'overview') {
                      setSelectedClient(null);
                    } else {
                      const client = clients.find(c => c.id === value);
                      setSelectedClient(client || null);
                    }
                  }}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="📊 All Clients Overview" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">📊 All Clients Overview</SelectItem>
                    <SelectItem value="add-new">➕ Add New Client</SelectItem>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        👤 {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {!selectedClient ? (
          // Overview Mode - All Clients
          <div className="space-y-8">
            {/* Metrics Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Clients</p>
                      <p className="text-2xl font-bold">{clients.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Assets Under Management</p>
                      <p className="text-2xl font-bold text-success">R {totalAUM.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Trusts</p>
                      <p className="text-2xl font-bold">{totalTrusts}</p>
                    </div>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Documents Managed</p>
                      <p className="text-2xl font-bold">{totalDocuments}</p>
                    </div>
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Portfolio Table */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Portfolio
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                      placeholder="Search clients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                  <Button onClick={() => setShowAddClientModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Client</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">ID Number</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Net Worth</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Trusts</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Compliance</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Last Updated</th>
                        <th className="pb-3 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="border-b">
                          <td className="py-4">
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">Joined {client.joinDate}</p>
                            </div>
                          </td>
                          <td className="py-4 text-sm font-mono">{client.idNumber}</td>
                          <td className="py-4">
                            <p className="font-medium">R {client.netWorth.toLocaleString()}</p>
                          </td>
                          <td className="py-4">{client.trustCount}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <Progress value={client.compliance} className="w-12 h-2" />
                              <span className="text-sm">{client.compliance}%</span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-muted-foreground">{client.lastUpdated}</td>
                          <td className="py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => switchToClient(client.id)}
                            >
                              Manage
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Overview Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Portfolio Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <WealthGrowthChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Asset Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetAllocationChart />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Client Detail View
          <div className="space-y-8">
            {/* Client Header */}
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClient(null)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Back to Overview
                      </Button>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">{selectedClient.name}</h2>
                    <p className="text-muted-foreground mb-1">ID: {selectedClient.idNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      Client since {selectedClient.joinDate} • Last updated {selectedClient.lastUpdated}
                    </p>
                  </div>
                  <div className="text-center lg:text-right">
                    <p className="text-sm text-muted-foreground mb-1">Net Worth</p>
                    <p className="text-3xl font-bold text-primary">
                      R {selectedClient.netWorth.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
                onClick={() => toast.info("Trust creation coming soon!")}
              >
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Create Trust</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
                onClick={() => setShowUploadModal(true)}
              >
                <Upload className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Upload Document</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
                onClick={() => setShowReportPreview(true)}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Generate Report</span>
              </Button>

              <Button 
                variant="outline" 
                className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
                onClick={() => toast.info("Meeting scheduler coming soon!")}
              >
                <Calendar className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Schedule Meeting</span>
              </Button>
            </div>

            {/* Client Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{selectedClient.name.split(' ')[0]}'s Total Assets</p>
                      <p className="text-2xl font-bold text-success">
                        R {selectedClient.totalAssets.toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{selectedClient.name.split(' ')[0]}'s Current Debts</p>
                      <p className="text-2xl font-bold text-destructive">
                        R {selectedClient.totalDebts.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Trusts</p>
                      <p className="text-2xl font-bold">{selectedClient.trustCount}</p>
                    </div>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Compliance</p>
                      <p className="text-2xl font-bold">{selectedClient.compliance}%</p>
                    </div>
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                  <Progress value={selectedClient.compliance} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Client Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedClient.name.split(' ')[0]}'s Wealth Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <WealthGrowthChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedClient.name.split(' ')[0]}'s Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssetAllocationChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedClient.name.split(' ')[0]}'s Crypto Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <CryptoHoldingsChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedClient.name.split(' ')[0]}'s Debt Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <DebtAllocationChart />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Add Client Modal */}
        <Dialog open={showAddClientModal} onOpenChange={setShowAddClientModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add New Client
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={newClient.fullName}
                  onChange={(e) => setNewClient(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="John Smith"
                />
              </div>

              <div>
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={newClient.idNumber}
                  onChange={(e) => setNewClient(prev => ({ ...prev, idNumber: e.target.value }))}
                  placeholder="8001015800087"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+27 82 123 4567"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  onClick={handleAddClient}
                  disabled={!newClient.fullName || !newClient.idNumber}
                  className="flex-1"
                >
                  Add Client
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddClientModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
            </DialogContent>
        </Dialog>

        {/* Document Upload Modal */}
        {selectedClient && (
          <DocumentUploadModal
            open={showUploadModal}
            onOpenChange={setShowUploadModal}
            onUpload={handleDocumentUpload}
          />
        )}

        {/* PDF Report Preview Modal */}
        {selectedClient && (
          <PdfReportPreview
            isOpen={showReportPreview}
            onClose={() => setShowReportPreview(false)}
            client={selectedClient}
          />
        )}
      </div>
    </div>
  );
};

export default PartnerDashboard;
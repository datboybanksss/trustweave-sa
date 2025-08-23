import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Users, Building2, FileText, TrendingUp, Search, Calendar, Upload, BarChart3, Phone } from "lucide-react";
import { DashboardNavigation } from "@/components/shared/DashboardNavigation";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import WealthGrowthChart from "@/components/dashboard/WealthGrowthChart";
import AssetAllocationChart from "@/components/dashboard/AssetAllocationChart";
import { Document } from "@/types";
import { toast } from "sonner";
import { getGreetingName, getUserData } from "@/lib/userSession";

// Client interface
interface Client {
  id: number;
  name: string;
  idNumber: string;
  netWorth: number;
  totalAssets: number;
  totalDebts: number;
  trustCount: number;
  documentCount: number;
  compliance: number;
  joinDate: string;
  lastUpdated: string;
  email?: string;
  phone?: string;
}

// Sample clients data
const sampleClients: Client[] = [
  {
    id: 1,
    name: "John Smith",
    idNumber: "8001015009088",
    netWorth: 2850000,
    totalAssets: 4200000,
    totalDebts: 1350000,
    trustCount: 2,
    documentCount: 12,
    compliance: 85,
    joinDate: "2024-01-15",
    lastUpdated: "2024-03-10",
    email: "john.smith@email.com",
    phone: "+27 82 123 4567"
  },
  {
    id: 2,
    name: "Sarah Williams",
    idNumber: "7508123456789",
    netWorth: 1650000,
    totalAssets: 2400000,
    totalDebts: 750000,
    trustCount: 1,
    documentCount: 8,
    compliance: 75,
    joinDate: "2024-02-01",
    lastUpdated: "2024-03-08",
    email: "sarah.williams@email.com",
    phone: "+27 83 987 6543"
  },
  {
    id: 3,
    name: "Michael Johnson",
    idNumber: "6912087654321",
    netWorth: 3200000,
    totalAssets: 5100000,
    totalDebts: 1900000,
    trustCount: 3,
    documentCount: 15,
    compliance: 92,
    joinDate: "2023-11-20",
    lastUpdated: "2024-03-12",
    email: "michael.johnson@email.com",
    phone: "+27 84 555 0123"
  }
];

const PartnerDashboard = () => {
  const userData = getUserData();
  const greetingName = getGreetingName();
  
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [newClientData, setNewClientData] = useState({
    name: "",
    idNumber: "",
    email: "",
    phone: ""
  });

  // Derived metrics
  const totalAUM = clients.reduce((sum, client) => sum + client.netWorth, 0);
  const totalTrusts = clients.reduce((sum, client) => sum + client.trustCount, 0);
  const totalDocuments = clients.reduce((sum, client) => sum + client.documentCount, 0);

  const handleAddClient = () => {
    if (!newClientData.name || !newClientData.idNumber) {
      toast.error("Please fill in required fields");
      return;
    }

    const newClient: Client = {
      id: clients.length + 1,
      name: newClientData.name,
      idNumber: newClientData.idNumber,
      email: newClientData.email,
      phone: newClientData.phone,
      netWorth: 0,
      totalAssets: 0,
      totalDebts: 0,
      trustCount: 0,
      documentCount: 0,
      compliance: 25, // Base score for just having account
      joinDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setClients(prev => [...prev, newClient]);
    setNewClientData({ name: "", idNumber: "", email: "", phone: "" });
    setShowAddClientModal(false);
    toast.success("Client added successfully");
  };

  const switchToClient = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client || null);
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.idNumber.includes(searchTerm)
  );

  const handleDocumentUpload = (files: File[], category: 'asset' | 'identity' | 'debt', subCategory: string, cryptoData?: any) => {
    if (!selectedClient) return;
    
    // Update client document count
    setClients(prev => prev.map(client => 
      client.id === selectedClient.id 
        ? { ...client, documentCount: client.documentCount + files.length }
        : client
    ));
    
    setShowUploadModal(false);
    toast.success(`${files.length} document(s) uploaded for ${selectedClient.name}`);
  };

  // Client View (when a client is selected)
  if (selectedClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <DashboardNavigation />
        
        <div className="container mx-auto px-4 py-8">
          {/* Client Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-6 border border-primary/20">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setSelectedClient(null)}
                      className="text-primary hover:text-primary"
                    >
                      ← Back to Overview
                    </Button>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Partner Portal
                    </Badge>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-1">
                    {selectedClient.name}
                  </h1>
                  <p className="text-muted-foreground">
                    Joined {selectedClient.joinDate} • ID: {selectedClient.idNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Current Net Worth</p>
                  <p className="text-3xl font-bold text-primary">
                    R {selectedClient.netWorth.toLocaleString()}
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
              <Upload className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Upload Document</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
              onClick={() => toast.info("Report generation coming soon!")}
            >
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Generate Report</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex flex-col gap-2 bg-card hover:bg-primary/10 border-primary/20"
              onClick={() => toast.info("Meeting scheduling coming soon!")}
            >
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium">Schedule Meeting</span>
            </Button>
          </div>

          {/* Client Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Assets</p>
                    <p className="text-2xl font-bold text-success">R {selectedClient.totalAssets.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-destructive">R {selectedClient.totalDebts.toLocaleString()}</p>
                  </div>
                  <FileText className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Compliance</p>
                    <p className="text-2xl font-bold text-accent">{selectedClient.compliance}%</p>
                  </div>
                  <Building2 className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts for selected client */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </div>
        </div>

        {/* Upload Modal */}
        <DocumentUploadModal 
          open={showUploadModal}
          onOpenChange={setShowUploadModal}
          onUpload={handleDocumentUpload}
        />
      </div>
    );
  }

  // Partner Overview (no client selected)
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <DashboardNavigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-6 border border-primary/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Partner Portal
                  </Badge>
                </div>
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-2">
                  Good day, {greetingName}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {userData?.firmName && `${userData.firmName} • `}Managing your clients' legacy with excellence
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Total AUM</p>
                <p className="text-3xl font-bold text-primary">
                  R {totalAUM.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Client Switcher */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <Label htmlFor="client-search" className="text-sm font-medium mb-2 block">
                Find or manage clients
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="client-search"
                  placeholder="Search clients by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Dialog open={showAddClientModal} onOpenChange={setShowAddClientModal}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Client
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Full Name *</Label>
                    <Input 
                      id="clientName"
                      value={newClientData.name}
                      onChange={(e) => setNewClientData(prev => ({...prev, name: e.target.value}))}
                      placeholder="Enter client's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientId">ID Number *</Label>
                    <Input 
                      id="clientId"
                      value={newClientData.idNumber}
                      onChange={(e) => setNewClientData(prev => ({...prev, idNumber: e.target.value}))}
                      placeholder="South African ID number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Email (Optional)</Label>
                    <Input 
                      id="clientEmail"
                      type="email"
                      value={newClientData.email}
                      onChange={(e) => setNewClientData(prev => ({...prev, email: e.target.value}))}
                      placeholder="client@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">Phone (Optional)</Label>
                    <Input 
                      id="clientPhone"
                      value={newClientData.phone}
                      onChange={(e) => setNewClientData(prev => ({...prev, phone: e.target.value}))}
                      placeholder="+27 82 123 4567"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setShowAddClientModal(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleAddClient} className="flex-1">
                      Add Client
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clients</p>
                  <p className="text-2xl font-bold text-primary">{clients.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Assets Under Management</p>
                  <p className="text-2xl font-bold text-success">R {totalAUM.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Trusts</p>
                  <p className="text-2xl font-bold text-accent">{totalTrusts}</p>
                </div>
                <Building2 className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents Managed</p>
                  <p className="text-2xl font-bold text-primary">{totalDocuments}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Portfolio Table */}
        <Card className="bg-card/80 backdrop-blur border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Client Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Net Worth</TableHead>
                    <TableHead>Trusts</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.idNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">R {client.netWorth.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>{client.trustCount}</TableCell>
                      <TableCell>{client.documentCount}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={client.compliance >= 80 ? 'default' : 'secondary'}
                          className={client.compliance >= 80 ? 'bg-success' : ''}
                        >
                          {client.compliance}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {client.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => switchToClient(client.id)}
                        >
                          Manage →
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Overview Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Portfolio Growth Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <WealthGrowthChart />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Client Asset Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <AssetAllocationChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
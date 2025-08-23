import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, Building, TrendingUp, FileText, Plus, ChevronDown, 
  ArrowLeft, Search, MoreHorizontal, Calendar, Upload, PieChart, BarChart3 
} from "lucide-react";
import DashboardNavigation from "@/components/shared/DashboardNavigation";
import { DocumentUploadModal } from "@/components/documents/DocumentUploadModal";
import { DocumentsList } from "@/components/documents/DocumentsList";
import { toast } from "@/hooks/use-toast";
import { Document } from "@/types";
import AssetAllocationChart from "@/components/dashboard/AssetAllocationChart";
import WealthGrowthChart from "@/components/dashboard/WealthGrowthChart";
import DebtAllocationChart from "@/components/dashboard/DebtAllocationChart";

interface Client {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  netWorth: number;
  totalAssets: number;
  totalDebts: number;
  services: string[];
  joinDate: string;
  lastUpdated: string;
  monthlyChange: number;
  documents: Document[];
  trusts: number;
}

const sampleClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '+27 82 123 4567',
    netWorth: 8500000,
    totalAssets: 12300000,
    totalDebts: 3800000,
    services: ['Trust Planning', 'Tax Optimization'],
    joinDate: '2023-03-15',
    lastUpdated: '2024-01-20',
    monthlyChange: 8.2,
    documents: [],
    trusts: 2
  },
  {
    id: '2',
    name: 'Michael Chen',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael@example.com',
    phone: '+27 83 987 6543',
    netWorth: 15200000,
    totalAssets: 18900000,
    totalDebts: 3700000,
    services: ['Estate Planning', 'Business Succession'],
    joinDate: '2022-11-08',
    lastUpdated: '2024-01-18',
    monthlyChange: 12.1,
    documents: [],
    trusts: 3
  },
  {
    id: '3',
    name: 'Lisa van der Merwe',
    firstName: 'Lisa',
    lastName: 'van der Merwe',
    email: 'lisa@example.com',
    phone: '+27 84 555 1234',
    netWorth: 6200000,
    totalAssets: 8100000,
    totalDebts: 1900000,
    services: ['Will Drafting'],
    joinDate: '2024-01-10',
    lastUpdated: '2024-01-22',
    monthlyChange: 3.5,
    documents: [],
    trusts: 1
  }
];

const PartnerDashboard = () => {
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    phone: '',
    netWorth: '',
    primaryService: '',
    notes: ''
  });

  const firmName = localStorage.getItem('firmName') || "van der Merwe & Associates";
  const userName = localStorage.getItem('userName') || 'Partner';
  const totalAUM = clients.reduce((sum, client) => sum + client.netWorth, 0);
  const totalTrusts = clients.reduce((sum, client) => sum + client.trusts, 0);
  const totalDocuments = clients.reduce((sum, client) => sum + client.documents.length, 0);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    if (!newClient.firstName || !newClient.lastName || !newClient.email) {
      toast({ title: "Error", description: "Please fill in required fields" });
      return;
    }

    const client: Client = {
      id: Date.now().toString(),
      name: `${newClient.firstName} ${newClient.lastName}`,
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      email: newClient.email,
      phone: newClient.phone,
      netWorth: parseInt(newClient.netWorth) || 0,
      totalAssets: parseInt(newClient.netWorth) || 0,
      totalDebts: 0,
      services: newClient.primaryService ? [newClient.primaryService] : [],
      joinDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      monthlyChange: 0,
      documents: [],
      trusts: 0
    };

    setClients(prev => [...prev, client]);
    setShowAddClientModal(false);
    setNewClient({
      firstName: '', lastName: '', idNumber: '', email: '', phone: '', 
      netWorth: '', primaryService: '', notes: ''
    });
    
    toast({
      title: "✓ Client Added",
      description: `${client.name} has been added to your client portfolio`
    });
  };

  const switchToClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    setSelectedClient(client || null);
  };

  if (selectedClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
        <DashboardNavigation />
        <main className="container mx-auto px-4 py-10 space-y-8">
          {/* Client Header */}
          <section className="relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur shadow-lg p-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedClient(null)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Clients
            </Button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl mb-1">{selectedClient.name}</h1>
                <p className="text-muted-foreground">
                  Client since {new Date(selectedClient.joinDate).toLocaleDateString()}
                </p>
                <Badge className="mt-2">
                  {selectedClient.services.join(', ') || 'General Planning'}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold">R {selectedClient.netWorth.toLocaleString()}</div>
                <span className="text-sm text-muted-foreground">Net Worth</span>
              </div>
            </div>
          </section>

          {/* Client Actions */}
          <section className="rounded-xl border bg-card/80 backdrop-blur p-4">
            <h2 className="font-display text-lg mb-3">Client Actions</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Create Trust for {selectedClient.firstName}
              </Button>
              <Button variant="outline" onClick={() => setShowUploadModal(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Client Documents
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Client Meeting
              </Button>
              <Button variant="premium">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </section>

          {/* Client Metrics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card/80 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Net Worth</p>
                    <p className="text-2xl font-bold">R {selectedClient.netWorth.toLocaleString()}</p>
                    <p className="text-xs text-success">+{selectedClient.monthlyChange}% this month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                    <p className="text-2xl font-bold">R {selectedClient.totalAssets.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold">R {selectedClient.totalDebts.toLocaleString()}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Charts */}
          <div className="grid gap-4 md:grid-cols-3">
            <WealthGrowthChart />
            <AssetAllocationChart />
            <DebtAllocationChart />
          </div>

          {/* Client Documents */}
          <section>
            <h2 className="font-display text-xl mb-4">Client Documents</h2>
            <DocumentsList
              documents={selectedClient.documents}
              onDelete={(id) => {
                const updatedClients = clients.map(c => 
                  c.id === selectedClient.id 
                    ? { ...c, documents: c.documents.filter(d => d.id !== id) }
                    : c
                );
                setClients(updatedClients);
                setSelectedClient(prev => prev ? { 
                  ...prev, 
                  documents: prev.documents.filter(d => d.id !== id) 
                } : null);
              }}
              onView={(doc) => toast({ title: "Viewing Document", description: doc.name })}
            />
          </section>
        </main>

        <DocumentUploadModal
          open={showUploadModal}
          onOpenChange={setShowUploadModal}
          onUpload={(files, category, subCategory, cryptoData) => {
            // Add documents to selected client
            const newDocs: Document[] = files.map((file, index) => ({
              id: Date.now() + index.toString(),
              name: file.name,
              category: category as 'asset' | 'identity' | 'debt',
              subCategory: subCategory || '',
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

            const updatedClients = clients.map(c => 
              c.id === selectedClient.id 
                ? { ...c, documents: [...c.documents, ...newDocs] }
                : c
            );
            setClients(updatedClients);
            setSelectedClient(prev => prev ? { 
              ...prev, 
              documents: [...prev.documents, ...newDocs] 
            } : null);

            toast({ title: "✓ Documents Added", description: `${files.length} document(s) added to ${selectedClient.name}'s vault` });
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <DashboardNavigation />
      <main className="container mx-auto px-4 py-10 space-y-8">
        {/* Partner Header */}
        <section className="relative overflow-hidden rounded-xl border bg-card/80 backdrop-blur shadow-lg p-6">
          <div className="absolute inset-0 -z-10 opacity-20" style={{background:"var(--gradient-primary)"}} />
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl mb-1">Good day, {userName}</h1>
              <p className="text-lg">{firmName}</p>
              <p className="text-sm text-muted-foreground">
                Total AUM: R {(totalAUM / 1000000).toFixed(1)}M
              </p>
            </div>
            
            {/* Client Switcher */}
            <div className="flex items-center gap-4">
              <label className="text-sm text-muted-foreground">Current Client:</label>
              <Select 
                value={selectedClient?.id || ''} 
                onValueChange={(value) => {
                  if (value === 'add-new') {
                    setShowAddClientModal(true);
                  } else if (value === '') {
                    setSelectedClient(null);
                  } else {
                    const client = clients.find(c => c.id === value);
                    setSelectedClient(client || null);
                  }
                }}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="📊 All Clients Overview" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">📊 All Clients Overview</SelectItem>
                  <SelectItem value="add-new">➕ Add New Client</SelectItem>
                  {clients.map(client => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - R{(client.netWorth / 1000000).toFixed(1)}M
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Client Management */}
        <section className="rounded-xl border bg-card/80 backdrop-blur p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Client Portfolio</h2>
            <Button onClick={() => setShowAddClientModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {clients.length} Clients
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {totalTrusts} Active Trusts
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                {totalDocuments} Documents
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Client Distribution</p>
                    <p className="text-lg font-bold">{clients.length} Active</p>
                  </div>
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">AUM Growth</p>
                    <p className="text-lg font-bold text-success">+15.2%</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Service Breakdown</p>
                    <p className="text-lg font-bold">Mixed Portfolio</p>
                  </div>
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overview Charts */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <WealthGrowthChart />
            <AssetAllocationChart />
            <DebtAllocationChart />
          </div>

          {/* Client Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Client Name</th>
                  <th className="text-left py-3 px-4 font-medium">Net Worth</th>
                  <th className="text-left py-3 px-4 font-medium">Services</th>
                  <th className="text-left py-3 px-4 font-medium">Last Updated</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">R {client.netWorth.toLocaleString()}</p>
                        <p className="text-sm text-success">+{client.monthlyChange}%</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {client.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {client.services.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{client.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {new Date(client.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => switchToClient(client.id)}
                        >
                          Manage
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Add New Client Modal */}
      <Dialog open={showAddClientModal} onOpenChange={setShowAddClientModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={newClient.firstName}
                  onChange={(e) => setNewClient(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={newClient.lastName}
                  onChange={(e) => setNewClient(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="client@example.com"
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="netWorth">Estimated Net Worth (ZAR)</Label>
                <Input
                  id="netWorth"
                  type="number"
                  value={newClient.netWorth}
                  onChange={(e) => setNewClient(prev => ({ ...prev, netWorth: e.target.value }))}
                  placeholder="5000000"
                />
              </div>
              
              <div>
                <Label htmlFor="primaryService">Primary Service Needed</Label>
                <Select 
                  value={newClient.primaryService} 
                  onValueChange={(value) => setNewClient(prev => ({ ...prev, primaryService: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Trust Planning">Trust Planning</SelectItem>
                    <SelectItem value="Will Drafting">Will Drafting</SelectItem>
                    <SelectItem value="Estate Administration">Estate Administration</SelectItem>
                    <SelectItem value="Tax Planning">Tax Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Initial Notes</Label>
              <Textarea
                id="notes"
                value={newClient.notes}
                onChange={(e) => setNewClient(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any important information about this client..."
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowAddClientModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClient}>
                Add Client
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnerDashboard;
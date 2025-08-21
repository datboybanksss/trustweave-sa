import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Image, 
  Trash2, 
  Download, 
  Eye, 
  Search,
  Bitcoin,
  Shield,
  AlertTriangle,
  ExternalLink
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  category: 'asset' | 'identity' | 'debt';
  subCategory: string;
  uploadDate: string;
  size: string;
  type: string;
  extractedValue?: number;
  verificationStatus?: 'verified' | 'pending' | 'unverified';
  cryptoData?: {
    walletAddress: string;
    amount: number;
    currency: string;
    zarValue: number;
    blockchain: string;
  };
  // Additional crypto properties
  cryptoType?: 'bitcoin' | 'ethereum' | 'other';
  walletType?: 'exchange' | 'cold' | 'hot';
  exchangeName?: string;
  kycStatus?: 'verified' | 'pending' | 'unverified';
  cryptoAmount?: number;
  cryptoCurrency?: string;
  blockchainNetwork?: string;
  ownershipProof?: string;
  lastTransactionDate?: string;
  blockchainExplorerUrl?: string;
}

interface DocumentsListProps {
  documents: Document[];
  onDelete: (id: string) => void;
  onView: (document: Document) => void;
}

export const DocumentsList = ({ documents, onDelete, onView }: DocumentsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");

  const filteredDocuments = documents
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subCategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(doc => filterCategory === "all" || doc.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "value":
          return (b.extractedValue || 0) - (a.extractedValue || 0);
        case "date":
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

  const groupedDocuments = filteredDocuments.reduce((groups, doc) => {
    const key = doc.category;
    if (!groups[key]) groups[key] = [];
    groups[key].push(doc);
    return groups;
  }, {} as Record<string, Document[]>);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const getVerificationBadge = (status?: string) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default" className="bg-crypto-verified text-white">✓ KYC Verified</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-crypto-pending text-white">⚠ Pending Verification</Badge>;
      case 'unverified':
        return <Badge variant="destructive">✗ Unverified</Badge>;
      default:
        return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'asset': return 'Asset Documents';
      case 'identity': return 'Identity Documents';
      case 'debt': return 'Debt Documents';
      default: return category;
    }
  };

  const truncateAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="asset">Asset Documents</SelectItem>
            <SelectItem value="identity">Identity Documents</SelectItem>
            <SelectItem value="debt">Debt Documents</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Upload Date</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="value">Value</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {Object.entries(groupedDocuments).map(([category, docs]) => (
        <Card key={category} className="bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{getCategoryLabel(category)}</span>
              <Badge variant="secondary">{docs.length} documents</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {docs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                  {doc.cryptoData ? (
                    // Crypto Holdings Card
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        <Bitcoin className="h-5 w-5 text-bitcoin" />
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {doc.cryptoData.currency} Holdings
                            {getVerificationBadge(doc.verificationStatus)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {truncateAddress(doc.cryptoData.walletAddress)} • {doc.cryptoData.blockchain}
                          </div>
                          <div className="text-sm font-medium">
                            {doc.cryptoData.amount} {doc.cryptoData.currency} ≈ R {doc.cryptoData.zarValue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular Document Card
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {doc.subCategory} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                        {doc.extractedValue && (
                          <div className="text-sm font-medium text-success">
                            Value: R {doc.extractedValue.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {doc.cryptoData && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://blockchair.com/${doc.cryptoData?.blockchain.toLowerCase()}/address/${doc.cryptoData?.walletAddress}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(doc)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {!doc.cryptoData && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          // Simulate download
                          const link = document.createElement('a');
                          link.href = '#';
                          link.download = doc.name;
                          link.click();
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(doc.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredDocuments.length === 0 && (
        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterCategory !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Upload your first document to get started"
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
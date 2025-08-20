import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, Upload, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CryptoVerificationPanel } from "./CryptoVerificationPanel";

interface DocumentUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (files: File[], category: string, subCategory: string, cryptoData?: any) => void;
}

const documentCategories = {
  asset: {
    label: "Asset Documents",
    subCategories: [
      "Property valuations",
      "Investment statements", 
      "Bank statements",
      "Vehicle valuations",
      "Business valuation forms",
      "Company financial statements",
      "Share certificates",
      "Cryptocurrency holdings"
    ]
  },
  identity: {
    label: "Identity Documents",
    subCategories: [
      "Trustee ID documents",
      "Beneficiary ID documents", 
      "Company registration documents",
      "Trust deeds",
      "Marriage certificates"
    ]
  },
  debt: {
    label: "Debt Documents",
    subCategories: [
      "Home mortgage statements",
      "Vehicle finance agreements",
      "Cell phone contracts", 
      "Credit card statements",
      "Personal loan agreements",
      "Business loans",
      "Other debt obligations"
    ]
  }
};

export const DocumentUploadModal = ({ open, onOpenChange, onUpload }: DocumentUploadModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [category, setCategory] = useState<string>("");
  const [subCategory, setSubCategory] = useState<string>("");
  const [showCryptoVerification, setShowCryptoVerification] = useState(false);
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubCategoryChange = (value: string) => {
    setSubCategory(value);
    setShowCryptoVerification(value === "Cryptocurrency holdings");
  };

  const handleUpload = async () => {
    if (!category || !subCategory) {
      toast({ title: "Error", description: "Please select a category and sub-category" });
      return;
    }

    if (showCryptoVerification && !cryptoData) {
      toast({ title: "Error", description: "Please complete crypto verification" });
      return;
    }

    if (selectedFiles.length === 0 && !showCryptoVerification) {
      toast({ title: "Error", description: "Please select files to upload" });
      return;
    }

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    onUpload(selectedFiles, category, subCategory, cryptoData);
    
    // Reset form
    setSelectedFiles([]);
    setCategory("");
    setSubCategory("");
    setShowCryptoVerification(false);
    setCryptoData(null);
    setUploadProgress(0);
    
    toast({ 
      title: "✓ Upload Successful", 
      description: `${selectedFiles.length} document(s) uploaded successfully` 
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileUp className="h-5 w-5" />
            Upload Documents
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Document Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(documentCategories).map(([key, cat]) => (
                    <SelectItem key={key} value={key}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subcategory">Sub-Category</Label>
              <Select value={subCategory} onValueChange={handleSubCategoryChange} disabled={!category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sub-category" />
                </SelectTrigger>
                <SelectContent>
                  {category && documentCategories[category as keyof typeof documentCategories]?.subCategories.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Crypto Verification Panel */}
          {showCryptoVerification && (
            <CryptoVerificationPanel
              onVerificationComplete={setCryptoData}
              onVerificationChange={(isValid) => console.log('Verification status:', isValid)}
            />
          )}

          {/* File Upload Area */}
          {!showCryptoVerification && (
            <div>
              <Label>Upload Files</Label>
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Drag and drop files here</p>
                <p className="text-muted-foreground mb-4">or click to browse</p>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.doc,.docx"
                />
                <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  Browse Files
                </Button>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  <Label>Selected Files ({selectedFiles.length})</Label>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploadProgress > 0 && uploadProgress < 100}>
              {uploadProgress > 0 && uploadProgress < 100 ? "Uploading..." : "Upload Documents"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
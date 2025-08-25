import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { DemoClient } from "@/lib/partnerDemo";

interface PdfReportPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  client: DemoClient;
}

export const PdfReportPreview = ({ isOpen, onClose, client }: PdfReportPreviewProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = () => {
    setIsGenerating(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger actual PDF download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${client.name.replace(/\s+/g, '_')}_wealth_report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2000);
  };

  const currentDate = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const assets = client.documents.filter(d => d.category === 'asset');
  const debts = client.documents.filter(d => d.category === 'debt');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Wealth Report Preview - {client.name}
          </DialogTitle>
        </DialogHeader>

        {/* PDF Preview Content */}
        <div className="bg-white text-black p-8 border rounded-lg shadow-inner">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Legacy Vault 🌳</h1>
            <h2 className="text-xl font-semibold mb-1">Wealth Summary Report</h2>
            <p className="text-gray-600">{client.name}</p>
            <p className="text-sm text-gray-500">{currentDate}</p>
          </div>

          <Separator className="mb-6" />

          {/* Executive Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Net Worth</p>
                    <p className="text-2xl font-bold text-green-600">
                      R {client.netWorth.toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Compliance Score</p>
                    <p className="text-2xl font-bold text-blue-600">{client.compliance}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Asset Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Asset Portfolio</h3>
            <div className="space-y-2">
              {assets.map((asset, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{asset.name}</span>
                  <span className="text-green-600 font-semibold">
                    R {asset.value.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 bg-green-50 rounded font-semibold">
                <span>Total Assets</span>
                <span className="text-green-600">R {client.totalAssets.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Debt Breakdown */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Outstanding Debts</h3>
            <div className="space-y-2">
              {debts.map((debt, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{debt.name}</span>
                  <span className="text-red-600 font-semibold">
                    R {debt.value.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center p-3 bg-red-50 rounded font-semibold">
                <span>Total Debts</span>
                <span className="text-red-600">R {client.totalDebts.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Trust Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Trust Structures</h3>
            <div className="space-y-2">
              {client.trusts.map((trust, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{trust.name}</span>
                    <span className="text-blue-600 font-semibold">
                      R {trust.value.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {trust.beneficiaries} beneficiaries
                  </p>
                </div>
              ))}
              {client.trusts.length === 0 && (
                <p className="text-gray-500 italic">No trust structures currently established</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <Separator className="my-6" />
          <div className="text-center text-sm text-gray-500">
            <p>This report was generated on {currentDate}</p>
            <p>Legacy Vault - Protecting Your Future</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button 
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating PDF..." : "Download PDF"}
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
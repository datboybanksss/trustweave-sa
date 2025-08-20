import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUp, Shield, AlertTriangle, Bitcoin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CryptoVerificationPanelProps {
  onVerificationComplete: (data: any) => void;
  onVerificationChange: (isValid: boolean) => void;
}

interface CryptoFormData {
  walletAddress: string;
  blockchain: string;
  walletType: string;
  exchangeName?: string;
  kycStatus?: string;
  cryptoAmount: number;
  cryptoCurrency: string;
  currentValueZAR: number;
  lastTransactionDate: string;
  legalConfirmation: boolean;
  digitalSignature: string;
}

const blockchains = [
  "Bitcoin", "Ethereum", "Binance Smart Chain", "Polygon", "Solana", "Other"
];

const exchanges = [
  "Luno", "VALR", "Binance", "Coinbase", "Kraken", "Other"
];

const cryptoCurrencies = [
  "BTC", "ETH", "USDT", "USDC", "BNB", "SOL", "ADA", "DOT", "Other"
];

export const CryptoVerificationPanel = ({ onVerificationComplete, onVerificationChange }: CryptoVerificationPanelProps) => {
  const [step, setStep] = useState(1);
  const [proofFiles, setProofFiles] = useState<File[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const { register, watch, setValue, handleSubmit, formState: { errors, isValid } } = useForm<CryptoFormData>({
    mode: "onChange"
  });

  const watchWalletType = watch("walletType");
  const watchLegalConfirmation = watch("legalConfirmation");

  const validateWalletAddress = (address: string) => {
    // Basic validation for common wallet formats
    if (!address) return "Wallet address is required";
    if (address.length < 20) return "Invalid wallet address format";
    
    // Bitcoin address validation (simplified)
    if (address.startsWith('1') || address.startsWith('3') || address.startsWith('bc1')) {
      return true;
    }
    
    // Ethereum address validation (simplified)
    if (address.startsWith('0x') && address.length === 42) {
      return true;
    }
    
    return "Please enter a valid wallet address";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setProofFiles(files);
  };

  const onSubmit = async (data: CryptoFormData) => {
    setIsVerifying(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const verificationData = {
      ...data,
      proofFiles,
      verificationStatus: "pending",
      submittedAt: new Date().toISOString(),
      estimatedVerificationTime: "24 hours"
    };

    onVerificationComplete(verificationData);
    setIsVerifying(false);
    
    toast({
      title: "✓ Crypto Verification Submitted",
      description: "Your cryptocurrency holdings will be verified within 24 hours"
    });
  };

  return (
    <Card className="border-bitcoin/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bitcoin className="h-5 w-5 text-bitcoin" />
          Verify Your Cryptocurrency Holdings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          To ensure accurate wealth reporting, we require wallet verification
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Wallet Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <h3 className="font-semibold">Wallet Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="walletAddress">Wallet Address *</Label>
                <Input
                  {...register("walletAddress", { 
                    required: "Wallet address is required",
                    validate: validateWalletAddress
                  })}
                  placeholder="Enter your wallet address (e.g., 1A2B3C4D5E6F...)"
                  className="font-mono text-sm"
                />
                {errors.walletAddress && (
                  <p className="text-sm text-destructive mt-1">{errors.walletAddress.message}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  BTC, ETH, or other supported wallet addresses
                </p>
              </div>

              <div>
                <Label htmlFor="blockchain">Blockchain Network *</Label>
                <Select onValueChange={(value) => setValue("blockchain", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {blockchains.map((blockchain) => (
                      <SelectItem key={blockchain} value={blockchain}>
                        {blockchain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Wallet Type *</Label>
              <RadioGroup 
                onValueChange={(value) => setValue("walletType", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hot-wallet" id="hot-wallet" />
                  <Label htmlFor="hot-wallet" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-success" />
                    Hot Wallet (Exchange - KYC Verified)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cold-wallet" id="cold-wallet" />
                  <Label htmlFor="cold-wallet" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Cold Wallet (Hardware/Personal)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exchange-account" id="exchange-account" />
                  <Label htmlFor="exchange-account" className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-success" />
                    Exchange Account (Centralized)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Step 2: KYC/Proof */}
          {watchWalletType && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
                <h3 className="font-semibold">
                  {(watchWalletType === "hot-wallet" || watchWalletType === "exchange-account") 
                    ? "KYC Verification" 
                    : "Ownership Proof"}
                </h3>
              </div>

              {(watchWalletType === "hot-wallet" || watchWalletType === "exchange-account") && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="exchangeName">Exchange Name *</Label>
                    <Select onValueChange={(value) => setValue("exchangeName", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exchange" />
                      </SelectTrigger>
                      <SelectContent>
                        {exchanges.map((exchange) => (
                          <SelectItem key={exchange} value={exchange}>
                            {exchange}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>KYC Verification Status *</Label>
                    <RadioGroup 
                      onValueChange={(value) => setValue("kycStatus", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fully-verified" id="fully-verified" />
                        <Label htmlFor="fully-verified" className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-success" />
                          Fully KYC Verified
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="basic-kyc" id="basic-kyc" />
                        <Label htmlFor="basic-kyc" className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-crypto-pending" />
                          Basic KYC Only
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no-kyc" id="no-kyc" />
                        <Label htmlFor="no-kyc" className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          No KYC
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="account-screenshot">Account Screenshot Upload</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload screenshot showing your account name and wallet address
                    </p>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <Input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                        id="proof-upload"
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => document.getElementById('proof-upload')?.click()}
                      >
                        Upload Screenshot
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {watchWalletType === "cold-wallet" && (
                <div className="space-y-4">
                  <div>
                    <Label>Ownership Proof *</Label>
                    <RadioGroup 
                      onValueChange={(value) => setValue("kycStatus", value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transaction-history" id="transaction-history" />
                        <Label htmlFor="transaction-history">Transaction history export</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="signed-message" id="signed-message" />
                        <Label htmlFor="signed-message">Signed message from wallet</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wallet-screenshot" id="wallet-screenshot" />
                        <Label htmlFor="wallet-screenshot">Screenshot of wallet interface</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public-key" id="public-key" />
                        <Label htmlFor="public-key">Public key certificate</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="proof-upload">Upload Proof Document</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                      <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <Input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.txt"
                        className="hidden"
                        id="cold-proof-upload"
                      />
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => document.getElementById('cold-proof-upload')?.click()}
                      >
                        Upload Proof
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Holdings Declaration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
              <h3 className="font-semibold">Holdings Declaration</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="cryptoAmount">Amount *</Label>
                <Input
                  {...register("cryptoAmount", { 
                    required: "Amount is required",
                    min: { value: 0.00000001, message: "Amount must be greater than 0" }
                  })}
                  type="number"
                  step="0.00000001"
                  placeholder="0.00000000"
                />
              </div>

              <div>
                <Label htmlFor="cryptoCurrency">Currency *</Label>
                <Select onValueChange={(value) => setValue("cryptoCurrency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoCurrencies.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currentValueZAR">Value in ZAR *</Label>
                <Input
                  {...register("currentValueZAR", { 
                    required: "ZAR value is required",
                    min: { value: 1, message: "Value must be greater than 0" }
                  })}
                  type="number"
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll verify this against current market rates
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="lastTransactionDate">Last Transaction Date</Label>
              <Input
                {...register("lastTransactionDate")}
                type="date"
              />
              <p className="text-xs text-muted-foreground mt-1">
                When did you last transact with this wallet?
              </p>
            </div>
          </div>

          {/* Step 4: Legal Declaration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
              <h3 className="font-semibold">Verification Statement</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg">
                <Checkbox
                  id="legal-confirmation"
                  onCheckedChange={(checked) => setValue("legalConfirmation", checked as boolean)}
                />
                <div className="space-y-2">
                  <Label htmlFor="legal-confirmation" className="text-sm leading-relaxed">
                    I hereby confirm that I am the legal owner of this wallet address and the cryptocurrency holdings declared. I understand that false declarations may result in legal action and account termination.
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="digitalSignature">Digital Signature *</Label>
                <Input
                  {...register("digitalSignature", { 
                    required: "Digital signature is required" 
                  })}
                  placeholder="Type your full legal name as signature"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Date/Time: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={!watchLegalConfirmation || isVerifying}
              className="min-w-32"
            >
              {isVerifying ? "Submitting..." : "Submit for Verification"}
            </Button>
          </div>
        </form>

        {/* File List */}
        {proofFiles.length > 0 && (
          <div className="mt-4">
            <Label>Uploaded Files ({proofFiles.length})</Label>
            <div className="space-y-2 mt-2">
              {proofFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                  <span className="truncate">{file.name}</span>
                  <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
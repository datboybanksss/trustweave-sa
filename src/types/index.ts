export interface Document {
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
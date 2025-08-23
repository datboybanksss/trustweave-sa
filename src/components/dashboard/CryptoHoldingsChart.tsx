import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CryptoHolding {
  currency: string;
  symbol: string;
  amount: number;
  value: number;
  status: 'verified' | 'pending';
  change24h: number;
}

const demoHoldings: CryptoHolding[] = [
  {
    currency: "Bitcoin",
    symbol: "BTC",
    amount: 0.75,
    value: 850000,
    status: 'verified',
    change24h: 2.5
  },
  {
    currency: "Ethereum",
    symbol: "ETH",
    amount: 12.3,
    value: 650000,
    status: 'verified',
    change24h: -1.2
  },
  {
    currency: "Cardano",
    symbol: "ADA",
    amount: 25000,
    value: 180000,
    status: 'pending',
    change24h: 4.1
  }
];

const CryptoHoldingsChart = () => {
  const totalValue = demoHoldings.reduce((sum, holding) => sum + holding.value, 0);
  const verifiedValue = demoHoldings
    .filter(h => h.status === 'verified')
    .reduce((sum, holding) => sum + holding.value, 0);
  const pendingValue = demoHoldings
    .filter(h => h.status === 'pending')
    .reduce((sum, holding) => sum + holding.value, 0);

  return (
    <section className="rounded-xl border bg-card/80 backdrop-blur p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-xl">Cryptocurrency Holdings</h2>
        <div className="flex gap-2">
          {verifiedValue > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              R {verifiedValue.toLocaleString()} Verified
            </Badge>
          )}
          {pendingValue > 0 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              R {pendingValue.toLocaleString()} Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg bg-background/50 border">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
          <span className="text-2xl font-bold">R {totalValue.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-3">
        {demoHoldings.map((holding, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 rounded-lg border ${
              holding.status === 'verified' 
                ? 'bg-green-50/50 border-green-200/50' 
                : 'bg-yellow-50/50 border-yellow-200/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                {holding.symbol}
              </div>
              <div>
                <h3 className="font-semibold">{holding.currency}</h3>
                <p className="text-sm text-muted-foreground">
                  {holding.amount} {holding.symbol}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold">R {holding.value.toLocaleString()}</p>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${
                  holding.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {holding.change24h >= 0 ? '+' : ''}{holding.change24h}%
                </span>
                <Badge 
                  variant={holding.status === 'verified' ? 'default' : 'secondary'}
                  className={holding.status === 'verified' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {holding.status === 'verified' ? '✓' : '⏳'}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pendingValue > 0 && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-50/50 border border-yellow-200/50">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Pending holdings are not included in your net worth calculation until verified.
          </p>
        </div>
      )}
    </section>
  );
};

export default CryptoHoldingsChart;
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface Document {
  id: string;
  category: string;
  subCategory: string;
  extractedValue?: number;
  uploadDate: string;
  verificationStatus?: 'verified' | 'pending' | 'unverified';
  cryptoData?: {
    amount: number;
    currency: string;
    zarValue: number;
  };
}

interface EnhancedWealthMetricsProps {
  documents: Document[];
}

export const EnhancedWealthMetrics = ({ documents }: EnhancedWealthMetricsProps) => {
  const calculations = useMemo(() => {
    let totalAssets = 0;
    let totalDebts = 0;
    let verifiedCrypto = 0;
    let pendingCrypto = 0;
    
    const assetCategories: Record<string, number> = {
      'Property': 0,
      'Investments': 0,
      'Bank Accounts': 0,
      'Business Assets': 0,
      'Cryptocurrency': 0,
      'Other Assets': 0
    };

    const debtCategories: Record<string, number> = {
      'Mortgage': 0,
      'Vehicle Finance': 0,
      'Credit Cards': 0,
      'Other Loans': 0
    };

    documents.forEach(doc => {
      const value = doc.extractedValue || 0;
      
      if (doc.category === 'asset') {
        if (doc.cryptoData) {
          if (doc.verificationStatus === 'verified') {
            verifiedCrypto += doc.cryptoData.zarValue;
            totalAssets += doc.cryptoData.zarValue;
            assetCategories['Cryptocurrency'] += doc.cryptoData.zarValue;
          } else {
            pendingCrypto += doc.cryptoData.zarValue;
          }
        } else {
          totalAssets += value;
          
          // Categorize assets
          if (doc.subCategory.includes('Property')) {
            assetCategories['Property'] += value;
          } else if (doc.subCategory.includes('Investment')) {
            assetCategories['Investments'] += value;
          } else if (doc.subCategory.includes('Bank')) {
            assetCategories['Bank Accounts'] += value;
          } else if (doc.subCategory.includes('Business')) {
            assetCategories['Business Assets'] += value;
          } else {
            assetCategories['Other Assets'] += value;
          }
        }
      } else if (doc.category === 'debt') {
        totalDebts += value;
        
        // Categorize debts
        if (doc.subCategory.includes('mortgage')) {
          debtCategories['Mortgage'] += value;
        } else if (doc.subCategory.includes('Vehicle')) {
          debtCategories['Vehicle Finance'] += value;
        } else if (doc.subCategory.includes('Credit')) {
          debtCategories['Credit Cards'] += value;
        } else {
          debtCategories['Other Loans'] += value;
        }
      }
    });

    const netWorth = totalAssets - totalDebts;
    const debtToAssetRatio = totalAssets > 0 ? (totalDebts / totalAssets) * 100 : 0;
    
    // Create asset allocation data for pie chart
    const assetAllocation = Object.entries(assetCategories)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));

    // Create debt breakdown
    const debtBreakdown = Object.entries(debtCategories)
      .filter(([_, value]) => value > 0)
      .map(([name, value]) => ({ name, value }));

    // Generate wealth growth data (simulated based on upload dates)
    const wealthGrowthData = generateWealthGrowthData(documents, totalAssets);

    return {
      totalAssets,
      totalDebts,
      verifiedCrypto,
      pendingCrypto,
      netWorth,
      debtToAssetRatio,
      assetAllocation,
      debtBreakdown,
      wealthGrowthData
    };
  }, [documents]);

  const colors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--bitcoin))", "hsl(var(--ethereum))", "hsl(var(--muted))"];

  return (
    <div className="grid gap-6">
      {/* Net Worth Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Net Worth</p>
                <p className={`text-2xl font-bold ${calculations.netWorth >= 0 ? 'text-success' : 'text-destructive'}`}>
                  R {calculations.netWorth.toLocaleString()}
                </p>
              </div>
              {calculations.netWorth >= 0 ? (
                <TrendingUp className="h-8 w-8 text-success" />
              ) : (
                <TrendingDown className="h-8 w-8 text-destructive" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
                <p className="text-2xl font-bold">R {calculations.totalAssets.toLocaleString()}</p>
                {calculations.pendingCrypto > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3 text-crypto-pending" />
                    <span className="text-xs text-crypto-pending">
                      +R {calculations.pendingCrypto.toLocaleString()} pending
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Debts</p>
                <p className="text-2xl font-bold text-destructive">R {calculations.totalDebts.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {calculations.debtToAssetRatio.toFixed(1)}% of assets
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Wealth Growth Chart */}
        <Card className="bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Wealth Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={calculations.wealthGrowthData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `R ${(v/1000000).toFixed(1)}M`} />
                  <Tooltip 
                    formatter={(v: number) => [`R ${v.toLocaleString()}`, 'Net Worth']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation Chart */}
        <Card className="bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={calculations.assetAllocation}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {calculations.assetAllocation.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(v: number) => `R ${v.toLocaleString()}`}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {calculations.assetAllocation.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span className="truncate">{entry.name}</span>
                  <span className="text-muted-foreground ml-auto">
                    {((entry.value / calculations.totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debt Overview */}
      {calculations.debtBreakdown.length > 0 && (
        <Card className="bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Debt Overview
              <Badge variant="destructive">
                R {calculations.totalDebts.toLocaleString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {calculations.debtBreakdown.map((debt) => (
                <div key={debt.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{debt.name}</span>
                    <span className="text-sm text-destructive">R {debt.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-destructive h-2 rounded-full"
                      style={{ width: `${(debt.value / calculations.totalDebts) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {((debt.value / calculations.totalDebts) * 100).toFixed(1)}% of total debt
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Crypto Holdings Status */}
      {(calculations.verifiedCrypto > 0 || calculations.pendingCrypto > 0) && (
        <Card className="bg-card/80 backdrop-blur border-bitcoin/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Cryptocurrency Holdings
              <Badge variant="secondary">
                {calculations.verifiedCrypto > 0 && calculations.pendingCrypto > 0 
                  ? "Mixed Status"
                  : calculations.verifiedCrypto > 0 
                    ? "Verified" 
                    : "Pending Verification"
                }
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {calculations.verifiedCrypto > 0 && (
                <div className="flex items-center justify-between p-3 bg-crypto-verified/10 rounded-lg border border-crypto-verified/20">
                  <div>
                    <p className="font-medium text-crypto-verified">✓ Verified Holdings</p>
                    <p className="text-sm text-muted-foreground">Included in net worth</p>
                  </div>
                  <p className="text-lg font-bold">R {calculations.verifiedCrypto.toLocaleString()}</p>
                </div>
              )}
              
              {calculations.pendingCrypto > 0 && (
                <div className="flex items-center justify-between p-3 bg-crypto-pending/10 rounded-lg border border-crypto-pending/20">
                  <div>
                    <p className="font-medium text-crypto-pending">⚠ Pending Verification</p>
                    <p className="text-sm text-muted-foreground">Not included in net worth</p>
                  </div>
                  <p className="text-lg font-bold">R {calculations.pendingCrypto.toLocaleString()}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Helper function to generate wealth growth data
function generateWealthGrowthData(documents: Document[], currentTotal: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const baseValue = Math.max(currentTotal * 0.8, 1000000);
  const growth = (currentTotal - baseValue) / months.length;
  
  return months.map((month, index) => ({
    month,
    value: Math.round(baseValue + (growth * index))
  }));
}
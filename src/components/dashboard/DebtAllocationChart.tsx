const debts = [
  { name: "Home Mortgage", amount: 1200000, rate: "7.5%", term: "20 years", status: "Current" },
  { name: "Vehicle Finance", amount: 300000, rate: "12.0%", term: "5 years", status: "Current" },
  { name: "Credit Cards", amount: 100000, rate: "18.5%", term: "Revolving", status: "Current" },
];

const DebtAllocationChart = () => (
  <section className="rounded-xl border bg-card/80 backdrop-blur p-6">
    <h2 className="font-display text-xl mb-4">Your Current Debts</h2>
    <div className="space-y-4">
      {debts.map((debt, index) => (
        <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{debt.name}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span>Rate: {debt.rate}</span>
              <span>Term: {debt.term}</span>
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                {debt.status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg text-destructive">
              R {debt.amount.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Total Debt:</span>
          <span className="text-xl font-bold text-destructive">
            R {debts.reduce((sum, debt) => sum + debt.amount, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  </section>
);
export default DebtAllocationChart;
interface Props {
  totalSales: number;
  profitLoss: number;
  closingCash: number;
}

export default function SummaryCard({
  totalSales,
  profitLoss,
  closingCash,
}: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>Total Sales: ₹{totalSales}</h3>
      <h3 style={{ color: profitLoss >= 0 ? "green" : "red" }}>
        {profitLoss >= 0 ? "Profit" : "Loss"}: ₹{profitLoss}
      </h3>
      <h3>Closing Cash: ₹{closingCash}</h3>
    </div>
  );
}
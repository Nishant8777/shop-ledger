import type { LedgerEntry } from "../types/LedgerEntry";

interface Props {
  entries: LedgerEntry[];
  onDelete: (date: string) => void;
}

export default function HistoryList({ entries, onDelete }: Props) {
  return (
    <div style={{ marginTop: 30 }}>
      <h3>History</h3>

      {entries.length === 0 && <p>No entries yet</p>}

      {entries.map((entry) => (
        <div
          key={entry.date}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 12,
            borderRadius: 8,
            background: "#f9f9f9"
          }}
        >
          <strong>{entry.date}</strong>

          <p>Total Sales: ₹{entry.totalSales}</p>
          <p>Profit/Loss: ₹{entry.profitLoss}</p>
          <p>Closing Cash: ₹{entry.closingCash}</p>

          <button
            onClick={() => onDelete(entry.date)}
            style={{
              marginTop: 8,
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
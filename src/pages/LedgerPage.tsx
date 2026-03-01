import { useEffect, useState } from "react";
import type { LedgerEntry } from "../types/LedgerEntry";
import { getLedgerData, saveLedgerData } from "../utils/storage";
import { exportToExcel } from "../utils/exportExcel";
import SummaryCard from "../components/SummaryCard";
import HistoryList from "../components/HistoryList";

/* Section Component */
function Section({ title, children }: any) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{ marginBottom: 5 }}>{title}</h3>
      {children}
    </div>
  );
}

export default function LedgerPage() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    setEntries(getLedgerData());
  }, []);

  useEffect(() => {
    saveLedgerData(entries);
  }, [entries]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "date" ? value : Number(value),
    });
  };

  const totalSales =
    (form.cashSales || 0) +
    (form.upiSales || 0) +
    (form.creditSales || 0);

  const totalExpenses =
    (form.personalExpense || 0) +
    (form.businessExpense || 0) +
    (form.otherExpense || 0);

  const profitLoss = totalSales - totalExpenses;

  const closingCash =
    (form.openingBalance || 0) +
    (form.cashSales || 0) +
    (form.upiSales || 0) -
    totalExpenses;

  const saveEntry = () => {
    if (!form.date) return alert("Please select date");

    const newEntry: LedgerEntry = {
      ...form,
      totalSales,
      totalExpenses,
      profitLoss,
      closingCash,
    };

    const filtered = entries.filter((e) => e.date !== form.date);
    setEntries([...filtered, newEntry]);

    alert("Saved Successfully");
    setForm({});
  };

  const deleteEntry = (date: string) => {
    const updated = entries.filter((entry) => entry.date !== date);
    setEntries(updated);
  };

  const input = {
    width: "100%",
    padding: "10px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const button = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  };

  return (
    <div>
      <input
        type="date"
        name="date"
        value={form.date || ""}
        onChange={handleChange}
        style={input}
      />

      <Section title="Opening">
        <input
          name="openingBalance"
          placeholder="Opening Balance"
          value={form.openingBalance || ""}
          onChange={handleChange}
          style={input}
        />
      </Section>

      <Section title="Sales">
        <input
          name="cashSales"
          placeholder="Cash Sales"
          value={form.cashSales || ""}
          onChange={handleChange}
          style={input}
        />

        <input
          name="upiSales"
          placeholder="UPI Sales"
          value={form.upiSales || ""}
          onChange={handleChange}
          style={input}
        />

        <input
          name="creditSales"
          placeholder="Credit Sales"
          value={form.creditSales || ""}
          onChange={handleChange}
          style={input}
        />
      </Section>

      <Section title="Expenses">
        <input
          name="personalExpense"
          placeholder="Personal Expense"
          value={form.personalExpense || ""}
          onChange={handleChange}
          style={input}
        />

        <input
          name="businessExpense"
          placeholder="Business Expense"
          value={form.businessExpense || ""}
          onChange={handleChange}
          style={input}
        />

        <input
          name="otherExpense"
          placeholder="Other Expense"
          value={form.otherExpense || ""}
          onChange={handleChange}
          style={input}
        />
      </Section>

      <SummaryCard
        totalSales={totalSales}
        profitLoss={profitLoss}
        closingCash={closingCash}
      />

      <button style={button} onClick={saveEntry}>
        Save Entry
      </button>

      <button
        style={{ ...button, backgroundColor: "#16a34a" }}
        onClick={() => exportToExcel(entries)}
      >
        Export Excel
      </button>

      <HistoryList entries={entries} onDelete={deleteEntry} />
    </div>
  );
}
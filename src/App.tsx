import { useState, useEffect } from "react";
import LedgerPage from "./pages/LedgerPage";
import EmployeeManager from "./components/EmployeeManager";
import Dashboard from "./pages/Dashboard";

import { getLedgerData, saveLedgerData } from "./utils/storage";
import type { LedgerEntry } from "./types/LedgerEntry";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [page, setPage] = useState<"ledger" | "employees" | "dashboard">("ledger");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* CENTRAL LEDGER DATA */

  const [entries, setEntries] = useState<LedgerEntry[]>([]);

  useEffect(() => {
    setEntries(getLedgerData());
  }, []);

  useEffect(() => {
    saveLedgerData(entries);
  }, [entries]);

  /* CENTRAL EMPLOYEE DATA */

  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("employees");
    if (data) setEmployees(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const input = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const button = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  };

  const navButton = {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  };

  const login = () => {
    if (username === "pawar vaishnav 08" && password === "changbhal@2582") {
      setIsLoggedIn(true);
    } else {
      alert("Wrong username or password");
    }
  };

  /* LOGIN SCREEN */

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button style={button} onClick={login}>
          Login
        </button>
      </div>
    );
  }

  /* MAIN APP */

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 20 }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
  <img src="/logo.jpeg" alt="The Health Corner" style={{ width: "220px" }} />
</div>
      {/* Navigation */}

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>

        <button
          onClick={() => setPage("ledger")}
          style={navButton}
        >
          Ledger
        </button>

        <button
          onClick={() => setPage("employees")}
          style={{ ...navButton, background: "#16a34a" }}
        >
          Employees
        </button>

        <button
          onClick={() => setPage("dashboard")}
          style={{ ...navButton, background: "#f59e0b" }}
        >
          Dashboard
        </button>

      </div>

      {/* PAGE SWITCH */}

      {page === "ledger" && (
        <LedgerPage
          entries={entries}
          setEntries={setEntries}
        />
      )}

      {page === "employees" && (
        <EmployeeManager
          employees={employees}
          setEmployees={setEmployees}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          entries={entries}
          employees={employees}
        />
      )}

    </div>
  );
}
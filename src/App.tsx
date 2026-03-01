import { useState } from "react";
import LedgerPage from "./pages/LedgerPage";
import EmployeeManager from "./components/EmployeeManager";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState<"ledger" | "employees">("ledger");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    marginTop: "15px",
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

  return (
    <div style={{ maxWidth: 420, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Shop Manager</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setPage("ledger")} style={button}>
          Ledger
        </button>

        <button
          onClick={() => setPage("employees")}
          style={{ ...button, background: "#16a34a" }}
        >
          Employees
        </button>
      </div>

      {page === "ledger" && <LedgerPage />}
      {page === "employees" && <EmployeeManager />}
    </div>
  );
}
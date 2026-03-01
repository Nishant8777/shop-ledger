import { useState, useEffect } from "react";

interface Employee {
  name: string;
  date: string;
  dailySalary: number;
  advance: number;
  penalty: number;
  rating: number;
  salary: number;
}

export default function EmployeeManager() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    const data = localStorage.getItem("employees");
    if (data) setEmployees(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "name" || name === "date" ? value : Number(value),
    });
  };

  const saveEmployee = () => {
    if (!form.name || !form.date) {
      alert("Enter employee name and date");
      return;
    }

    const salary =
      (form.dailySalary || 0) -
      (form.advance || 0) -
      (form.penalty || 0);

    const newEmployee: Employee = {
      ...form,
      salary,
    };

    setEmployees([...employees, newEmployee]);
    setForm({});
  };

  const deleteEmployee = (index: number) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
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
    marginTop: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>Employee Manager</h2>

      <input
        name="name"
        placeholder="Employee Name"
        value={form.name || ""}
        onChange={handleChange}
        style={input}
      />

      <input
        type="date"
        name="date"
        value={form.date || ""}
        onChange={handleChange}
        style={input}
      />

      <input
        name="dailySalary"
        placeholder="Daily Salary"
        value={form.dailySalary || ""}
        onChange={handleChange}
        style={input}
      />

      <input
        name="advance"
        placeholder="Advance Payment"
        value={form.advance || ""}
        onChange={handleChange}
        style={input}
      />

      <input
        name="penalty"
        placeholder="Penalty"
        value={form.penalty || ""}
        onChange={handleChange}
        style={input}
      />

      <input
        name="rating"
        placeholder="Rating (1-10)"
        value={form.rating || ""}
        onChange={handleChange}
        style={input}
      />

      <button style={button} onClick={saveEmployee}>
        Save Employee
      </button>

      <h3 style={{ marginTop: 30 }}>Employee Records</h3>

      {employees.map((emp, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginTop: 10,
            borderRadius: 8,
          }}
        >
          <strong>{emp.name}</strong>
          <p>Date: {emp.date}</p>
          <p>Daily Salary: ₹{emp.dailySalary}</p>
          <p>Advance: ₹{emp.advance}</p>
          <p>Penalty: ₹{emp.penalty}</p>
          <p>Rating: {emp.rating}/10</p>
          <p>
            <strong>Salary: ₹{emp.salary}</strong>
          </p>

          <button
            onClick={() => deleteEmployee(index)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
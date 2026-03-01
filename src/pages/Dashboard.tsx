import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export default function Dashboard({ entries, employees }: any) {

  /* TOTAL SUMMARY */

  const totalSales = entries.reduce(
    (sum: number, e: any) => sum + (e.totalSales || 0),
    0
  )

  const totalExpenses = entries.reduce(
    (sum: number, e: any) => sum + (e.totalExpenses || 0),
    0
  )

  const totalSalary = employees.reduce(
    (sum: number, emp: any) => sum + (emp.salary || 0),
    0
  )

  const netProfit = totalSales - totalExpenses - totalSalary

  /* DAILY PROFIT */

  const dailyData = entries.map((e: any) => ({
    date: e.date,
    profit: e.profitLoss
  }))

  /* MONTHLY PROFIT */

  const monthlyProfit: any = {}

  entries.forEach((e: any) => {

    const month = new Date(e.date).toLocaleString("default", {
      month: "short",
      year: "numeric"
    })

    if (!monthlyProfit[month]) {
      monthlyProfit[month] = 0
    }

    monthlyProfit[month] += e.profitLoss
  })

  const monthlyProfitData = Object.keys(monthlyProfit).map((month) => ({
    month,
    profit: monthlyProfit[month]
  }))

  /* MONTHLY EMPLOYEE SALARY */

  const monthlySalary: any = {}

  employees.forEach((emp: any) => {

    const month = new Date(emp.date).toLocaleString("default", {
      month: "short",
      year: "numeric"
    })

    if (!monthlySalary[month]) {
      monthlySalary[month] = 0
    }

    monthlySalary[month] += emp.salary
  })

  const monthlySalaryData = Object.keys(monthlySalary).map((month) => ({
    month,
    salary: monthlySalary[month]
  }))

  const card = {
    background: "#f3f4f6",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center" as const
  }

  return (
    <div style={{ marginTop: 20 }}>

      <h2 style={{ textAlign: "center" }}>Business Dashboard</h2>

      {/* MONTHLY SUMMARY */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginTop: 20
        }}
      >

        <div style={card}>
          <p>Total Sales</p>
          <h3>₹{totalSales}</h3>
        </div>

        <div style={card}>
          <p>Total Expenses</p>
          <h3>₹{totalExpenses}</h3>
        </div>

        <div style={card}>
          <p>Employee Salary</p>
          <h3>₹{totalSalary}</h3>
        </div>

        <div style={card}>
          <p>Net Profit</p>
          <h3>₹{netProfit}</h3>
        </div>

      </div>

      {/* DAILY PROFIT */}

      <h3 style={{ marginTop: 30 }}>Daily Profit</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={dailyData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="profit" />
        </BarChart>
      </ResponsiveContainer>

      {/* MONTHLY PROFIT */}

      <h3 style={{ marginTop: 30 }}>Monthly Profit</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlyProfitData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="profit" />
        </BarChart>
      </ResponsiveContainer>

      {/* MONTHLY EMPLOYEE SALARY */}

      <h3 style={{ marginTop: 30 }}>Monthly Employee Salary</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={monthlySalaryData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="salary" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  )
}
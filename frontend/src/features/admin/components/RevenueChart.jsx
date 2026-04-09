import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#9ca3af" }} />
        <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#4f46e5"
          strokeWidth={3}
          dot={{ r: 5, fill: "#4f46e5" }}
          activeDot={{ r: 7, fill: "#4f46e5" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
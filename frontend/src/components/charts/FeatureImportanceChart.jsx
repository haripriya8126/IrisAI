import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/** Feature importance from the Random Forest model */
export default function FeatureImportanceChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="card">
      <h3 className="font-display text-base font-semibold text-white">
        Feature importance
      </h3>
      <p className="mb-4 text-xs text-slate-400">
        Random Forest impurity-based importance
      </p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 48 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="feature"
              tick={{ fill: "#94a3b8", fontSize: 10 }}
              angle={-25}
              textAnchor="end"
              height={60}
              axisLine={{ stroke: "#475569" }}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#475569" }}
            />
            <Tooltip
              formatter={(value) => [value, "Importance"]}
              contentStyle={{
                background: "#1a2332",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="importance" fill="#a78bfa" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

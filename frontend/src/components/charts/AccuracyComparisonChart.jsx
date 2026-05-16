import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/** Compare test accuracy across Logistic Regression, Random Forest, and SVM */
export default function AccuracyComparisonChart({ data }) {
  if (!data?.length) return null;

  return (
    <div className="card">
      <h3 className="font-display text-base font-semibold text-white">
        Model accuracy comparison
      </h3>
      <p className="mb-4 text-xs text-slate-400">Test set accuracy (%)</p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={{ stroke: "#475569" }}
            />
            <YAxis
              type="category"
              dataKey="model"
              width={120}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#475569" }}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Accuracy"]}
              contentStyle={{
                background: "#1a2332",
                border: "1px solid #475569",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="accuracy" fill="#22d3ee" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

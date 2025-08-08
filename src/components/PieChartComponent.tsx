import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import type { dataProps } from "../pages/Analytics/ExpenditureAnalytics";


type Props = {
  chartData?: dataProps;
  handleBarClicked?: (filters: any) => void;
  title?: string;
};

const PieChartComponent = ({ chartData }: Props) => {

  return (
    <div
      style={{
        margin: "2rem",
        // height: 500,
        backgroundColor: "var(--hover-red-color)",
        padding: "1rem",
        alignSelf: "center",
      }}
    >
      <PieChart width={400} height={300}>
        <Pie
          data={chartData?.bar_chart_data}
          dataKey="y"
          nameKey="x"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ x, y, name, percent }) => (
            <text
              x={x}
              y={y}
              fill="black"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {`${name} (${percent ? (percent * 100).toFixed(0) : null}%)`}
            </text>
          )}
        >
          {chartData?.bar_chart_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            borderColor: "#ccc",
            color: "black",
          }}
          itemStyle={{ color: "black" }}
        />
        <Legend
          formatter={(value) => <span style={{ color: "black" }}>{`${value}`}</span>}
        />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import type { dataProps } from "../pages/Analytics/ExpenditureAnalytics";

type Props = {
  chartData?: dataProps;
  handleBarClicked: (filters: any) => void;
  title?: string;
};

const BarChartComponent = ({ chartData, handleBarClicked, title }: Props) => {
  const metadata = chartData?.metadata;
  const [ clickedIndex, setClickedIndex ] = useState<number>()

  function BarClicked(data: any, index: number) {
    if (metadata?.link_to) {
      setClickedIndex(index)
    }

    if (metadata?.link_to) {
      handleBarClicked({
        year: metadata.year,
        month: data.payload.x,
        category: data.payload.x,
        analytics_type: metadata?.link_to,
      });
    }
  }

  return (
    <div
      style={{
        margin: "2rem",
        backgroundColor: "var(--hover-red-color)",
        padding: "1rem",
      }}
    >
      <h2 style={{ margin: 0, marginBottom: '1rem', textAlign: 'center' }}>{title}</h2>
      <ResponsiveContainer height={500}>
        <BarChart data={chartData?.bar_chart_data}>
          <CartesianGrid strokeDasharray="3 3" stroke="grey" />
          <XAxis dataKey="x" stroke="black" />
          <YAxis tickFormatter={(val) => `₹${val}`} stroke="black" />
          <Tooltip formatter={(val) => `₹${val}`} />
          <Bar
            dataKey="y"
            onClick={BarClicked}
          >
            {chartData?.bar_chart_data.map((value, index) => (
              <Cell
              key={`bar-${index}`}
              fill={index === clickedIndex ? "black" : "#286cf3"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { dataProps } from "../pages/Analytics/ExpenditureAnalytics";

type Props = {
  chartData?: dataProps;
  handleBarClicked: (filters: any) => void;
};

const BarChartComponent = ({ chartData, handleBarClicked }: Props) => {
  const metadata = chartData?.metadata;

  function BarClicked(data: any) {
    if (metadata?.link_to) {
      handleBarClicked({
        year: metadata.year,
        month: data.payload.x,
        category: metadata.category,
        analytics_type: metadata?.link_to,
      });
    }
  }

  return (
    <div
      style={{
        margin: "2rem",
        height: 500,
        backgroundColor: "var(--hover-red-color)",
        padding: "1rem",
      }}
    >
      <ResponsiveContainer>
        <BarChart data={chartData?.bar_chart_data}>
          <CartesianGrid strokeDasharray="3 3" stroke="grey" />
          <XAxis dataKey="x" stroke="black" />
          <YAxis tickFormatter={(val) => `₹${val}`} stroke="black" />
          <Tooltip formatter={(val) => `₹${val}`} />
          <Bar
            dataKey="y"
            fill="#286cf3"
            onClick={(data) => BarClicked(data)}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;

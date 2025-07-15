import { useEffect, useState } from "react";
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
import PieChartComponent from "./PieChartComponent";


type Props = {
  chartData?: dataProps;
  handleBarClicked: (filters: any) => void;
  title?: string;
};

const BarChartComponent = ({ chartData, handleBarClicked, title }: Props) => {
  const metadata = chartData?.metadata;
  const [ clickedIndex, setClickedIndex ] = useState<number>()

  useEffect(() => {
    setClickedIndex(undefined)
  }, [chartData])

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
      <div style={{ display: 'flex' }}>
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
                fill={index === clickedIndex ? "#286cf3" : "#739ff5"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {!['Monthly Analysis'].includes(`${title}`) &&
          <div>
            <PieChartComponent chartData={chartData}/>
          </div>
        }
      </div>
    </div>
  );
};

export default BarChartComponent;

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from "recharts";
import type { dataProps } from "../pages/Analytics/ExpenditureAnalytics";
import PieChartComponent from "./PieChartComponent";


type Props = {
  chartData?: dataProps;
  handleBarClicked: (filters: any) => void;
  title?: string;
  symbol?: string;
  dynamicYAxisDomain?: boolean
};

const BarChartComponent = ({ chartData, handleBarClicked, title, symbol='₹', dynamicYAxisDomain=false }: Props) => {
  const metadata = chartData?.metadata;
  const [ clickedIndex, setClickedIndex ] = useState<number>()
  const [ yAxisDomain, setYaxisDomain ] = useState<number[]>()

  useEffect(() => {
    if (dynamicYAxisDomain) {
      let maxVal = 0

      chartData?.bar_chart_data.forEach((value) => {

        if (Math.abs(value.y) > maxVal) {
          maxVal = Math.abs(value.y)
        }
  
      })
      if (!maxVal) {
        maxVal = 500
      }
      setYaxisDomain([-1*maxVal, maxVal])
    }

  }, [chartData, dynamicYAxisDomain])

  useEffect(() => {
    setClickedIndex(undefined)
  }, [chartData])

  function BarClicked(data: any, index: number) {
    
    if (metadata?.link_to) {
      setClickedIndex(index);

      handleBarClicked({
        year: metadata.year,
        month: data.payload.x,
        category: data.payload.x,
        analytics_type: metadata?.link_to,
      });
    }
  }

  function formatLabel(val: any) {
    if (symbol == "%") {
      return `${val}%`
    }
    return `${symbol}${val}`
  }

  return (
    <div
      style={{
        margin: "2rem",
        backgroundColor: "var(--hover-red-color)",
        padding: "1rem",
      }}
    >
      <h2 style={{ margin: 0, marginBottom: '1rem', textAlign: 'center' }}>{title} ({symbol})</h2>
      <div style={{ display: 'flex' }}>
        <ResponsiveContainer height={500}>
          <BarChart data={chartData?.bar_chart_data}>
            <CartesianGrid strokeDasharray="3 3" stroke="grey" />
            <XAxis dataKey="x" stroke="black" />
            <YAxis stroke="black" domain={yAxisDomain}/>
            <Tooltip formatter={(val) => formatLabel(val)} />
            <ReferenceLine y={0} stroke="black" strokeWidth={2} />
            <Bar
              dataKey="y"
              onClick={BarClicked}
            >
              {chartData?.bar_chart_data.map((_, index) => (
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

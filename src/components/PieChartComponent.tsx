import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  {
    x: "Animal purchase",
    y: 120000.0,
    color: "#26C6DA",
  },
  {
    x: "Feed",
    y: 60000.0,
    color: "#EC407A",
  },
  {
    x: "Medicine",
    y: 30000.0,
    color: "#D4E157",
  },
  {
    x: "Dyper",
    y: 2000.0,
    color: "#D4E157",
  },
  {
    x: "Mat",
    y: 2600.0,
    color: "#D4E157",
  },
  {
    x: "Carpert",
    y: 10000.0,
    color: "#D4E157",
  },
  {
    x: "laptop",
    y: 67000.0,
    color: "#D4E157",
  },
];

const PieChartComponent = () => {
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
      <PieChart width={600} height={300}>
        <Pie
          data={data}
          dataKey="y"
          nameKey="x"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ x, y, name }) => (
            <text
              x={x}
              y={y}
              fill="black"
              textAnchor="middle"
              dominantBaseline="central"
            >
              {name}
            </text>
          )}
        >
          {data.map((entry, index) => (
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
          wrapperStyle={{ color: "black" }}
          formatter={(value) => <span style={{ color: "black" }}>{value}</span>}
        />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;

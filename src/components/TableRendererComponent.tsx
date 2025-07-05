import "../styles/tableRendererStyle.css";

type tableHeadersProps = {
  name: string;
  type: string;
};

type Props = {
    tableHeaders: tableHeadersProps[];
    apiData: any[]
}

const TableRendererComponent = ({tableHeaders, apiData}: Props) => {

  function getRowData(index: number, value: any) {
    if (tableHeaders[index]["type"] == "actionLink") {
      return (
        <td key={index}>
          <a href="#">{value.name}</a>
        </td>
      );
    } else if (["number", "string"].includes(tableHeaders[index]["type"])) {
      return <td key={index}>{value}</td>;
    } else if (tableHeaders[index]["type"] == "boolean") {
      return <td key={index}>{value === true ? "Yes" : "No"}</td>;
    }
  }
  return (
    <table className="main-table">
      <thead>
        <tr>
          {tableHeaders.map((item, itemIndex) => (
            <th key={itemIndex}>{item.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {apiData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((data, dataIndex) => {
            //   <td key={`${rowIndex}-${dataIndex}`}>{getRowData(dataIndex, data)}</td>
              return getRowData(dataIndex, data)
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRendererComponent;

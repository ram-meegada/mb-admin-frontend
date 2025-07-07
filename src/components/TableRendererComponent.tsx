import "../styles/tableRendererStyle.css";
import { CUSTOMER_BY_ID_ENDPOINT_FE } from "../utils/endpoints";

type tableHeadersProps = {
  name: string;
  type: string;
};

type Props = {
  tableHeaders: tableHeadersProps[];
  apiData: any[];
};

const TableRendererComponent = ({ tableHeaders, apiData }: Props) => {

  function getRowData(index: number, value: any) {
    if (tableHeaders[index]["type"] == "actionLink") {
      const endpoint = CUSTOMER_BY_ID_ENDPOINT_FE.replace(":id", value.id);
      return (
        <td key={index}>
          <a href={`${endpoint}`}>{value.name}</a>
        </td>
      );
    } else if (["number", "string"].includes(tableHeaders[index]["type"])) {
      return <td key={index}>{value}</td>;
    } else if (tableHeaders[index]["type"] == "boolean") {
      return <td key={index}>{value === true ? "Yes" : "No"}</td>;
    } else if (tableHeaders[index]["type"] == "price") {
      const formatted_value = value ? `${value}/-` : `${value}`
      return <td key={index}>{formatted_value}</td>;
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
              return getRowData(dataIndex, data);
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableRendererComponent;

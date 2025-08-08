import "../styles/tableRendererStyle.css";
import viewRecordImage from '../assets/viewRecord.png';
import { Link } from 'react-router-dom';


type tableHeadersProps = {
  name: string;
  type: string;
  redirectTo?: string;
};

type Props = {
  tableHeaders: tableHeadersProps[];
  apiData: any[];
};

const TableRendererComponent = ({ tableHeaders, apiData }: Props) => {
  function getRowData(index: number, value: any) {
    if (index >= tableHeaders.length) {
      return;
    }

    if (tableHeaders[index]["type"] == "actionLink") {
      const endpoint =
        tableHeaders[index]["redirectTo"] &&
        tableHeaders[index]["redirectTo"].replace(":id", value.id);
      return (
        <td key={index}>
          <Link to={`${endpoint}`}>{value.name}</Link>
        </td>
      );
    } else if (["number", "string"].includes(tableHeaders[index]["type"])) {
      return <td key={index}>{value}</td>;
    } else if (tableHeaders[index]["type"] == "boolean") {
      return <td key={index}>{value === true ? "Yes" : "No"}</td>;
    } else if (tableHeaders[index]["type"] == "price") {
      const formatted_value = value ? `${value}/-` : `${value}`;
      return <td key={index}>{formatted_value}</td>;
    } else if (tableHeaders[index]["type"] == "view_record") {
      const endpoint =
        tableHeaders[index]["redirectTo"] &&
        tableHeaders[index]["redirectTo"].replace(":id", value);
      return (
        <td key={index}>
          <a href={`${endpoint}`}>
            <img
              src={viewRecordImage}
              alt="view"
              className="tb-ed-view-record"
            ></img>
          </a>
        </td>
      );
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

import { useState } from "react";
import "../styles/sideBarStyle.css";
import kaneImage from "../assets/kane_image.png";

const SidebarLayout = () => {
  const [dropDownSelected, setDropDownSelected] = useState("");
  const [subMenuSelected, setSubMenuSelected] = useState("");

  const subMenuSelectedStyle = {backgroundColor: 'blue', color: 'green'}

  function getOptionSelectedStyle(text: string) {
    return {
            backgroundColor:
              dropDownSelected == text
                ? "var(--hover-red-color)"
                : "var(--primary-background-color)",
          }
  }

  function handleDropDownSelect(text: string) {
    if (dropDownSelected == text) {
      text = "";
    }
    setDropDownSelected(text);
  }

  function handleSubMenuSelect(text: string) {
    if (subMenuSelected == text) {
      text = "";
    }
    setSubMenuSelected(text);
  }

  return (
    <div className="sidebar-layout">
      <img src={kaneImage} alt="Logo" className="sidebar-profile-img" />

      <div
        className="sidebar-dropdown-div"
      >
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle("dashboard")}
          onClick={() => handleDropDownSelect("dashboard")}
        >
          Dashboard{" "}
        </button>
      </div>

      <div
        className="sidebar-dropdown-div"
      >
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle("manage_stock")}
          onClick={() => handleDropDownSelect("manage_stock")}
        >
          Manage Stock{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == "manage_stock" ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == "manage_stock" && (
          <ul className="sidebar-dropdown-submenu">
            <li className="sidebar-dropdown-item">Add Stock</li>
            <li className="sidebar-dropdown-item">Stocks List</li>
          </ul>
        )}
      </div>

      <div
        className="sidebar-dropdown-div"
      >
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle("customers")}
          onClick={() => handleDropDownSelect("customers")}
        >
          Customers{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == "customers" ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == "customers" && (
          <ul className="sidebar-dropdown-submenu">
            <li
              className="sidebar-dropdown-item"
            >
              Add Stock
            </li>
            <li
              className="sidebar-dropdown-item"
            >
              Manage Stock
            </li>
          </ul>
        )}
      </div>

      <div
        className="sidebar-dropdown-div"
      >
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle("experiment")}
          onClick={() => handleDropDownSelect("experiment")}
        >
          Expenditure{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == "experiment" ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == "experiment" && (
          <ul className="sidebar-dropdown-submenu">
            <li className="sidebar-dropdown-item">Add Stock</li>
            <li className="sidebar-dropdown-item">Manage Stock</li>
          </ul>
        )}
      </div>

      <div
        className="sidebar-dropdown-div"
      >
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle("analytics")}
          onClick={() => handleDropDownSelect("analytics")}
        >
          Analytics{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == "analytics" ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == "analytics" && (
          <ul className="sidebar-dropdown-submenu">
            <li className="sidebar-dropdown-item">Add Stock</li>
            <li className="sidebar-dropdown-item">Manage Stock</li>
          </ul>
        )}
      </div>

      <div
        className="sidebar-dropdown-div"
      >
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle("payments")}
          onClick={() => handleDropDownSelect("payments")}
        >
          Payments{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == "payments" ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == "payments" && (
          <ul className="sidebar-dropdown-submenu">
            <li className="sidebar-dropdown-item">Add Stock</li>
            <li className="sidebar-dropdown-item">Manage Stock</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarLayout;

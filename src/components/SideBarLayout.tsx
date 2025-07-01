import { useState } from "react";
import "../styles/sideBarStyle.css";
import kaneImage from "../assets/kane_image.png";
import {
  SIDEBAR_DASHBOARD,
  SIDEBAR_MANAGE_STOCK,
  SIDEBAR_CUSTOMERS,
  SIDEBAR_ANALYTICS,
  SIDEBAR_EXPENDITURE,
  SIDEBAR_ADD_STOCK,
  SIDEBAR_STOCKS_LIST,
  SUB_MENU_NAVIGATION_MAPPING,
} from "../utils/commonUtils";
import { useNavigate } from "react-router-dom";


type Props = {
  mainOptionSelected: string,
  optionSelected: string;
};

const SidebarLayout = ({ mainOptionSelected, optionSelected }: Props) => {
  const [dropDownSelected, setDropDownSelected] = useState(mainOptionSelected);
  const [subMenuSelected, setSubMenuSelected] = useState(optionSelected);
  const navigate = useNavigate();

  function getOptionSelectedStyle(text: string) {
    return {
      backgroundColor:
        dropDownSelected == text
          ? "var(--hover-red-color)"
          : "var(--primary-background-color)",
    };
  }

  function getSubMenuSelectedStyle(text: string) {
    
    if ([SIDEBAR_DASHBOARD].includes(text) && subMenuSelected != text) {
      return {backgroundColor: "var(--primary-background-color)"}
    }

    return {
      backgroundColor:
        subMenuSelected == text
          ? "var(--page-background-color)"
          : "var(--hover-red-color)",
    };
  }

  function handleDropDownSelect(text: string) {
    if (text === dropDownSelected) {
      text = ""
    }
    setDropDownSelected(text);
  }

  function handleSubMenuSelect(text: string) {
    setSubMenuSelected(text);

    navigate(SUB_MENU_NAVIGATION_MAPPING[text])
  }

  return (
    <div className="sidebar-layout">
      <img src={kaneImage} alt="Logo" className="sidebar-profile-img" />

      <div className="sidebar-dropdown-div">
        <button
          className="dropdown-btn"
          style={getSubMenuSelectedStyle(SIDEBAR_DASHBOARD)}
          onClick={() => handleSubMenuSelect(SIDEBAR_DASHBOARD)}
        >
          Dashboard{" "}
        </button>
      </div>

      <div className="sidebar-dropdown-div">
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle(SIDEBAR_MANAGE_STOCK)}
          onClick={() => handleDropDownSelect(SIDEBAR_MANAGE_STOCK)}
        >
          Manage Stock{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == SIDEBAR_MANAGE_STOCK ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == SIDEBAR_MANAGE_STOCK && (
          <ul className="sidebar-dropdown-submenu">
            <li
              className="sidebar-dropdown-item"
              onClick={() => handleSubMenuSelect(SIDEBAR_ADD_STOCK)}
              style={getSubMenuSelectedStyle(SIDEBAR_ADD_STOCK)}
            >
              Add Stock
            </li>
            <li
              className="sidebar-dropdown-item"
              onClick={() => handleSubMenuSelect(SIDEBAR_STOCKS_LIST)}
              style={getSubMenuSelectedStyle(SIDEBAR_STOCKS_LIST)}
            >
              Stocks List
            </li>
          </ul>
        )}
      </div>

      <div className="sidebar-dropdown-div">
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle(SIDEBAR_CUSTOMERS)}
          onClick={() => handleDropDownSelect(SIDEBAR_CUSTOMERS)}
        >
          Customers{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == SIDEBAR_CUSTOMERS ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == SIDEBAR_CUSTOMERS && (
          <ul className="sidebar-dropdown-submenu">
            
          </ul>
        )}
      </div>

      <div className="sidebar-dropdown-div">
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle(SIDEBAR_EXPENDITURE)}
          onClick={() => handleDropDownSelect(SIDEBAR_EXPENDITURE)}
        >
          Expenditure{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == SIDEBAR_EXPENDITURE ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == SIDEBAR_EXPENDITURE && (
          <ul className="sidebar-dropdown-submenu">
            
          </ul>
        )}
      </div>

      <div className="sidebar-dropdown-div">
        <button
          className="dropdown-btn"
          style={getOptionSelectedStyle(SIDEBAR_ANALYTICS)}
          onClick={() => handleDropDownSelect(SIDEBAR_ANALYTICS)}
        >
          Analytics{" "}
          <i className="sidebar-dropdown-symbol">
            {dropDownSelected == SIDEBAR_ANALYTICS ? "▲" : "▼"}
          </i>
        </button>
        {dropDownSelected == SIDEBAR_ANALYTICS && (
          <ul className="sidebar-dropdown-submenu">
            
          </ul>
        )}
      </div>

      <div className="sidebar-dropdown-div">
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
            
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarLayout;

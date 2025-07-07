import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SidebarLayout from "../../components/SideBarLayout";
import {
  pageHeadingStyle,
  SIDEBAR_CUSTOMER_LIST,
  SIDEBAR_CUSTOMERS,
} from "../../utils/commonUtils";
import APICall from "../../utils/callApiUtils";
import { toast } from "react-toastify";
import { GET_CUSTOMER } from "../../utils/endpoints";
import ToastComponent from "../../components/ToastComponent";
import LoaderModal from "../../components/Loader";
import "../../styles/Customers/CustomerById.css";

type apiDataProps = {
  user: { id: number; name: string; username: string };
  subscription: string;
  start_date: string;
  delivery_agent: { id: number; name: string };
  schedule: string;
  pending_payments: { year: number; month: string; amount_due: number }[];
  total_turnover: number;
};

const CutomerDetailsById = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<apiDataProps>();
  const navigate = useNavigate();

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: `${GET_CUSTOMER}${id}/`,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
      });
      setLoading(false);
      if (response) {
        setApiResponse(response);
      }
    }
    getApiResponse();
  }, []);

  return (
    <>
      {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_CUSTOMERS}
        optionSelected={SIDEBAR_CUSTOMER_LIST}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Customer Details</h1>
        <div className="container">
          <div className="info-container">
            <strong>Name:-</strong> {apiResponse?.user.name}
          </div>
          <div className="info-container">
            <strong>Username:-</strong> {apiResponse?.user.username}
          </div>
          <div className="info-container">
            <strong>Subscription:-</strong> {apiResponse?.subscription}
          </div>
          <div className="info-container">
            <strong>Start Date:-</strong> {apiResponse?.start_date}
          </div>
          <div className="info-container">
            <strong>Delivery Agent:-</strong> {apiResponse?.delivery_agent.name}
          </div>
          <div className="info-container">
            <strong>Schedule:-</strong> {apiResponse?.schedule}
          </div>
          <div className="info-container">
            <strong>Total Turnover:-</strong> {apiResponse?.total_turnover}/-
          </div>
          <div className="info-container">
            <strong>Pending payments:-</strong>
            <ul>
              {apiResponse?.pending_payments.map((value, index) => (
                <li
                  key={index}
                  style={{
                    color: "red",
                    fontWeight: 600,
                    backgroundColor: "white",
                    width: "fit-content",
										padding: '0.2rem'
                  }}
                >
                  {value.year} {value.month}, {value.amount_due}/-
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ToastComponent />
    </>
  );
};

export default CutomerDetailsById;

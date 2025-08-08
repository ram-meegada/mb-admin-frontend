import { useEffect, useState } from "react";
import {
  pageHeadingStyle,
  SIDEBAR_MONTH_PAYMENTS,
  SIDEBAR_PAYMENTS,
} from "../../utils/commonUtils";
import LoaderModal from "../../components/Loader";
import SidebarLayout from "../../components/SideBarLayout";
import TableRendererComponent from "../../components/TableRendererComponent";
import { useNavigate } from "react-router-dom";
import APICall from "../../utils/callApiUtils";
import { toast } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";
import { CUSTOMER_BY_ID_ENDPOINT_FE, PAYMENTS_LIST, VIEW_MONTH_PAYMENT_ENDPOINT_FE } from "../../utils/endpoints";
import { useAuth } from "../../contexts/AuthContext";

type apiDataProps = {
  customer: string;
  amount_due: number;
  amount_paid: number;
  is_paid: boolean;
};

const MonthPayments = () => {
  const { accessToken, setAccessToken } = useAuth()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<apiDataProps[]>([]);
  const [paymentMonth, setPaymentMonth] = useState("");
  const [totalDue, setTotalDue] = useState("");
  const [totalPaid, setTotalPaid] = useState("");
  const [totalMonthPayment, setTotalMonthPayment] = useState("");
  const [currentYearRevenue, setCurrentYearRevenue] = useState("");

  const tableHeaders = [
    { name: "Customer", type: "actionLink", redirectTo: CUSTOMER_BY_ID_ENDPOINT_FE},
    { name: "Amount Due", type: "price" },
    { name: "Amount Paid", type: "price" },
    { name: "Total Paid", type: "boolean" },
    { name: "View", type: "view_record", redirectTo: VIEW_MONTH_PAYMENT_ENDPOINT_FE},
  ];

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: PAYMENTS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken
      });
      setLoading(false);
      if (response) {
        setApiResponse(response.data);
        setPaymentMonth(response.month);
        setTotalDue(response.total_due);
        setTotalPaid(response.total_paid);
        setTotalMonthPayment(response.total_payment);
        setCurrentYearRevenue(response.current_year_revenue)
      }
    }
    getApiResponse();
  }, []);

  return (
    <>
      {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_PAYMENTS}
        optionSelected={SIDEBAR_MONTH_PAYMENTS}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>{paymentMonth} Month Payments</h1>
        <TableRendererComponent
          tableHeaders={tableHeaders}
          apiData={apiResponse}
        />
        <div
          style={{
            margin: "30px",
            marginTop: 0,
            fontSize: "1.5rem",
            backgroundColor: "var(--hover-red-color)",
            width: 'fit-content',
            padding: '1rem'
          }}
          >
          <p>
            <strong>Total Month Payment:- </strong>
            {totalMonthPayment}/-
          </p>
          <p>
            <strong>Total Paid:- </strong>
            {totalPaid}/-
          </p>
          <p>
            <strong>Total Due:- </strong>
            {totalDue}/-
          </p>
          <p>
            <strong>Current Year Revenue:- </strong>
            {currentYearRevenue}/-
          </p>
        </div>
      </div>
      <ToastComponent />
    </>
  );
};

export default MonthPayments;

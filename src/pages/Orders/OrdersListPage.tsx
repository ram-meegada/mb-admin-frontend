import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APICall from "../../utils/callApiUtils";
import { CUSTOMER_BY_ID_ENDPOINT_FE, ORDERS_LIST } from "../../utils/endpoints";
import LoaderModal from "../../components/Loader";
import SidebarLayout from "../../components/SideBarLayout";
import {
  pageHeadingStyle,
  SIDEBAR_ORDERS,
  SIDEBAR_ORDERS_LIST,
} from "../../utils/commonUtils";
import TableRendererComponent from "../../components/TableRendererComponent";
import ToastComponent from "../../components/ToastComponent";


const OrdersListPage = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState([]);

  const tableHeaders = [
    { name: "Customer", type: "actionLink", redirectTo: CUSTOMER_BY_ID_ENDPOINT_FE },
    { name: "Subscription", type: "string" },
    { name: "Price", type: "price" },
    { name: "Morning Delivery", type: "boolean" },
    { name: "status", type: "string" },
  ];

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: ORDERS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken: setAccessToken,
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
        mainOptionSelected={SIDEBAR_ORDERS}
        optionSelected={SIDEBAR_ORDERS_LIST}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Orders List</h1>
        <TableRendererComponent
          tableHeaders={tableHeaders}
          apiData={apiResponse}
        />
      </div>
      <ToastComponent />
    </>
  );
};

export default OrdersListPage;

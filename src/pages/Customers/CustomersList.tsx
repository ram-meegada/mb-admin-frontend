import React, { useEffect, useState } from "react";
import LoaderModal from "../../components/Loader";
import SidebarLayout from "../../components/SideBarLayout";
import { pageHeadingStyle, SIDEBAR_CUSTOMER_LIST, SIDEBAR_CUSTOMERS } from "../../utils/commonUtils";
import APICall from "../../utils/callApiUtils";
import { CUSTOMERS_LIST } from "../../utils/endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ToastComponent from "../../components/ToastComponent";
import TableRendererComponent from "../../components/TableRendererComponent";


type apiDataProps = {
  user: {id: number, name: string},
	subscription: string,
	start_date: string,
	delivery_agent: {id: number, name: string},
	schedule: string
};

const CustomersList = () => {
	const [ loading, setLoading ] = useState(false)
	const navigate = useNavigate();
	const [apiResponse, setApiResponse] = useState<apiDataProps[]>([])

	const tableHeaders = [
    {'name': 'Customer', 'type': 'actionLink'},
    {'name': 'Subscription', 'type': 'string'},
    {'name': 'Start Date', 'type': 'string'},
    {'name': 'Delivery Agent', 'type': 'actionLink'},
    {'name': 'Schedule', 'type': 'string'},
    {'name': 'Total Turnover', 'type': 'number'},
    {'name': 'Pending payments count', 'type': 'number'},
  ]

	function onFailureCallBack(message: string) {
				toast.error(message)
			}

	useEffect(() => {
		async function getApiResponse() {
      setLoading(true)
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: CUSTOMERS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate
      })
      setLoading(false)
      if (response) {
        setApiResponse(response)
      }
    }
    getApiResponse()
	}, [])

  return (
	<>
		{loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_CUSTOMERS}
        optionSelected={SIDEBAR_CUSTOMER_LIST}
      />
	  <div className="main-page-wrapper-global">
			<h1 style={pageHeadingStyle}>Customers List</h1>
			<TableRendererComponent tableHeaders={tableHeaders} apiData={apiResponse} />
	  </div>
		<ToastComponent />
	</>
  );
};

export default CustomersList;

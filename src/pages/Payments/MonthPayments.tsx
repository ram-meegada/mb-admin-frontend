import React, { useEffect, useState } from 'react'
import { pageHeadingStyle, SIDEBAR_MONTH_PAYMENTS, SIDEBAR_PAYMENTS } from '../../utils/commonUtils';
import LoaderModal from '../../components/Loader';
import SidebarLayout from '../../components/SideBarLayout';
import TableRendererComponent from '../../components/TableRendererComponent';
import { useNavigate } from 'react-router-dom';
import APICall from '../../utils/callApiUtils';
import { toast } from 'react-toastify';
import ToastComponent from "../../components/ToastComponent";
import { PAYMENTS_LIST } from '../../utils/endpoints';


type apiDataProps = {
  customer: string;
  amount_due: number;
  amount_paid: number;
  is_paid: boolean;
};

const MonthPayments = () => {
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false)
  const [apiResponse, setApiResponse] = useState<apiDataProps[]>([])

  const tableHeaders = [
    {'name': 'Customer', 'type': 'actionLink'},
    {'name': 'Amount Due', 'type': 'number'},
    {'name': 'Amount Paid', 'type': 'number'},
    {'name': 'Total Paid', 'type': 'boolean'},
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
        endPoint: PAYMENTS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate
      })
      setLoading(false)
      if (response) {
        setApiResponse(response.data)
      }
    }
    getApiResponse()
  }, [])

  return (
    <>
    {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_PAYMENTS}
        optionSelected={SIDEBAR_MONTH_PAYMENTS}
      />
			<div className='main-page-wrapper-global'>
        <h1 style={pageHeadingStyle}>Month Payments</h1>
				<TableRendererComponent tableHeaders={tableHeaders} apiData={apiResponse} />
			</div>
      <ToastComponent />
    </>
  )
}

export default MonthPayments;

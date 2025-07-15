import React, { useEffect, useState } from "react";
import SidebarLayout from "../../components/SideBarLayout";
import LoaderModal from "../../components/Loader";
import {
  pageHeadingStyle,
  SIDEBAR_ANALYTICS,
  SIDEBAR_PAYMENTS_ANALYTICS,
} from "../../utils/commonUtils";
import { toast } from "react-toastify";
import APICall from "../../utils/callApiUtils";
import { useNavigate } from "react-router-dom";
import { PAYMENT_ANALYTICS } from "../../utils/endpoints";
import DropDownComponent from "../../components/DropDownComponent";
import BarChartComponent from "../../components/BarChartComponent";
import ToastComponent from "../../components/ToastComponent";

export type dataProps = {
  bar_chart_data: { x: string; y: number; color?: string }[];
  metadata: {
    year: string;
    month?: string;
    category?: string;
    link_to?: string;
  };
};

const PaymentsAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<dataProps>();
  const navigate = useNavigate();

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
			const PAYLOAD = { analytics_type: "monthly_data" }

      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: PAYMENT_ANALYTICS,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
				formData: PAYLOAD
      });
      setLoading(false);
			
      if (response) {
        setApiResponse(response);
      }
    }
    getApiResponse();
  }, []);

	function handleBarClicked(filters: any) {

  }

  return (
    <>
      {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_ANALYTICS}
        optionSelected={SIDEBAR_PAYMENTS_ANALYTICS}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Payments Analytics</h1>
				<DropDownComponent option="Monthly" />
        <BarChartComponent
          chartData={apiResponse}
					handleBarClicked={handleBarClicked}
          title="Monthly Analysis"
        />
      </div>
			<ToastComponent />
    </>
  );
};

export default PaymentsAnalytics;

import { useEffect, useState } from "react";
import SidebarLayout from "../../components/SideBarLayout";
import LoaderModal from "../../components/Loader";
import {
  pageHeadingStyle,
  SIDEBAR_ANALYTICS,
  SIDEBAR_MARGIN_ANALYTICS,
} from "../../utils/commonUtils";
import { toast } from "react-toastify";
import APICall from "../../utils/callApiUtils";
import { useNavigate } from "react-router-dom";
import DropDownComponent from "../../components/DropDownComponent";
import BarChartComponent from "../../components/BarChartComponent";
import ToastComponent from "../../components/ToastComponent";
import { MARGIN_ANALYTICS } from "../../utils/endpoints";
import { useAuth } from "../../contexts/AuthContext";


type MonthKeys = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export type dataProps = {
  bar_chart_data: { x: string; y: number; color?: string }[];
  month_exp_and_payment: {[key in MonthKeys]: {exp: number, revenue: number}};
  metadata: {
    year: string;
    month?: string;
    category?: string;
    link_to?: string;
  };
};

const MarginAnalytics = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken, setAccessToken } = useAuth();
  const [apiResponse, setApiResponse] = useState<dataProps>();
  const navigate = useNavigate();
  const [ monthExpenditure, setMonthExpenditure ] = useState<number>()
  const [ monthRevenue, setMonthRevenue ] = useState<number>()


  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const PAYLOAD = { analytics_type: "monthly_data" };

      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: MARGIN_ANALYTICS,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        formData: PAYLOAD,
        accessToken: accessToken,
        setAccessToken
      });
      setLoading(false);

      if (response) {
        setApiResponse(response);
      }
    }
    getApiResponse();
  }, []);

  function handleBarClicked(filters: {month: string}) {
    setMonthExpenditure(apiResponse?.month_exp_and_payment[filters.month as MonthKeys].exp);
    setMonthRevenue(apiResponse?.month_exp_and_payment[filters.month as MonthKeys].revenue);
  }

  return (
    <>
      {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_ANALYTICS}
        optionSelected={SIDEBAR_MARGIN_ANALYTICS}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Margin Analytics</h1>
        <DropDownComponent option="Monthly" />
        <BarChartComponent
          chartData={apiResponse}
          handleBarClicked={handleBarClicked}
          title="Monthly Analysis"
          symbol="%"
          dynamicYAxisDomain={true}
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
              <strong>Total Payment:- </strong>
              {monthRevenue}{monthRevenue ? '/-' : ''}
            </p>
            <p>
              <strong>Total Expenditure:- </strong>
              {monthExpenditure}{monthExpenditure ? '/-' : ''}
            </p>
          </div>
      </div>
      <ToastComponent />
    </>
  );
};

export default MarginAnalytics;

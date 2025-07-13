import React, { useEffect, useState } from "react";
import ToastComponent from "../../components/ToastComponent";
import {
  pageHeadingStyle,
  SIDEBAR_ANALYTICS,
  SIDEBAR_EXPENDITURE_ANALYTICS,
} from "../../utils/commonUtils";
import SidebarLayout from "../../components/SideBarLayout";
import LoaderModal from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import BarChartComponent from "../../components/BarChartComponent";
import DropDownComponent from "../../components/DropDownComponent";
import { toast } from "react-toastify";
import APICall from "../../utils/callApiUtils";
import { FETCH_EXPENDITURE_GRAPH_DATA } from "../../utils/endpoints";

export type dataProps = {
  bar_chart_data: { x: string; y: number; color?: string }[];
  metadata: {
    year: string;
    month?: string;
    category?: string;
    link_to?: string;
  };
};

const ExpenditureAnalytics = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [monthlyChartData, setMonthlyChartData] = useState<dataProps>();
  const [mainCategoryChartData, setMainCategoryChartData] =
    useState<dataProps>();
  const [subCategoryChartData, setSubCategoryChartData] = useState<dataProps>();


  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  async function getApiResponse(payload: any) {
    setLoading(true);

    const response = await APICall({
      method: "POST",
      Accept: "application/json",
      endPoint: FETCH_EXPENDITURE_GRAPH_DATA,
      onFailure: onFailureCallBack,
      contentType: "application/json",
      navigate: navigate,
      formData: payload,
    });
    setLoading(false);
    if (response) {
      if (payload.analytics_type === "monthly_data") {
        setMonthlyChartData(response);
        setMainCategoryChartData(undefined);
        setSubCategoryChartData(undefined);
      } else if (payload.analytics_type === "main_categories_analysis") {
        setMainCategoryChartData(response);
        setSubCategoryChartData(undefined);
      }
      else if (payload.analytics_type === "sub_categories_analysis") {
        setSubCategoryChartData(response)
      }
    }
  }

  useEffect(() => {
    getApiResponse({ analytics_type: "monthly_data" });
  }, []);

  function handleBarClicked(filters: any) {
    getApiResponse(filters);
  }

  return (
    <>
      {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_ANALYTICS}
        optionSelected={SIDEBAR_EXPENDITURE_ANALYTICS}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Expenditure Analytics</h1>
        <DropDownComponent option="Monthly" />
        <BarChartComponent
          chartData={monthlyChartData}
          handleBarClicked={handleBarClicked}
          title="Monthly Analysis"
        />
        {mainCategoryChartData ? (
          <BarChartComponent
            chartData={mainCategoryChartData}
            handleBarClicked={handleBarClicked}
            title={`Main Category Analysis of ${mainCategoryChartData.metadata.month} month`}
          />
        ) : null}
        {subCategoryChartData ? (
          <BarChartComponent
            chartData={subCategoryChartData}
            handleBarClicked={handleBarClicked}
            title={`Sub Category Analysis of ${subCategoryChartData.metadata.month} month for ${subCategoryChartData.metadata.category} Category`}
          />
        ) : null}
      </div>
      <ToastComponent />
    </>
  );
};

export default ExpenditureAnalytics;

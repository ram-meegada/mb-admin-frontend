import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoaderModal from "../../components/Loader";
import SidebarLayout from "../../components/SideBarLayout";
import {
  pageHeadingStyle,
  SIDEBAR_MONTH_PAYMENTS,
  SIDEBAR_PAYMENTS,
} from "../../utils/commonUtils";
import "../../styles/Payments/monthPayment.css";
import DatePickerComponent from "../../components/DatePickerComponent";
import CustomButtonComponent from "../../components/CustomButtonComponent";
import APICall from "../../utils/callApiUtils";
import { toast } from "react-toastify";
import { VIEW_PAYMENT_LIST } from "../../utils/endpoints";
import ToastComponent from "../../components/ToastComponent";

type apiDataProps = {
  name: string;
  month: string;
  amount_due: number;
  amount_paid: number;
  is_paid: boolean;
  payment_date: string | null;
};

const MonthlyPaymentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<apiDataProps>({
    name: "",
    month: "",
    amount_due: 0,
    amount_paid: 0,
    is_paid: false,
    payment_date: null,
  });

  function onFailureCallBack(message: string) {
    toast.error(message);
  }
  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const response = await APICall({
      method: "PATCH",
      Accept: "application/json",
      endPoint: `${VIEW_PAYMENT_LIST}${id}/`,
      onFailure: onFailureCallBack,
      contentType: "application/json",
      navigate: navigate,
      formData: apiData,
    });
    setLoading(false);
    toast.success("Payment details updated.");
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: `${VIEW_PAYMENT_LIST}${id}/`,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
      });
      setLoading(false);
      if (response) {
        setApiData(response);
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
        <h1 style={pageHeadingStyle}>
          {apiData?.name}'s {apiData?.month} Payment
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div className="payments-form-container">
            <div className="form-input">
              <label>Customer:</label>
              <input value={apiData?.name} readOnly />
            </div>

            <div className="form-input">
              <label>Month:</label>
              <input value={apiData?.month} readOnly />
            </div>

            <div className="form-input">
              <label>Amount due:</label>
              <input
                type="number"
                name="amount_due"
                value={apiData?.amount_due}
                onChange={(e) =>
                  setApiData({
                    ...apiData,
                    amount_due: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="form-input">
              <label>Amount Paid:</label>
              <input
                type="number"
                name="amount_paid"
                value={apiData?.amount_paid}
                onChange={(e) =>
                  setApiData({
                    ...apiData,
                    amount_paid: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="form-input">
              <label>Payment Date:</label>
              <DatePickerComponent
                onDateSelect={(dateSelected) =>
                  setApiData({ ...apiData, payment_date: dateSelected })
                }
                defaultDate={apiData.payment_date}
              />
            </div>

            <div className="form-input">
              <label>Total Paid:</label>
              <input
                type="checkbox"
                name="is_paid"
                checked={apiData.is_paid}
                onChange={(e) =>
                  setApiData({ ...apiData, is_paid: e.target.checked })
                }
              />
            </div>
          </div>
          <CustomButtonComponent buttonStyles={{ ml: 10 }} />
        </form>
      </div>
      <ToastComponent />
    </>
  );
};

export default MonthlyPaymentView;

import React, { useState } from "react";
import LoaderModal from "../../components/Loader";
import {
  pageHeadingStyle,
} from "../../utils/commonUtils";
import DatePickerComponent from "../../components/DatePickerComponent";
import { Button, Stack } from "@mui/material";
import DropDownComp from "../../components/MUI_COMPONENTS/DropDownComp";
import CheckBoxComp from "../../components/MUI_COMPONENTS/CheckBoxComp";
import APICall from "../../utils/callApiUtils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";
import { ADD_ORDER } from "../../utils/endpoints";
import { useAuth } from "../../contexts/AuthContext";


type payloadProps = {
  status?: string,
  schedule_date: string | null,
  is_morning_delivery?: boolean,
  customer_id: number
}

const AddOrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { name } = location.state || {}
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<payloadProps>({is_morning_delivery: false, schedule_date: null, customer_id: id ? Number(id) : 0})
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const ORDER_STATUS_CHOICES = [
    ["pending", "Pending"],
    ["out_for_delivery", "Out for Delivery"],
    ["delivered", "Delivered"],
    ["cancelled", "Cancelled"],
    ["failed", "Failed"],
  ];

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  const handleFormSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!payload.schedule_date) {
      toast.info('Please select date')
      return
    }
    if (payload.customer_id === 0) {
      toast.info('Something went wrong')
    }

    setLoading(true);
    try {
      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: ADD_ORDER,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        formData: payload,
        accessToken: accessToken,
        setAccessToken
      });
      if ([200, 201].includes(response.status)) {
        navigate(-1)
        return
      }
    }
    catch (err) {
      toast.error('Something went wrong')
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Add Order for {name}</h1>
        <Stack
          component="form"
          spacing={2}
          sx={{ alignSelf: "center", mt: 5 }}
          onSubmit={handleFormSubmit}
        >
          <DatePickerComponent
            onDateSelect={(dateSelected) => setPayload({...payload, schedule_date: dateSelected})}
            label="Schedule date"
          />
          <DropDownComp data={ORDER_STATUS_CHOICES} optionSelected={(d) => setPayload({...payload, status: d})}/>
          <CheckBoxComp label="Morning delivery" optionSelected={(c) => setPayload({...payload, is_morning_delivery: c})}/>
          <Button variant="contained" sx={{ fontWeight: 'bold' }} type="submit">Submit</Button>
        </Stack>
      </div>
      <ToastComponent />
    </>
  );
};

export default AddOrderPage;

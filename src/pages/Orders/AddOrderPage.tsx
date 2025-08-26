import React, { useState } from "react";
import LoaderModal from "../../components/Loader";
import SidebarLayout from "../../components/SideBarLayout";
import {
  pageHeadingStyle,
  SIDEBAR_ORDERS,
  SIDEBAR_ORDERS_ADD,
} from "../../utils/commonUtils";
import DatePickerComponent from "../../components/DatePickerComponent";
import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import DropDownComp from "../../components/MUI_COMPONENTS/DropDownComp";
import { pink } from "@mui/material/colors";
import CheckBoxComp from "../../components/MUI_COMPONENTS/CheckBoxComp";


type payloadProps = {
  status?: string,
  schedule_date: string | null,
  is_morning_delivery?: boolean
}

const AddOrderPage = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<payloadProps>({is_morning_delivery: false, schedule_date: null})

  const ORDER_STATUS_CHOICES = [
    ["pending", "Pending"],
    ["out_for_delivery", "Out for Delivery"],
    ["delivered", "Delivered"],
    ["cancelled", "Cancelled"],
    ["failed", "Failed"],
  ];

  const handleFormSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_ORDERS}
        optionSelected={SIDEBAR_ORDERS_ADD}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Add Orders</h1>
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
    </>
  );
};

export default AddOrderPage;

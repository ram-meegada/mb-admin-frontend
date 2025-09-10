import { useEffect, useState } from "react";
import LoaderModal from "../../components/Loader";
import { pageHeadingStyle } from "../../utils/commonUtils";
import { Button, Stack, TextField } from "@mui/material";
import DatePickerComponent from "../../components/DatePickerComponent";
import DropDownGroupComp from "../../components/MUI_COMPONENTS/dropDownGroupComp";
import APICall from "../../utils/callApiUtils";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ACTIVE_DELIVERY_AGENTS_LIST,
  ACTIVE_SUBSCRIPTION_LIST,
  ADD_CUSTOMER,
  ALL_CUSTOMERS_ENDPOINT_FE,
} from "../../utils/endpoints";
import DropDownComp from "../../components/MUI_COMPONENTS/DropDownComp";
import ToastComponent from "../../components/ToastComponent";

type payloadProps = {
  username?: string;
  name?: string;
  subscription?: number;
  delivery_agent?: number;
  start_date: string | null;
};

const AddCustomerPage = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<payloadProps>({ start_date: null });
  const [subsplans, setSubsPlans] = useState([]);
  const [activeAgents, setActiveAgents] = useState([]);
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: ACTIVE_SUBSCRIPTION_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken,
      });
      setLoading(false);
      if (response.data) {
        setSubsPlans(response.data);
      }
    }

    async function getApiResponseForAgents() {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: ACTIVE_DELIVERY_AGENTS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken,
      });
      setLoading(false);
      if (response.data) {
        setActiveAgents(response.data);
      }
    }
    getApiResponseForAgents();
    getApiResponse();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!payload.start_date) {
      alert('Please select start date')
      return
    }

    try {
      setLoading(true)
      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: ADD_CUSTOMER,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        formData: payload,
        setAccessToken
      })
      if (response.status == 200) {
          navigate(ALL_CUSTOMERS_ENDPOINT_FE)
      }
    }
    catch (err) {
      setLoading(false)
      toast.error('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Add Customer</h1>
        <Stack
          component="form"
          spacing={2}
          sx={{ alignSelf: "center", mt: 5 }}
            onSubmit={handleFormSubmit}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            sx={{ width: 300 }}
            required
            onChange={(e) =>
              setPayload({ ...payload, username: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ width: 300 }}
            required
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
          />
          <DropDownGroupComp
            data={subsplans}
            optionSelected={(v) => setPayload({ ...payload, subscription: v })}
            label="Subscription plans"
          />
          <DropDownComp
            data={activeAgents}
            optionSelected={(d) => setPayload({ ...payload, delivery_agent: parseInt(d) })}
            label="Agents"
          />
          <DatePickerComponent
            onDateSelect={(dateSelected) =>
              setPayload({ ...payload, start_date: dateSelected })
            }
            label="Start date"
          />
          <Button variant="contained" sx={{ fontWeight: "bold" }} type="submit">
            Submit
          </Button>
        </Stack>
      </div>
      <ToastComponent />
    </>
  );
};

export default AddCustomerPage;

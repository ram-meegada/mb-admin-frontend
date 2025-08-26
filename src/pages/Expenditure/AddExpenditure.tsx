import React, { useEffect, useState } from "react";
import LoaderModal from "../../components/Loader";
import SidebarLayout from "../../components/SideBarLayout";
import {
  pageHeadingStyle,
  SIDEBAR_EXPENDITURE,
  SIDEBAR_EXPENDITURE_ADD,
} from "../../utils/commonUtils";
import ToastComponent from "../../components/ToastComponent";
import DropDownGroupComp from "../../components/MUI_COMPONENTS/dropDownGroupComp";
import { InputAdornment, TextField, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import APICall from "../../utils/callApiUtils";
import { ADD_EXPENDITURE, EXPENDITURE_LIST_ENDPOINT_FE, FETCH_EXPENDITURE_CATEGORIES } from "../../utils/endpoints";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


type payloadProps = {
  category: number | null,
  amount?: number,
  description?: string
}

const AddExpenditure = () => {
  const [loading, setLoading] = useState(false);
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [ expCategories, setExpCategories ] = useState([])
  const [ payload, setPayload ] = useState<payloadProps>({category: null})
  const [ catError, setCatError ] = useState('')


  function onFailureCallBack(message: string) {
          toast.error(message)
        }

  useEffect(() => {
		async function getApiResponse() {
      setLoading(true)
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: FETCH_EXPENDITURE_CATEGORIES,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken
      })
      setLoading(false)
      if (response) {
        setExpCategories(response)
      }
    }
    getApiResponse()
	}, [])

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!payload.category) {
      setCatError('Category is required')
      return
    }

    try {
      setLoading(true)
      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: ADD_EXPENDITURE,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        formData: payload,
        setAccessToken
      })

      navigate(EXPENDITURE_LIST_ENDPOINT_FE)
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
      <SidebarLayout
        mainOptionSelected={SIDEBAR_EXPENDITURE}
        optionSelected={SIDEBAR_EXPENDITURE_ADD}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Add Expenditure</h1>
        <Stack component="form" spacing={2} sx={{ alignSelf: "center", mt: 5 }} onSubmit={handleFormSubmit}>
          <DropDownGroupComp data={expCategories} error={catError} optionSelected={(id) => setPayload({...payload, category: id})}/>
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
            required
            onChange={(e) => setPayload({...payload, amount: parseInt(e.target.value)})}
            sx={{ width: 300 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: 'grey' }}>₹</Typography>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            sx={{ width: 300 }}
            multiline
            rows={3}
            required
            onChange={(e) => setPayload({...payload, description: e.target.value})}
          />
          <Button variant="contained" sx={{ fontWeight: 'bold' }} type="submit">Submit</Button>
        </Stack>
      </div>
      <ToastComponent />
    </>
  );
};

export default AddExpenditure;

import { useState } from "react";
import LoaderModal from "../../components/Loader";
import {
  pageHeadingStyle,
} from "../../utils/commonUtils";
import DropDownComp from "../../components/MUI_COMPONENTS/DropDownComp";
import { Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import DatePickerComponent from "../../components/DatePickerComponent";
import CheckBoxComp from "../../components/MUI_COMPONENTS/CheckBoxComp";
import APICall from "../../utils/callApiUtils";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ADD_STOCK_ENDPOINT, STOCKS_LIST_ENDPOINT_FE } from "../../utils/endpoints";


const breedChoices = [
  ["Bhadawari", "Bhadawari"],
  ["Jaffarabadi", "Jaffarabadi"],
  ["Marathwadi", "Marathwadi"],
  ["Mehsana", "Mehsana"],
  ["Murrah", "Murrah"],
  ["Nagpuri", "Nagpuri"],
  ["Nili Ravi", "Nili Ravi"],
  ["Pandharpuri", "Pandharpuri"],
  ["Surti", "Surti"],
  ["Toda", "Toda"],
  ["Banni", "Banni"],
  ["Chilika", "Chilika"],
  ["Kalahandi", "Kalahandi"],
  ["Luit (Swamp)", "Luit (Swamp)"],
  ["Bargur", "Bargur"],
  ["Chhattisgarhi", "Chhattisgarhi"],
  ["Gojri", "Gojri"],
  ["Dharwadi", "Dharwadi"],
  ["Manda", "Manda"],
  ["Purnathadi", "Purnathadi"],
];

type payloadProps = {
  breed?: string;
  is_pregnant?: boolean;
  last_calvation_date: string | null;
  date_of_birth: string | null;
  lactation_month?: number;
  purchase_price?: number;
  milk_capacity?: number;
  parity?: number;
  seller_details?: string;
  qualities?: string;
  food_habits?: string;
};

const AddStockPage = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<payloadProps>({
    last_calvation_date: null,
    date_of_birth: null,
    is_pregnant: false,
  });
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    function onFailureCallBack(message: string) {
        toast.error(message);
      }

    try {
      setLoading(true)
      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: ADD_STOCK_ENDPOINT,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        formData: payload,
        setAccessToken
      })
      if (response.status === 200) {
          navigate(STOCKS_LIST_ENDPOINT_FE)
          return
      }
    }
    catch (err) {
      setLoading(false)
      toast.error('Something went wrong')
    }
    setLoading(false)
  };

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Add Stock</h1>
        <Stack
          component="form"
          spacing={2}
          sx={{ alignSelf: "center", mt: 2, mb: 5 }}
          onSubmit={handleFormSubmit}
        >
          <DropDownComp
            data={breedChoices}
            optionSelected={(b) => setPayload({ ...payload, breed: b })}
            label="Breeds"
          />
          <TextField
            id="outlined-basic"
            label="Seller details"
            variant="outlined"
            sx={{ width: 300 }}
            multiline
            rows={3}
            required
            onChange={(e) =>
              setPayload({ ...payload, seller_details: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Qualities"
            variant="outlined"
            sx={{ width: 300 }}
            multiline
            rows={3}
            required
            onChange={(e) =>
              setPayload({ ...payload, qualities: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Food habits"
            variant="outlined"
            sx={{ width: 300 }}
            multiline
            rows={3}
            onChange={(e) =>
              setPayload({ ...payload, food_habits: e.target.value })
            }
          />
          <TextField
            id="outlined-basic"
            label="Lactation Month"
            variant="outlined"
            type="number"
            required
            onWheel={(event) => {
                        (event.target as HTMLInputElement).blur();
                      }}
            onChange={(e) =>
              setPayload({
                ...payload,
                lactation_month: parseInt(e.target.value),
              })
            }
            sx={{ width: 300 }}
          />
          <TextField
            id="outlined-basic"
            label="Parity"
            variant="outlined"
            type="number"
            required
            onWheel={(event) => {
                        (event.target as HTMLInputElement).blur();
                      }}
            onChange={(e) =>
              setPayload({
                ...payload,
                parity: parseInt(e.target.value),
              })
            }
            sx={{ width: 300 }}
          />
          <TextField
            id="outlined-basic"
            label="Purchase Price"
            variant="outlined"
            type="number"
            required
            onChange={(e) => setPayload({...payload, purchase_price: parseInt(e.target.value)})}
            sx={{ width: 300 }}
            onWheel={(event) => {
                        (event.target as HTMLInputElement).blur();
                      }}
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
            label="Milk Capacity"
            variant="outlined"
            type="number"
            required
            onChange={(e) => setPayload({...payload, milk_capacity: parseInt(e.target.value)})}
            sx={{ width: 300 }}
            onWheel={(event) => {
                        (event.target as HTMLInputElement).blur();
                      }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: 'grey' }}>Lt</Typography>
                  </InputAdornment>
                )
              },
              htmlInput: {
                step: "any"
              }
            }}
          />
          <DatePickerComponent
            onDateSelect={(dateSelected) =>
              setPayload({ ...payload, last_calvation_date: dateSelected })
            }
            label="Last Calvation date"
          />
          <DatePickerComponent
            onDateSelect={(dateSelected) =>
              setPayload({ ...payload, date_of_birth: dateSelected })
            }
            label="Date of birth"
          />
          <CheckBoxComp
            label="Pregnant"
            optionSelected={(b) => setPayload({ ...payload, is_pregnant: b })}
          />
          <Button variant="contained" sx={{ fontWeight: 'bold' }} type="submit">Submit</Button>
        </Stack>
      </div>
    </>
  );
};

export default AddStockPage;

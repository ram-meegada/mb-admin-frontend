import { useEffect, useState } from "react";
import {
  pageHeadingStyle,
} from "../../utils/commonUtils";
import "../../styles/ManageStock/StocksListPageStyle.css";
import { LIST_STOCKS_ENDPOINT } from "../../utils/endpoints";
import APICall from "../../utils/callApiUtils";
import { useNavigate } from "react-router-dom";
import ToastComponent from "../../components/ToastComponent";
import { toast } from "react-toastify";
import LoaderModal from "../../components/Loader";
import { useAuth } from "../../contexts/AuthContext";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, ThemeProvider } from "@mui/material";
import { dataGridTheme } from "../../styles/muiStyles";

type dataProps = {
  id: number;
  live_stock_id: string;
  image_url: string;
  breed: string;
  age: string;
  milk_capacity: number;
  parity: number;
  is_pregnant: boolean;
  last_calvation_date: string;
  lactation_month: number;
  purchase_price: number;
};

const StocksListPage = () => {
  const [apiresponse, SetApiResponse] = useState<dataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { accessToken, setAccessToken } = useAuth();

  const navigate = useNavigate();

  const tableHeaders: GridColDef[] = [
    {
      field: "breed",
      headerName: "Breed",
      flex: 1,
      sortable: false,
    },
    {
      field: "purchase_price",
      headerName: "Purchase Price",
      flex: 1,
      sortable: true,
      type: 'number',
      valueFormatter: (value) => (
        `₹ ${value}`
      )
    },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
      sortable: false,
    },
    {
      field: "milk_capacity",
      headerName: "Milk Capacity",
      flex: 1,
      sortable: true,
      type: 'number',
      valueFormatter: (value) => (
        `${value} Lt`
      )
    },
    {
      field: "parity",
      headerName: "Parity",
      flex: 1,
      sortable: true,
      type: 'number'
    },
    {
      field: "is_pregnant",
      headerName: "Pregnant",
      flex: 1,
      sortable: false,
      type: 'boolean'
    },
    {
      field: "last_calvation_date",
      headerName: "Last Calvation Date",
      flex: 1,
      sortable: true
    },
    {
      field: "lactation_month",
      headerName: "Lactation Month",
      flex: 1,
      sortable: true
    },
  ];

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: LIST_STOCKS_ENDPOINT,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken,
      });
      setLoading(false);
      if (response.status === 200) {
        SetApiResponse(response.data);
      }
    }
    getApiResponse();
  }, []);

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Live Stock</h1>
        <Box sx={{ maxHeight: 900, display: "flex", flexDirection: "column" }}>
          <ThemeProvider theme={dataGridTheme}>
            <DataGrid
              rows={apiresponse}
              columns={tableHeaders}
              pageSizeOptions={[10, 20, 30]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
            />
          </ThemeProvider>
        </Box>
      </div>
      <ToastComponent />
    </>
  );
};

export default StocksListPage;

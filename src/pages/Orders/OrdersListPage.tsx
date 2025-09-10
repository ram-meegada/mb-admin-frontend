import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import APICall from "../../utils/callApiUtils";
import { CUSTOMER_BY_ID_ENDPOINT_FE, ORDERS_LIST } from "../../utils/endpoints";
import LoaderModal from "../../components/Loader";
import {
  pageHeadingStyle,
} from "../../utils/commonUtils";
import ToastComponent from "../../components/ToastComponent";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, ThemeProvider } from "@mui/material";
import { dataGridTheme } from "../../styles/muiStyles";


type apiProps = {
  customer: {id: number, name: string};
  subscription: string;
  price_at_order: number;
  is_morning_delivery: boolean;
  status: string
}

const OrdersListPage = () => {
  const { accessToken, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState<apiProps[]>([]);

  const tableHeaders: GridColDef[] = [
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link
          style={{ color: "white" }}
          to={`${CUSTOMER_BY_ID_ENDPOINT_FE.replace(
            ":id",
            String(params.row.customer.id)
          )}`}
        >
          {params.row.customer.name}
        </Link>
      ),
    },
    {
      field: "subscription",
      headerName: "Subscription",
      flex: 2,
      sortable: true,
    },
    {
      field: "price_at_order",
      headerName: "Price",
      flex: 1,
      sortable: true,
      type: "number",
      valueGetter: (value, row) => (row.price_at_order),
      renderCell: (param) => (
        `${param.row.price_at_order} /-`
      )
    },
    {
      field: "is_morning_delivery",
      headerName: "Morning Delivery",
      flex: 1,
      sortable: false,
      type: "boolean",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
    },
  ];

  function onFailureCallBack(message: string) {
    toast.error(message);
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true);
      const response = await APICall({
        method: "POST",
        Accept: "application/json",
        endPoint: ORDERS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken: setAccessToken,
      });
      setLoading(false);
      if (response.status === 200) {
        setApiResponse(response.data);
      }
    }
    getApiResponse();
  }, []);

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Orders</h1>
        <Box sx={{ maxHeight: 900, display: "flex", flexDirection: "column" }}>
          <ThemeProvider theme={dataGridTheme}>
            <DataGrid
              rows={apiResponse}
              columns={tableHeaders}
              pageSizeOptions={[10, 20, 30, 40, 50]}
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

export default OrdersListPage;

import { useEffect, useState } from "react";
import LoaderModal from "../../components/Loader";
import {
  pageHeadingStyle,
} from "../../utils/commonUtils";
import APICall from "../../utils/callApiUtils";
import {
  ADD_ORDERS_ENDPOINT_FE,
  CUSTOMER_BY_ID_ENDPOINT_FE,
  CUSTOMERS_LIST,
} from "../../utils/endpoints";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ToastComponent from "../../components/ToastComponent";
import { useAuth } from "../../contexts/AuthContext";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, ThemeProvider } from "@mui/material";
import { dataGridTheme } from "../../styles/muiStyles";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type apiDataProps = {
  id: number;
  user: { id: number; name: string };
  subscription: string;
  start_date: string;
  delivery_agent: { id: number; name: string };
  schedule: string;
};

const CustomersList = () => {
  const { accessToken, setAccessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [apiResponse, setApiResponse] = useState<apiDataProps[]>([]);

  const tableHeaders: GridColDef<apiDataProps>[] = [
    { field: "id", headerName: "ID", flex: 0.5, type: 'number', sortable: true},
    {
      field: "user",
      headerName: "Customer",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link
          to={`${CUSTOMER_BY_ID_ENDPOINT_FE.replace(
            ":id",
            String(params.row.user.id)
          )}`}
          style={{
            color: 'white',
          }}
        >
          {params.row.user.name}
        </Link>
      ),
    },
    { field: "subscription", headerName: "Subscription", flex: 2, sortable: false },
    {
      field: "start_date",
      headerName: "Start date",
      flex: 1,
      sortable: true,
      valueGetter: (_, row) => {
        return new Date(row.start_date)
      },
      renderCell: (params) => (
        params.row.start_date
      ),
    },
    {
      field: "delivery_agent",
      headerName: "Delivery Agent",
      flex: 1,
      sortable: false,
      valueGetter: (_, row) => {
        return row.delivery_agent.name;
      },
    },
    { field: "schedule", headerName: "Schedule", flex: 1, sortable: false },
    { field: "total_turnover", headerName: "Total Turnover", flex: 1, sortable: true },
    {
      field: "payments_pending_count",
      headerName: "Payments Pending",
      flex: 1,
      sortable: true,
    },
    {
      field: "add_order",
      headerName: "Add Order",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <IconButton
        onClick={() => navigate(`${ADD_ORDERS_ENDPOINT_FE.replace(':id', String(params.row.id))}`, { state: {name: params.row.user.name} })}
        sx={{
          "&:hover": { backgroundColor: "var(--dark-grey-border)" } 
        }}
      >
        <AddCircleOutlineIcon />
      </IconButton>
      )
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
        endPoint: CUSTOMERS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken: setAccessToken,
      });
      setLoading(false);
      if (response.data) {
        setApiResponse(response.data);
      }
    }
    getApiResponse();
  }, []);

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Customers</h1>
        <Box sx={{ maxHeight: 900, display: "flex", flexDirection: "column" }}>
          <ThemeProvider theme={dataGridTheme}>
            <DataGrid
              rows={apiResponse}
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

export default CustomersList;

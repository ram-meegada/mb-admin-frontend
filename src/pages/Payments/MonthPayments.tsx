import { useEffect, useState } from "react";
import {
  pageHeadingStyle,
} from "../../utils/commonUtils";
import LoaderModal from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import APICall from "../../utils/callApiUtils";
import { toast } from "react-toastify";
import ToastComponent from "../../components/ToastComponent";
import {
  CUSTOMER_BY_ID_ENDPOINT_FE,
  PAYMENTS_LIST,
} from "../../utils/endpoints";
import { useAuth } from "../../contexts/AuthContext";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Card, CardContent, Divider, Stack, ThemeProvider, Typography } from "@mui/material";
import { dataGridTheme } from "../../styles/muiStyles";

type apiDataProps = {
  customer: {id: number, name: string};
  amount_due: number;
  amount_paid: number;
  is_paid: boolean;
};

const MonthPayments = () => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<apiDataProps[]>([]);
  const [paymentMonth, setPaymentMonth] = useState("");
  const [totalDue, setTotalDue] = useState("");
  const [totalPaid, setTotalPaid] = useState("");
  const [totalMonthPayment, setTotalMonthPayment] = useState("");
  const [currentYearRevenue, setCurrentYearRevenue] = useState("");


  const tableHeaders: GridColDef<apiDataProps>[] = [
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Link
          to={`${CUSTOMER_BY_ID_ENDPOINT_FE.replace(
            ":id",
            String(params.row.customer.id)
          )}`}
          style={{
            color: "white",
          }}
        >
          {params.row.customer.name}
        </Link>
      ),
    },
    {
      field: "amount_due",
      headerName: "Amount Due",
      flex: 1,
      sortable: true,
      type: "number"
    },
    {
      field: "amount_paid",
      headerName: "Amount Paid",
      flex: 1,
      sortable: true,
      type: "number"
    },
    {
      field: "is_paid",
      headerName: "Paid",
      flex: 1,
      sortable: false,
      type: "boolean"
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
        endPoint: PAYMENTS_LIST,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken,
      });
      setLoading(false);
      if (response.status === 200) {
        setApiResponse(response.data.data);
        setPaymentMonth(response.data.month);
        setTotalDue(response.data.total_due);
        setTotalPaid(response.data.total_paid);
        setTotalMonthPayment(response.data.total_payment);
        setCurrentYearRevenue(response.data.current_year_revenue);
      }
    }
    getApiResponse();
  }, []);

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>{paymentMonth} Month Payments</h1>
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
        <Card sx={{ maxWidth: 400, borderRadius: 2, boxShadow: 3, p: 1, ml: 2.5, mb: 2, backgroundColor: 'var(--dark-grey)'}}>
          <CardContent>
            <Stack spacing={2} divider={<Divider sx={{ bgcolor: 'var(--dark-grey-border)' }}/>}>
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', fontSize: 20 }}>
                  Total Month Payment:
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {totalMonthPayment}/-
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', fontSize: 20 }}>
                  Total Paid:
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {totalPaid}/-
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', fontSize: 20 }}>
                  Total Due:
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {totalDue}/-
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', fontSize: 20 }}>
                  Current Year Revenue:
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {currentYearRevenue}/-
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </div>
      <ToastComponent />
    </>
  );
};

export default MonthPayments;

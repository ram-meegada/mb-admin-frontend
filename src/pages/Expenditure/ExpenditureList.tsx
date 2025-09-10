import { useEffect, useState } from "react";
import LoaderModal from "../../components/Loader";
import {
  pageHeadingStyle,
} from "../../utils/commonUtils";
import ToastComponent from "../../components/ToastComponent";
import { toast } from "react-toastify";
import APICall from "../../utils/callApiUtils";
import { useNavigate } from "react-router-dom";
import { ADD_EXPENDITURE } from "../../utils/endpoints";
import { useAuth } from "../../contexts/AuthContext";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Card, CardContent, Divider, Stack, ThemeProvider, Typography } from "@mui/material";
import { dataGridTheme } from "../../styles/muiStyles";

type apiDataProps = {
  category: string;
  parent_category: string;
  amount: number;
  description: string;
  created_at: string;
};

const ExpenditureList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<apiDataProps[]>([]);
  const [currentYearExpenditure, setCurrentYearExpenditure] = useState("");
  const { accessToken, setAccessToken } = useAuth();

  const tableHeaders: GridColDef<apiDataProps>[] = [
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      sortable: false,
    },
    {
      field: "parent_category",
      headerName: "Main Category",
      flex: 1,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      sortable: true,
      type: "number",
    },
    {
      field: "created_at",
      headerName: "Created On",
      flex: 1,
      sortable: true,
      valueGetter: (value, row) => (
        new Date(row.created_at)
      ),
      renderCell: (params) => (
        params.row.created_at
      )
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
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
        method: "GET",
        Accept: "application/json",
        endPoint: ADD_EXPENDITURE,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken,
      });
      setLoading(false);

      if (response.status === 200) {
        setApiResponse(response.data.data);
        setCurrentYearExpenditure(response.data.current_year_expenditure);
      }
    }
    getApiResponse();
  }, []);

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Expenditure</h1>
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
        <Card sx={{ maxWidth: 400, borderRadius: 2, boxShadow: 3, p: 1, ml: 2.5, backgroundColor: 'var(--dark-grey)' }}>
          <CardContent>
            <Stack spacing={2} divider={<Divider sx={{ bgcolor: 'var(--dark-grey-border)' }}/>}>
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', fontSize: 20 }}>
                  Current Year Expenditure:
                </Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {currentYearExpenditure}/-
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

export default ExpenditureList;

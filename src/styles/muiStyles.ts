import { createTheme } from "@mui/material";

export const dataGridTheme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "--DataGrid-rowBorderColor": "transparent",

          margin: 20,
          backgroundColor: "black", // grid background
          color: "white", // default text
          border: "1px solid var(--dark-grey-border)", // remove outer border

          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid var(--dark-grey-border)", // remove default border
            fontSize: 'medium'
          },
          "& .MuiTablePagination-root": {
            color: "white", // pagination text
          },
          "& .MuiSvgIcon-root": {
            color: "grey", // pagination arrows
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid var(--dark-grey-border)"
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "var(--dark-grey-border)", // subtle hover
          },
          "& .MuiDataGrid-scrollbar": {
            overflow: "hidden" 
          },
          "& .MuiDataGrid-columnHeaders": {
            fontSize: 'large'
          },
          "& .MuiDataGrid-sortIcon": {
            color: 'var(--dark-grey-border)'
          },
          "& .MuiDataGrid-booleanCell[data-value='true']": {
            color: 'green',
            fontWeight: 'bold'
          },
          "& .MuiDataGrid-booleanCell[data-value='false']": {
            color: "red",
            fontWeight: "bold",
          },
        },
      },
    },
  },
});

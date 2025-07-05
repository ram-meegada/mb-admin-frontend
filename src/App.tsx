import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import StocksListPage from "./pages/ManageStock/StocksListPage";
import MonthPayments from "./pages/Payments/MonthPayments";
import {
  ALL_CUSTOMERS_ENDPOINT_FE,
  HOME_ENDPOINT_FE,
  LOGIN_ENDPOINT_FE,
  MONTH_PAYMENTS_ENDPOINT_FE,
  STOCKS_LIST_ENDPOINT_FE,
} from "./utils/endpoints";
import "./App.css";
import CustomersList from "./pages/Customers/CustomersList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN_ENDPOINT_FE} element={<LoginPage />} />
          <Route path={HOME_ENDPOINT_FE} element={<HomePage />} />
          <Route path={STOCKS_LIST_ENDPOINT_FE} element={<StocksListPage />} />
          <Route
            path={MONTH_PAYMENTS_ENDPOINT_FE}
            element={<MonthPayments />}
          />
          <Route path={ALL_CUSTOMERS_ENDPOINT_FE} element={<CustomersList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import StocksListPage from "./pages/ManageStock/StocksListPage";
import MonthPayments from "./pages/Payments/MonthPayments";
import {
  ALL_CUSTOMERS_ENDPOINT_FE,
  CUSTOMER_BY_ID_ENDPOINT_FE,
  EXPENDITURE_ANALYTICS_ENDPOINT_FE,
  EXPENDITURE_LIST_ENDPOINT_FE,
  HOME_ENDPOINT_FE,
  LOGIN_ENDPOINT_FE,
  MONTH_PAYMENTS_ENDPOINT_FE,
  STOCKS_LIST_ENDPOINT_FE,
  VIEW_MONTH_PAYMENT_ENDPOINT_FE,
} from "./utils/endpoints";
import "./App.css";
import CustomersList from "./pages/Customers/CustomersList";
import CutomerDetailsById from "./pages/Customers/CutomerDetailsById";
import ExpenditureList from "./pages/Expenditure/ExpenditureList";
import ExpenditureAnalytics from "./pages/Analytics/ExpenditureAnalytics";
import MonthlyPaymentView from "./pages/Payments/MonthlyPaymentView";

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
          <Route path={CUSTOMER_BY_ID_ENDPOINT_FE} element={<CutomerDetailsById />} />
          <Route path={EXPENDITURE_LIST_ENDPOINT_FE} element={<ExpenditureList />} />
          <Route path={EXPENDITURE_ANALYTICS_ENDPOINT_FE} element={<ExpenditureAnalytics />} />
          <Route path={VIEW_MONTH_PAYMENT_ENDPOINT_FE} element={<MonthlyPaymentView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

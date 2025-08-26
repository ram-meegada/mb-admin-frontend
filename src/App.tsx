import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import StocksListPage from "./pages/ManageStock/StocksListPage";
import MonthPayments from "./pages/Payments/MonthPayments";
import {
  ADD_ORDERS_ENDPOINT_FE,
  ALL_CUSTOMERS_ENDPOINT_FE,
  CUSTOMER_BY_ID_ENDPOINT_FE,
  EXPENDITURE_ADD_ENDPOINT_FE,
  EXPENDITURE_ANALYTICS_ENDPOINT_FE,
  EXPENDITURE_LIST_ENDPOINT_FE,
  HOME_ENDPOINT_FE,
  LOGIN_ENDPOINT_FE,
  MARGIN_ANALYTICS_ENDPOINT_FE,
  MONTH_PAYMENTS_ENDPOINT_FE,
  ORDERS_LISTING_ENDPOINT_FE,
  PAYMENTS_ANALYTICS_ENDPOINT_FE,
  STOCKS_LIST_ENDPOINT_FE,
  VIEW_MONTH_PAYMENT_ENDPOINT_FE,
} from "./utils/endpoints";
import "./App.css";
import CustomersList from "./pages/Customers/CustomersList";
import CutomerDetailsById from "./pages/Customers/CutomerDetailsById";
import ExpenditureList from "./pages/Expenditure/ExpenditureList";
import ExpenditureAnalytics from "./pages/Analytics/ExpenditureAnalytics";
import MonthlyPaymentView from "./pages/Payments/MonthlyPaymentView";
import PaymentsAnalytics from "./pages/Analytics/PaymentsAnalytics";
import MarginAnalytics from "./pages/Analytics/MarginAnalytics";
import OrdersListPage from "./pages/Orders/OrdersListPage";
import AddExpenditure from "./pages/Expenditure/AddExpenditure";
import AddOrderPage from "./pages/Orders/AddOrderPage";

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
          <Route path={EXPENDITURE_ADD_ENDPOINT_FE} element={<AddExpenditure />} />
          <Route path={EXPENDITURE_ANALYTICS_ENDPOINT_FE} element={<ExpenditureAnalytics />} />
          <Route path={VIEW_MONTH_PAYMENT_ENDPOINT_FE} element={<MonthlyPaymentView />} />
          <Route path={PAYMENTS_ANALYTICS_ENDPOINT_FE} element={<PaymentsAnalytics />} />
          <Route path={MARGIN_ANALYTICS_ENDPOINT_FE} element={<MarginAnalytics />} />
          <Route path={ORDERS_LISTING_ENDPOINT_FE} element={<OrdersListPage />} />
          <Route path={ADD_ORDERS_ENDPOINT_FE} element={<AddOrderPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/Auth/LoginPage";
import StocksListPage from "./pages/ManageStock/StocksListPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/stocks-list" element={<StocksListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

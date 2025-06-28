import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from "./pages/Auth/LoginPage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

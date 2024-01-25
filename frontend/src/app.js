import React from "react";

import SignUpPage from "./pages/signUpPage/SignUpPage";
import MoneyMattersPage from "./pages/moneyMattersPage/MoneyMattersPage";
import ConfirmationAndSubmitPage from "./pages/confirmationAndSubmitPage/ConfirmationAndSubmitPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/moneyMattersForm" element={<MoneyMattersPage />} />
        <Route path="/submit" element={<ConfirmationAndSubmitPage />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};
export default App;

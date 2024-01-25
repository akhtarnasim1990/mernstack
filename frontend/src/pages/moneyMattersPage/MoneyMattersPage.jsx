import React, { useState } from "react";
import "./MoneyMattersPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MoneyMattersPage = () => {
  const navigate = useNavigate();
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  const signupHandler = async () => {
    try {
      const config = {
        "x-access-token": localStorage.getItem("token"),
      };
      const data = {
        income,
        expenses,
        savings,
      };
      axios
        .post("http://localhost:3000/api/financial-details", data, { headers: config })
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
          navigate("/submit");
        })
        .catch((error) => {
          console.log("line 52", error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.log("line 57", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="main-container">
      <div className="content">
        <div className="body">
          <div className="row">
            <label>Income</label>
            <input type="number" placeholder="Income" value={income} onChange={(e) => setIncome(e.target.value)} />
          </div>
          <div className="row">
            <label>Expenses</label>
            <input type="number" placeholder="Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
          </div>
          <div className="row">
            <label>Savings</label>
            <input type="number" placeholder="Enter your email..." value={savings} onChange={(e) => setSavings(e.target.value)} />
          </div>
          <div className="btn-div">
            <button className="signup" onClick={signupHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyMattersPage;

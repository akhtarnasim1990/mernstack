import React, { useState } from "react";
import "./ConfirmationAndSubmitPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ConfirmationAndSubmitPage = () => {
  const navigate = useNavigate();
  const cancelHandler = () => {
    navigate("/");
  };

  const submitHandler = () => {
    try {
      const config = {
        "x-access-token": localStorage.getItem("token"),
      };
      axios
        .post("http://localhost:3000/api/submit", {}, { headers: config })
        .then((response) => {
          console.log(response);
          toast.success(response.data.message);
          navigate("/");
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
        <div className="body" style={{ display: "flex", flexDirection: "row" }}>
          <div className="btn-div">
            <button className="signup" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
          <div className="btn-div">
            <button className="signup" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAndSubmitPage;

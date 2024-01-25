import React, { useState } from "react";
import "./SignUpPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async () => {
    try {
      if (firstname === "") {
        return toast.warn("Please enter first name.");
      } else if (lastname === "") {
        return toast.warn("Please enter last name.");
      } else if (email === "") {
        return toast.warn("Please enter your email.");
      } else if (!validator.isEmail(email)) {
        return toast.warn("Please enter your valid or correct email.");
      } else if (password === "") {
        return toast.warn("Please enter your password.");
      } else {
        const data = {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
        };
        axios
          .post("http://localhost:3000/api/user/check-email", { email })
          .then((response) => {
            console.log("email chechking ...", response);
            if (response.data.success) {
              axios
                .post("http://localhost:3000/api/user/signup", data)
                .then((response) => {
                  console.log(response);
                  if (response.data.success) {
                    localStorage.setItem("token", response.data.userToken);
                    toast.success(response.data.message);
                    navigate("/moneyMattersForm");
                  }
                })
                .catch((error) => {
                  console.log("line 46", error);
                  toast.error(error.response.data.message);
                });
            }
          })
          .catch((error) => {
            console.log("line 52", error);
            toast.error(error.response.data.message);
          });
      }
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
            <label>First name</label>
            <input type="text" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div className="row">
            <label>Last name</label>
            <input type="text" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div className="row">
            <label>Email</label>
            <input type="email" placeholder="Enter your email..." value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="row">
            <label>Password</label>
            <input type="password" placeholder="Enter your password..." value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="btn-div">
            <button className="signup" onClick={signupHandler}>
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

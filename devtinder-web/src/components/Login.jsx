import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggined, setIsLoggined] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        return navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
   const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        return navigate("/profile");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center mx-auto mt-24">
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
          <div className="alert alert-success shadow-lg">
            <span>{isLoggined? "Logged in successfully!" : "Signuped Successfully"}</span>
          </div>
        </div>
      )}
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoggined ? "Login" : "Sign up"}
          </h2>
          {!isLoggined && (
            <>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
              </div>
            </>
          )}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="card-action flex justify-center pt-2">
            <button className="btn btn-primary" onClick={isLoggined?handleLogin:handleSignup}>
              {isLoggined ? "Login":"Sign up"}
            </button>
          </div>
          <p className="cursor-pointer m-auto my-4" onClick={()=>setIsLoggined(!isLoggined)}>{isLoggined ? "New User ? Sign up":"Existing User ? Login"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

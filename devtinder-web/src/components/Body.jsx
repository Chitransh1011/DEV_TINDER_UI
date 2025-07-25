import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    if (userData) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error)
      if (error.status === 401) {
        return navigate("/login");
      }
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Outlet />
      <Footer />
      </div>
    </>
  );
};

export default Body;

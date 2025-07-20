import React, { useEffect } from "react";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
        console.error(error);
    }
  };
  useEffect(()=>{
    getFeed();
  },[])
  return (
    <div className="flex justify-center mt-8 pb-20">
        {feed && 
        (<UserCard user={feed?.data[0]} />)
        }
    </div>
    );
};

export default Feed;

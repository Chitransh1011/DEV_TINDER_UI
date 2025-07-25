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
  if(!feed)return;
  if(feed?.data.length<=0)return (
    <div className="flex flex-col justify-center">
      <h1 className="font-bold text-3xl mx-auto mt-10">No user Found</h1>
  </div>
)
  return (
    <div className="flex justify-center mt-8 pb-20">
        {feed && 
        (<UserCard user={feed?.data[0]} />)
        }
    </div>
    );
};

export default Feed;

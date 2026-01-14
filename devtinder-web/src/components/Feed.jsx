import React, { useEffect, useState } from "react";
import UserCard from "./userCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  
  const getFeed = async () => {
    if (feed) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] pb-20">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full animate-ping"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
          </div>
          <p className="text-gray-400 text-lg font-medium">Finding amazing developers...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!feed || feed?.data.length <= 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] px-4 pb-20">
        <div className="text-center max-w-md animate-scale-in">
          <div className="mb-6">
            <svg
              className="w-32 h-32 mx-auto text-gray-600 animate-float"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            No Developers Found
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Looks like everyone's been discovered! Check back later for new profiles.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={getFeed}
              className="btn-gradient-primary px-6 py-3 rounded-lg"
            >
              Refresh Feed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-4rem)] px-4 py-8 sm:py-12 pb-20">
      <div className="animate-scale-in">
        {feed && <UserCard user={feed?.data[0]} />}
      </div>
    </div>
  );
};

export default Feed;

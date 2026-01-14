import React, { useEffect, useState } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);
  const [isLoading, setIsLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequest = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
        <h1 className="font-bold text-3xl text-center mb-8 text-white">Requests</h1>
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 flex flex-col md:flex-row md:items-center gap-6 animate-pulse">
              <div className="skeleton w-20 h-20 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="skeleton h-6 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-16 w-full"></div>
                <div className="flex gap-2">
                  <div className="skeleton h-6 w-16"></div>
                  <div className="skeleton h-6 w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!request) return null;

  // Empty State
  if (request.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen flex items-center justify-center">
        <div className="text-center animate-scale-in">
          <svg
            className="w-32 h-32 mx-auto text-gray-600 mb-6 animate-float"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <h1 className="text-3xl font-bold text-white mb-3">No Pending Requests</h1>
          <p className="text-gray-400 text-lg">You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="font-bold text-4xl text-white mb-2">
          Connection Requests
        </h1>
        <p className="text-gray-400">You have {request.length} pending request{request.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex flex-col gap-6">
        {request.map((data, index) => {
          const {
            _id,
            firstName,
            lastName,
            age,
            photoUrl,
            gender,
            about,
            skills,
            isPremium,
          } = data.fromUserId;

          return (
            <div
              key={_id}
              className="glass-card p-6 flex flex-col md:flex-row md:items-center gap-6 text-white card-hover hover:border-purple-500/30 transition-all"
            >
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={photoUrl}
                  alt="photo"
                  className="w-24 h-24 rounded-full object-cover border-2 border-purple-500/30 hover:border-purple-400/50 transition-colors"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap justify-center md:justify-start">
                  <h2 className="text-2xl font-bold">
                    {firstName + " " + lastName}
                  </h2>
                  {isPremium && (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <img
                        src="https://cdn-icons-png.freepik.com/256/14026/14026218.png?semt=ais_white_label"
                        className="w-3 h-3"
                        alt="premium"
                      />
                      <span className="text-xs font-bold text-gray-900">PRO</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-2 text-center md:text-left">
                  {age} • {gender}
                </p>
                <p className="text-gray-300 mb-3 line-clamp-2 text-center md:text-left">{about}</p>

                <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                  {skills.map((skill, i) => (
                    <span
                      key={skill + i}
                      className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto justify-center">
                <button
                  className="flex-1 md:flex-none bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
                  onClick={() => reviewRequest("accepted", data._id)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accept
                </button>
                <button
                  className="flex-1 md:flex-none bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
                  onClick={() => reviewRequest("rejected", data._id)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

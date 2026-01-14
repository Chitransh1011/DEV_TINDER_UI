import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connections);
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnection = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
        <h1 className="font-bold text-3xl text-center mb-8 text-white">Connections</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card p-6 flex gap-4 items-start animate-pulse">
              <div className="skeleton w-20 h-20 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="skeleton h-6 w-3/4"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-16 w-full"></div>
                <div className="flex gap-2">
                  <div className="skeleton h-6 w-16"></div>
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

  if (!connection) return null;

  // Empty State
  if (connection.length === 0) {
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold text-white mb-3">No Connections Yet</h1>
          <p className="text-gray-400 text-lg">Start exploring to make new connections!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="font-bold text-4xl text-white mb-2">
          My Connections
        </h1>
        <p className="text-gray-400">You have {connection.length} connection{connection.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connection.map((data) => {
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
          } = data;

          return (
            <div
              key={_id}
              className="glass-card p-6 flex flex-col sm:flex-row gap-4 items-start hover:border-purple-500/30 transition-all duration-300 card-hover"
            >
              <div className="flex-shrink-0">
                <img
                  src={photoUrl}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/30 hover:border-purple-400/50 transition-colors"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="text-xl font-bold text-white">
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

                <p className="text-sm text-gray-400 mb-2">
                  {age} • {gender}
                </p>

                <p className="text-gray-300 mb-3 text-sm line-clamp-2">{about}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2 py-1 text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {isPremium ? (
                  <Link to={`/chat/${_id}`}>
                    <button className="btn-gradient-success px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Chat Now
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-gray-700 text-gray-500 px-4 py-2 rounded-lg text-sm opacity-50 cursor-not-allowed flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Premium Only
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

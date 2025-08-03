import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connections);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connection) return null;

  if (connection.length === 0)
    return (
      <h1 className="text-center text-2xl font-semibold mt-10 text-gray-300">
        No Connection Found
      </h1>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="font-bold text-3xl text-center mb-8 text-white">
        Connections
      </h1>

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
              className="bg-gray-800 shadow-md rounded-lg p-6 flex gap-4 items-start"
            >
              <img
                src={photoUrl}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-600"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-white">
                    {firstName + " " + lastName}
                  </h2>
                  {isPremium && (
                    <img
                      src="https://cdn-icons-png.freepik.com/256/14026/14026218.png?semt=ais_white_label"
                      className="w-5 h-5"
                      alt="premium"
                    />
                  )}
                </div>

                <p className="text-sm text-gray-400 mb-1">
                  {age} &bull; {gender}
                </p>

                <p className="text-gray-300 mb-2">{about}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-200 border border-gray-600 px-2 py-1 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <Link to={`/chat/${_id}`}>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;

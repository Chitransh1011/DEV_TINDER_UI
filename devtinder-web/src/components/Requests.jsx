import React, { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);

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
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request) return null;

  if (request.length === 0)
    return (
      <h1 className="text-center text-2xl font-semibold mt-10 text-gray-300">
        No Request Found
      </h1>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="font-bold text-3xl text-center mb-8 text-white">
        Requests
      </h1>

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
              className="bg-gray-800 shadow-md rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-6 text-white"
            >
              <div>
                <img
                  src={photoUrl}
                  alt="photo"
                  className="w-20 h-20 rounded-full object-cover border border-gray-600"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold">
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
                  {skills.map((skill, i) => (
                    <span
                      key={skill + i}
                      className="bg-gray-700 text-gray-200 border border-gray-600 px-2 py-1 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 md:ml-4">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                  onClick={() => reviewRequest("accepted", data._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                  onClick={() => reviewRequest("rejected", data._id)}
                >
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

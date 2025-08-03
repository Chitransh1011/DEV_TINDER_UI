import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
    isPremium,
  } = user;

  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-800 text-white w-96 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden">
      <div className="w-full aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={photoUrl}
          alt="photo"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold">
            {firstName + " " + lastName}
          </h2>
          {isPremium && (
            <img
              src="https://cdn-icons-png.freepik.com/256/14026/14026218.png?semt=ais_white_label"
              alt="premium"
              className="w-5 h-5"
            />
          )}
        </div>

        {age && gender && (
          <p className="text-sm text-gray-400 mb-1">
            {age}, {gender}
          </p>
        )}

        <p className="text-gray-300 mb-4">{about}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(skills) &&
            skills.map((skill, index) => (
              <span
                className="bg-gray-700 border border-gray-600 text-sm px-3 py-1 rounded-full"
                key={index}
              >
                {skill}
              </span>
            ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition"
            onClick={() => handleFeed("interested", _id)}
          >
            Interested
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white transition"
            onClick={() => handleFeed("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
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
    <div className="glass-card w-full max-w-sm sm:max-w-md lg:max-w-lg overflow-hidden card-hover shadow-2xl animate-scale-in">
      {/* Image Section */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-900">
        <img
          className="w-full h-full object-cover"
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
        />
        {isPremium && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <img
              src="https://cdn-icons-png.freepik.com/256/14026/14026218.png?semt=ais_white_label"
              alt="premium"
              className="w-4 h-4"
            />
            <span className="text-xs font-bold text-gray-900">PREMIUM</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Name and Age */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            {firstName + " " + lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {age} years old • {gender}
            </p>
          )}
        </div>

        {/* About */}
        {about && (
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {about}
          </p>
        )}

        {/* Skills */}
        {Array.isArray(skills) && skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 text-xs px-3 py-1.5 rounded-full font-medium hover:border-purple-400/50 transition-colors"
                  key={index}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
              onClick={() => handleFeed("ignored", _id)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="hidden sm:inline">Pass</span>
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
              onClick={() => handleFeed("interested", _id)}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="hidden sm:inline">Like</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

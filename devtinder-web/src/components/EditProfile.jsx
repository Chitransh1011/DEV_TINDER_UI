import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || 1);
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const stringToArray = (skills) => {
    if (typeof skills === "string") {
      return skills.split(',').map(s => s.trim());
    }
    return skills;
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-4 sm:p-6 min-h-screen animate-fade-in">
        {/* Form Card */}
        <div className="w-full max-w-md glass-card shadow-2xl">
          <div className="p-6 sm:p-8 space-y-5">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Edit Profile
            </h2>

            {[
              { label: "First Name", value: firstName, setter: setFirstName, type: "text", placeholder: "John" },
              { label: "Last Name", value: lastName, setter: setLastName, type: "text", placeholder: "Doe" },
              { label: "Photo URL", value: photoUrl, setter: setPhotoUrl, type: "text", placeholder: "https://..." },
              { label: "Age", value: age, setter: setAge, type: "number", placeholder: "25" },
              { label: "Gender", value: gender, setter: setGender, type: "text", placeholder: "Male/Female/Other" },
              { label: "Skills (comma separated)", value: skills, setter: (val) => setSkills(stringToArray(val)), type: "text", placeholder: "React, Node, Python" },
            ].map(({ label, value, setter, type, placeholder }, idx) => (
              <div key={idx}>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  value={Array.isArray(value) ? value.join(", ") : value}
                  onChange={(e) => setter(e.target.value)}
                  placeholder={placeholder}
                  className="input-modern"
                />
              </div>
            ))}

            {/* About Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                About
              </label>
              <textarea
                className="input-modern min-h-[100px] resize-none"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Save Button */}
            <button 
              className="w-full btn-gradient-primary py-3 px-4 rounded-lg shadow-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105" 
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div className="w-full lg:w-auto mt-6 lg:mt-0">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-300">Preview</h3>
            <p className="text-sm text-gray-500">See how your profile looks</p>
          </div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
            showActions={false}
          />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl border border-green-500 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Profile saved successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

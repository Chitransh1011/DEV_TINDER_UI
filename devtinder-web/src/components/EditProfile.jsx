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
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-6 dark:bg-base-200 min-h-screen">
        {/* Form Card */}
        <div className="w-full max-w-md card bg-base-300 shadow-xl">
          <div className="card-body space-y-4">
            <h2 className="card-title justify-center text-lg">Edit Profile</h2>

            {[
              { label: "First Name", value: firstName, setter: setFirstName },
              { label: "Last Name", value: lastName, setter: setLastName },
              { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
              { label: "Age", value: age, setter: setAge },
              { label: "Gender", value: gender, setter: setGender },
              { label: "Skills (comma separated)", value: skills, setter: (val) => setSkills(stringToArray(val)) },
            ].map(({ label, value, setter }, idx) => (
              <label className="form-control w-full" key={idx}>
                <span className="label-text mb-1">{label}</span>
                <input
                  type="text"
                  value={Array.isArray(value) ? value.join(", ") : value}
                  onChange={(e) => setter(e.target.value)}
                  className="input input-bordered w-full"
                />
              </label>
            ))}

           
            <label className="form-control w-full">
              <span className="label-text mb-1">About</span>
              <textarea
                className="textarea textarea-bordered w-full min-h-[80px]"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>

          
            {error && <p className="text-error text-sm">{error}</p>}

          
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

       
        <div className="mt-6 lg:mt-0">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
          />
        </div>
      </div>

      
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

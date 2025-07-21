import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id,firstName, lastName, photoUrl, age, gender, about, skills } = user;
  console.log(_id)
  const dispatch = useDispatch();
  const handleFeed = async(status,userId)=>{
    try {
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
      console.log(userId)
      dispatch(removeFeed(userId))
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-xl flex flex-wrap">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="flex flex-wrap m-3">
          { Array.isArray(skills) &&
            skills.map((skill, index) => (
              <span
                className="border-4 p-2 m-2 rounded-lg border-white"
                key={index}
              >
                {skill}
              </span>
            ))}
        </div>

        <div className="card-actions justify-center my-4">
          <button className="btn btn-success mr-3" onClick={()=>handleFeed("interested",_id)}>Interested</button>
          <button className="btn btn-error" onClick={()=>handleFeed("ignored",_id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;

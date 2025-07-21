import React, { useEffect } from "react";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);
  const reviewRequest = async(status,_id)=>{
    try {
      const res = await axios.post(BASE_URL+"/request/review"+"/"+status+"/"+_id,{},{withCredentials:true});
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error)
    }
  }
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

  if (!request) return;

  if (request.length === 0) return <h1>No Request Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mt-4">Requests</h1>

      {request.map((data, index) => {
        const { _id,firstName, lastName, age, photoUrl, gender, about, skills } =
          data.fromUserId;
        return (
          <div
            key={_id}
            className="flex flex-wrap m-4 p-4 bg-base-300 rounded w-1/2 mx-auto"
          >
            <div key={_id+index+1}>
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div key={_id+index+2} className="text-left mx-4">
              <h2>{firstName + " " + lastName}</h2>
              <p>{age + " , " + gender}</p>
              <p className="mb-2">{about}</p>
              <p>
                {skills.map((skill,i) => {
                  return (
                    <span key={skill+i} className="mr-2 border rounded-lg p-0.5">
                      {skill}
                    </span>
                  );
                })}
              </p>
            </div>
            <div key={_id+index+3} className="ml-4 my-auto justify-items-center">
                <button className="btn btn-success ml-8 mr-10" onClick={()=>reviewRequest("accepted",data._id)}>Accept</button>
                <button className="btn btn-error" onClick={()=>reviewRequest("rejected",data._id)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

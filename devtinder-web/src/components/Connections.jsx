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

  if (!connection) return;

  if (connection.length === 0) return <h1>No Connection Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mt-4">Connections</h1>

      {connection.map((data, index) => {
        const { _id,firstName, lastName, age, photoUrl, gender, about, skills } =
          data;
        return (
          <div
            key={_id}
            className="flex flex-wrap m-4 p-4 bg-base-300 rounded w-1/2 mx-auto"
          >
            <div>
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2>{firstName + " " + lastName}</h2>
              <p>{age + " , " + gender}</p>
              <p className="mb-2">{about}</p>
              <p>
                {skills.map((skill) => {
                  return (
                    <span className="mr-2 border rounded-lg p-0.5">
                      {skill}
                    </span>
                  );
                })}
              </p>
            </div>
            <Link to={"/chat/"+_id}><button className="btn btn-primary">Chat</button></Link>
          </div>
          
        );
      })}
      
    </div>
  );
};

export default Connections;

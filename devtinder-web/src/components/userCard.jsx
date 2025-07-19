import React from "react";

const UserCard = ({ user }) => {
  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm bottom-4">
        <figure>
          <img src={user?.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold text-primary">
            {user.firstName}
          </h2>
          <p className="text-sm text-gray-600">
            Age: <span className="font-medium">{user.age}</span>
          </p>
          <p className="text-sm text-gray-600">
            Gender: <span className="font-medium">{user.gender}</span>
          </p>
          <p className="text-sm text-gray-600 mb-2">
            About: <span className="italic">{user.about}</span>
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-outline badge-primary text-xs px-3 py-1"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Interested</button>
            <button className="btn btn-primary">Ignore</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;

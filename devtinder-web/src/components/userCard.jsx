const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
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
          <button className="btn btn-success mr-3">Interested</button>
          <button className="btn btn-error">Ignore</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;

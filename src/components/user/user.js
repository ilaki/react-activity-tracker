import React from "react";
import "./user.css";

const User = ({username,userId,userTimeZone,openActivities}) => {

  return (
    <div className="user" onClick={() => openActivities(username,userId,userTimeZone)}>
      <div className="user-item user-id"> {userId}</div>
      <div className="user-item user-name">{username}</div>
      <div className="user-item user-timezone">{userTimeZone}</div>
    </div>
  );
};

export default User;

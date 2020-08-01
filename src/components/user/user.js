import React from "react";

const User = (props) => {
  const currentUser = props.children;

  return (
    <div className="user" onClick={() => props.openActivities(currentUser)}>
      <div className="user-item user-id"> {props.userId}</div>
      <div className="user-item user-name">{currentUser}</div>
      <div className="user-item user-timezone">{props.userTimeZone}</div>
    </div>
  );
};

export default User;

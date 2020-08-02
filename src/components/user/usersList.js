
//Component controls opening Modal and sending particular user data based on user choice

import React, { useState, useEffect } from "react";
import User from "./user";
import ActivitiesModal from "../activities/activities.modal";
import data from "../../data/activities.json"; // sample user data
import moment from "moment";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const UsersList = () => {
  /**states setting 1.userlist if delimited by calender
                  2.current user who got clicked
                  3.current users activity
                  4.flag to open the modal
                  5.loading spinner for initial loading 
  **/
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserActivities, setCurrentUserActivities] = useState([]);
  const [openActivityModal, setOpenActivityModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // initially load users once , faking async user loading with timeout
    setTimeout(() => {
      setUsers([...data.members]);
      setIsLoading(false);
    }, 1000);
  }, []);

  //func to open up the activities of the user who has been clicked
  const openActivities = (currentUser) => {
    setCurrentUser(currentUser);
    const userData = users.filter((user) => user["real_name"] === currentUser);
    let activityPeriods = [...userData[0].activity_periods];
    let formattedActivity = formatActivity(activityPeriods);
    setCurrentUserActivities(formattedActivity);
    setOpenActivityModal(true);
  };

  //includes closing modal as well as oter func.
  const userActivityClosed = () => {
    setOpenActivityModal(false);
  };

  //funtion to change the date string provided to correct format (only applies to the current given JSON format)
  const formatActivity = (activityPeriods) => {
    const activityPeriodsFormatted = activityPeriods.map((activityPeriod) => {
      let startTimePeriod = activityPeriod.start_time;
      let endTimePeriod = activityPeriod.end_time;
      let [startMonth, startDate, startYear, startTime] = startTimePeriod.split(
        " "
      );
      let [endMonth, endDate, endYear, endTime] = endTimePeriod.split(" ");
      let startTimeIn24HrsFormat = moment(startTime, "hh:mmA").format("HH mm");
      let [startHour, startMinute] = startTimeIn24HrsFormat.split(" ");
      let endTimeIn24HrsFormat = moment(endTime, "hh:mmA").format("HH mm");
      let [endHour, endMinute] = endTimeIn24HrsFormat.split(" ");
      let duration = 0;

      if (startDate !== endDate) {
        duration =
          (24 - Number(startHour) + Number(endHour)) * 60 +
          (Number(endMinute) - Number(startMinute));
      } else {
        duration =
          (Number(endHour) - Number(startHour)) * 60 +
          (Number(endMinute) - Number(startMinute));
      }

      activityPeriod = {
        ...activityPeriod,
        startMonth,
        startDate,
        startYear,
        startHour,
        startTime,
        endTime,
        duration,
      };
      return activityPeriod;
    });

    return activityPeriodsFormatted;
  };
  return (
    <div className="landing-page">
      {isLoading ? (
        <Loader
          /* loading spinner settings*/

          className="landing-page-loader"
          type="grid"
          color="rgba(54,56,59,0.2)"
          height={50}
          width={50}
        />
      ) : (
        <div className="users-list">
          {users.map((user) => (
            <User
              userId={user.id}
              userTimeZone={user.tz}
              openActivities={openActivities}
            >
              {user.real_name}
            </User>
          ))}
          {openActivityModal ? (
            <ActivitiesModal
              currentUser={currentUser}
              activities={currentUserActivities}
              openModal={openActivityModal}
              userActivityClosed={userActivityClosed}
            />
          ) : (
            <div></div>
          )}
          ;
        </div>
      )}
    </div>
  );
};

export default UsersList;

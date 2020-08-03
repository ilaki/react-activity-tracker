//Component controls opening Modal and sending particular user data based on user choice
import React, { useState, useEffect } from "react";
import User from "../user/user";
import ActivitiesModal from "../activities/activities.modal";
import data from "../../data/activities.json"; // sample user data
import moment from "moment";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./users.list.css";

const UsersList = () => {
  /**states setting 1.userlist if delimited by calender
                  2.current user who got clicked
                  3.current users activity
                  4.flag to open the modal
                  5.loading spinner for initial loading 
                  6.sliding of title effect on scroll
  **/
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({username : '' , id : '', tz : ''});
  const [currentUserActivities, setCurrentUserActivities] = useState([]);
  const [openActivityModal, setOpenActivityModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [translateTitle, setTranslateTitle] = useState("translateY(0px)")

  const listenScrollEvent = () => {
      window.scrollY > 35
        ? setTranslateTitle("translateY(-200px)")
        : setTranslateTitle("translateY(0px)")
    }

  useEffect(() => {
    // initially load users once , faking async user loading with timeout
    setTimeout(() => {
      setUsers([...data.members]);
      setIsLoading(false);
    }, 1000);

    window.addEventListener("scroll", listenScrollEvent);

    return ()=> {
      window.removeEventListener("scroll",listenScrollEvent);
    }

  }, []);

  //func to open up the activities of the user who has been clicked
  const openActivities = (username,id,tz) => {
    setCurrentUser({username,id,tz});
    const userData = users.filter((user) => user["id"] === id);
    let activityPeriods = [...userData[0].activity_periods];
    let formattedActivity = formatActivity(activityPeriods);
    setCurrentUserActivities(formattedActivity);
    setOpenActivityModal(true);
  };

  //includes closing modal as well as other func.
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
        /*loading spinner component*/
        <Loader
          type="grid"
          color="rgba(54,56,59,0.2)"
          height={50}
          width={50}
        />
      ) : (
        <>
        <h1 style = {{transform : translateTitle}} className = "landing-title">Activity Tracker</h1>
        <div className="users-list">
          {users.map((user,index) => (
            <User 
              key={user.id+index}
              userId={user.id}
              username={user["real_name"]}
              userTimeZone={user.tz}
              openActivities={openActivities}
            />
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
          
        </div>
        </>
      )}
    </div>
  );
};

export default UsersList;

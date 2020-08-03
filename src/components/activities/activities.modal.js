//component that responds to input from users list component to display data in modal

//imports
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import ActivityDetails from "../activity-details/activity.details";

import { FaWindowClose } from "react-icons/fa";

//datepicker npm package for calender widget
import "react-datepicker/dist/react-datepicker.css";
import "./activities.modal.css";

//modal component to display activities of a particular user on clicking them
function ActivitiesModal({
  currentUser,
  activities,
  openModal = false,
  userActivityClosed,
}) {
  Modal.setAppElement("body"); 

  //states to hold modal openstate , loading state and query activities by date
  const [dateTime, setDateTime] = useState(new Date());
  const [activitiesByDate, setActivitiesByDate] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // opening modal and clean up
  useEffect(() => {
    if (openModal) setModalIsOpen(true);
  }, []);

  //limiting activities based on date
  useEffect(() => {
    limitActivitiesByDate(dateTime);
  }, [dateTime]);

  //date setter
  const onChangeDate = (date) => {
    if (date) setDateTime(date);
  };

  //updating activities on date change
  const limitActivitiesByDate = (date) => {
    //utility to convert 3 digit month format to number
    const monthToNumber = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    // filtering activities based on date selected
    let filteredActivities = activities.filter(
      (activity) =>
        activity.startDate == dateTime.getDate() &&
        monthToNumber[activity.startMonth] == dateTime.getMonth() &&
        activity.startYear == dateTime.getFullYear()
    );

    if (filteredActivities.length === 0) {
      filteredActivities = ["no activity exists for the date"];
    }
    setActivitiesByDate(filteredActivities);
  };

  //updating parent (user list of user activity modal closed when modal closed)
  const handleModalClose = () => {
    userActivityClosed();
  };
  
  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={modalIsOpen}
      onRequestClose={()=>setModalIsOpen(false)}
      onAfterClose={handleModalClose}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      portalClassName="portal-root"
    >
      <div className="modal-header">
        <h2 className="modal-title">{currentUser["username"]}</h2>

        <DatePicker
          className="modal-date-picker"
          selected={dateTime}
          onChange={onChangeDate}
        ></DatePicker>
        
        <div className = "modal-userdetails">
        <code className = "modal-userid">{currentUser["id"]}</code>
        <code className = "modal-userzone">{currentUser["tz"]}</code>
        </div>

      </div>
      <hr />

      <ul className="modal-list">
        {activities.length === 0
          ? "no activity for the user exists"
          : activities.length &&
            activitiesByDate.length &&
            activitiesByDate[0] !== "no activity exists for the date"
          ? activitiesByDate.map((activity,index) => (
              <li
                key={currentUser.id + index}
                className="modal-list-item"
              >
                <ActivityDetails activity={activity} />
              </li>
            ))
          : 
          (activitiesByDate[0] === "no activity exists for the date")
          ? activitiesByDate[0]
          : activities.map((activity,index) => (
              <li
                key={currentUser.id+index}
                className="modal-list-item"
              >
                <ActivityDetails activity={activity} />
              </li>
            ))}
      </ul>

      <FaWindowClose
        className="modal-close-btn"
        name="closeModal"
        onClick={()=>setModalIsOpen(false)}
      ></FaWindowClose>
    </Modal>
  );
}

export default ActivitiesModal;
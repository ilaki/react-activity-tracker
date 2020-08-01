//component that responds to input from users list component to display data in modal

//imports
import React, { useState, useEffect , useRef } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import ActivityDetails from "./activity.details";

import { FaWindowClose } from 'react-icons/fa';

//datepicker npm package for calender widget
import "react-datepicker/dist/react-datepicker.css";

//modal component to display activities of a particular user on clicking them
function ActivitiesModal({ currentUser, activities, openModal, closeModal }) {
  Modal.setAppElement("body"); //this is set to avoid premature loading of modal script before DOM render,
                                            // can be set to app as well if need be

  //states to hold modal openstate , loading state and query activities by date
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [activitiesByDate, setActivitiesByDate] = useState([]);

  console.log('rendering modal')

  const didMount = useRef(false);


  //initial giving control of opening modal to parent
  useEffect(() => {
    if (openModal) setModalIsOpen(true);
  }, [openModal]);

  //rerender on change of date in calender
  useEffect(() => {
    console.log("inside dateTime useeffect");
    if(didMount.current) limitActivitiesByDate(dateTime);
    else didMount.current = true;
  }, [dateTime]);

  //rerender whenver activities change
  useEffect(() => {
    console.log("acitivities limited ...........");
  }, [activitiesByDate]);

  //date setter
  const onChangeDate = (date) => {
    console.log("inside oncange date");
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

    //filtering activities based on date selected
    let filteredActivities = activities.filter(
      (activity) =>
        activity.startDate == dateTime.getDate() &&
        monthToNumber[activity.startMonth] == dateTime.getMonth() &&
        activity.startYear == dateTime.getFullYear()
    );

    if (filteredActivities.length === 0)
      filteredActivities = ["no activity exists for the date"];
    setActivitiesByDate(filteredActivities);
  };

  const handleModalClose = ()=> {
    console.log('modal closing..')
    setModalIsOpen(false);
    setDateTime(new Date());
  }
  
  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      onAfterClose={closeModal()}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick = {true}
      shouldCloseOnEsc = {true}
      portalClassName="portal-root"   
    >
      <div className="modal-header">
        <h1 className="modal-title">{currentUser}</h1>

        <DatePicker
          className="modal-date-picker"
          selected={dateTime}
          onChange={onChangeDate}
        ></DatePicker>
      </div>
      <hr />

      <ul className="modal-list">
        {activities.length === 0
          ? "no activity for the user exists"
          : (activities.length &&
            activitiesByDate.length &&
            activitiesByDate[0] !== "no activity exists for the date")
          ? activitiesByDate.map((activity) => (
              <li
                key={`currentUser${Math.random()}`}
                className="modal-list-item"
              >
                <ActivityDetails activity={activity} />
              </li>
            ))
          : //can use uuid here
          activitiesByDate[0] === "no activity exists for the date"
          ? activitiesByDate[0]
          : activities.map((activity) => (
            <li
              key={`currentUser${Math.random()}`}
              className="modal-list-item"
            >
              <ActivityDetails activity={activity} />
            </li>
          ))}
      </ul>

      <FaWindowClose
        className="modal-close-btn"
        name="closeModal"
        onClick={handleModalClose}
      >
      </FaWindowClose>
    </Modal>
  );
}

export default ActivitiesModal;

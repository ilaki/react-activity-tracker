///component that fill the activity card/modal of a particular user
import React from 'react';

const ActivityDetails = ({activity}) => {

    let color = '';
    const duration = activity.duration;
    const maxDuration = 600; //manually setting arbitrary max limit aka 100% to be a continuous 10 hr activity
    let barWidth = ((parseInt(duration)/maxDuration)*100);

    // different colors are chosen for different duration of the activity 

    const colors = ["red","orange","purple","blue","cyan","yellow","#DAA520"];
   
    //checking if barwidth exceeds the availabe space and hence restricting it to 100
    if(barWidth > 90) {
        color = 'linear-gradient(319deg, #d3212d 0%, #009245 37%, #ffbf00 100%)';
        barWidth = 100;
    }
    else {
        //choosing colors based on the duration
        let index = Math.floor((100/barWidth)-1);
        color = colors[index] || colors[colors.length-1];
    }
    
    //setting limit for lengthy bars
    let barWidthPercentage = (barWidth > 10)? `${barWidth - 10}%` : `${barWidth}%`;
    const styles = {
        width : barWidthPercentage,
        background : color
    }

    return (
        <>
        <div className = "activity-meter">
            <div className = "activity-meter-item activity-time">{activity.startTime}-{activity.endTime}</div>
            <div className = "activity-meter-item activity-bar" style = {styles}></div>
            <span className = "activity-duration ">{`${activity.duration} mins`}</span>
        </div>
        </>

    )
}

export default ActivityDetails;
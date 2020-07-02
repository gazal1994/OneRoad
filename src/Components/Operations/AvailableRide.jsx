
import React from "react";

const AvailableRide = (props) => {
    const ride = props.ride
    const handleClick = () => {
        //handle joining ride
    }
    return (
        <div>
            <span>{ride.location}</span>
            <span>{ride.destination}</span>
            <span><button onClick={handleClick}>join</button></span>
        </div>
    )
}
export default AvailableRide;
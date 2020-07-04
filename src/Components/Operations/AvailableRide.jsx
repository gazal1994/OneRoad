
import React from "react";
import { inject, observer } from "mobx-react";

const AvailableRide = inject('users', 'rides')(observer((props) => {
    const textInput = props.textInput
    const setTextInput = props.setTextInput
    const passengerId = props.users.loggedInUser.id
    const ride = props.ride
    console.log(ride.id)
    const handleClick = () => {
        props.rides.requestRide(passengerId, ride.id, props.users.users)
        setTextInput({ ...textInput, location: '', destination: '', departureTime: '', passengerId: '' })
    }
    return (
        <div>
            <span>{ride.location}</span>
            <span>{ride.destination}</span>
            <span><button onClick={handleClick}>join</button></span>
        </div>
    )
}
))
export default AvailableRide;
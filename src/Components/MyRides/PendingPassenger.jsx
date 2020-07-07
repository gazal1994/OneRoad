
import React, { useState } from "react";
import { inject, observer } from "mobx-react";

const PendingPasssenger = inject('users', 'rides')(observer((props) => {
    const passenger = props.user
    const ride = props.ride
    const [isApproved, setIsApproved] = useState(false)
    const handleClick = () => {
        props.rides.approveRide(passenger.id, ride.id, props.users.users)
        setIsApproved(true)
    }
    return (
        <div>
            <span>{passenger.name}</span>
            <span>{passenger.phone}</span>
            {isApproved ?
                <span>Approved</span> :
                <span><button onClick={handleClick}>Approve passenger</button></span>}

        </div>
    )
}
))
export default PendingPasssenger;
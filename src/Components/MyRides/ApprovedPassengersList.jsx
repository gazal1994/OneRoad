import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'

const ApprovedPassengersList = inject('users', 'rides')(observer((props) => {
    const myRide = props.ride
    return (
        <div>
            {myRide.approvedPassengers.map(p => <p>{p.name}</p>)}
        </div>
    )
}
))

export default ApprovedPassengersList;

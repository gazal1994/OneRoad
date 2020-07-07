import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import PendingPassenger from './PendingPassenger'

const PendingPassengersList = inject('users', 'rides')(observer((props) => {
    const myRide = props.ride
    return (
        <div >
            {myRide.pendingPassengers.map(p => <PendingPassenger key={p.id} user={p} ride={myRide} />)}
        </div>
    )
}
))

export default PendingPassengersList;

import React, { useState, useEffect } from 'react'
import MyRide from './MyRide'
import { observer, inject } from 'mobx-react'
import Container from '@material-ui/core/Container';
import PendingPassengerList from './PendingPassengersList'
import ApprovedPassengersList from './ApprovedPassengersList'

const MyRides = inject('users', 'rides')(observer((props) => {
  const myRides = props.rides.rides.filter(r => r.driver.id == props.users.loggedInUser.id)
  return (
    <div>
      <h4>Requests to join my carpool</h4>
      {myRides.map(r => {
        return (
          <div style={{ border: '2px solid blue' }}>
            <p>{r.location} => {r.destination}</p>
            <p>pending passengers:</p>
            <PendingPassengerList key={r.id + 'p'} ride={r} />
            <p>approved passengers:</p>
            <ApprovedPassengersList key={r.id + 'a'} ride={r} />
          </div>
        )
      }
      )}
    </div>
  )
}
))
export default MyRides;
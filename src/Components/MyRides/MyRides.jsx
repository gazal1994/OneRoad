import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import PendingPassengerList from './PendingPassengersList'
import ApprovedPassengersList from './ApprovedPassengersList'
import { Link } from 'react-router-dom';

const MyRides = inject('users', 'rides')(observer((props) => {
  const [myRides, setMyRides] = useState([])
  const user = props.users.loggedInUser

  useEffect(() => {
    const filteredRides = props.rides.rides.filter(r => r.driver.id == props.users.loggedInUser.id)
    setMyRides(filteredRides)
  }, [user])
  return (
    <div>
      <h4>Requests to join my carpool</h4>
      <Link style={{ textDecoration: "none", color: "white" }} to='/ListOfRequestedRides'>My Requests</Link>
      {/*  /${r.id} */}
      {myRides.map(r => {
        return (
          <div key={r.id} style={{ border: '2px solid blue' }}>
            <Link to={`/map/${r.id}`}>
              <p>{r.location.name} => {r.destination.name}</p>
            </Link>
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
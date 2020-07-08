import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import Join from '../../srcSocketio/components/Join/Join';

const ListOfRequestedRides = inject('users', 'rides')(observer((props) => {
    console.log('1111111')
    const [myRequestedRides, setMyRequestedRides] = useState({ pending: [], approved: [] })
    const rides = props.rides.rides
    const user = props.users.loggedInUser
    useEffect(() => {
        const PendingdRides = rides
            .filter(r => r.pendingPassengers.find(p => p.id == props.users.loggedInUser.id))
        const approvedRides = rides
            .filter(r => r.approvedPassengers.find(p => p.id == props.users.loggedInUser.id))
        setMyRequestedRides({ pending: PendingdRides, approved: approvedRides })
    }, [user])
    console.log(myRequestedRides)
    return (
        <div>
            <h4>My Requests</h4>
            {myRequestedRides.pending.map(r => {
                return (
                    <div key={r.id + 'p'} style={{ border: '2px solid red' }}>
                        <p>{r.location.name} - {r.destination.name}</p>
                        <p>{r.driver.name}</p>
                        <p>pending</p>
                        <Join name={props.users.loggedInUser.name}  ride={r.location.name+'-'+r.destination.name} /> 

                    </div>
                )
            }
            )}
            {myRequestedRides.approved.map(r => {
                return (
                   
                    <div key={r.id + 'a'} style={{ border: '2px solid green' }}>
                        <p>{r.location.name} - {r.destination.name}</p>
                        <p>driver:{r.driver.name}</p>
                        <p>approved</p>                        
                      </div>
                )
            }
            )}
        </div>
    )
}
))
export default ListOfRequestedRides;
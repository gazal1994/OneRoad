import { observable, action, computed } from 'mobx'
import { Ride } from './Ride'

const axios = require('axios')
export class Rides {
  @observable rides = []
  @observable handelInput

  @action getRides = async () => {
    const rideData = await axios.get('http://localhost:3200/rides');
    const ridesArray = []
    rideData.data.forEach(r => ridesArray.push(new Ride(r.id, r.location, r.destination, r.departure_time, r.driver,  r.distance,r.is_done,
      r.pendingPassengers, r.approvedPassengers)))
    this.rides = ridesArray
    console.log(this.rides);
  }
  @action addRide = async (location, destination, departureTime, driverId, distance, isDone, users) => {
    const driver = users.find(u => u.id == driverId)
    let newRide = { location, destination, departureTime, driver, isDone, distance }
    const newRideId = await axios.post('http://localhost:3200/ride', newRide)
    newRide.id = newRideId.data[0]
    this.rides.push(new Ride(newRide))
    if (newRide.id) {
      return true
    }
  }

  @action removeRide = async (id) => {
    await axios.delete(`http://localhost:3200/ride/${id}`);
    const rideId = id
    const index = this.rides.findIndex(r => r.id === rideId)
    this.rides.splice(index, 1)
  }

  @action requestRide = async (passengerId, rideId, users) => {
    const responsePassengerId = await axios.post(`http://localhost:3200/ride/${passengerId}/${rideId}`);
    const ride = this.rides.find(r => r.id === rideId)
    const passenger = users.find(u => u.id === responsePassengerId)
    ride.pendingPassengers.push(passenger)
    if (responsePassengerId) {
      return true
    }
  }

  @action approveRide = async (passengerId, rideId, users) => {
    await axios.put(`http://localhost:3200/ride/${passengerId}/${rideId}`);
    const ride = this.rides.find(r => r.id === rideId)
    const passenger = users.find(u => u.id === passengerId)
    const indexPassengerPending = ride.pendingPassengers.findIndex(r => r.id === passengerId)
    ride.pendingPassengers.splice(indexPassengerPending, 1)
    ride.approvedPassengers.push(passenger)
  }

  @action finishRide = async (rideId) => {
    await axios.put(`http://localhost:3200/ride/${rideId}`);
    const ride = this.rides.find(r => r.id === rideId)
    ride.isDone = true
  }


}
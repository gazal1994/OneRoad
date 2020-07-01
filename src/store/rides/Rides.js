import { observable, action, computed } from 'mobx'
import {Ride} from './Ride'
const axios = require('axios')
export class Rides {
       @observable rides=[]

    

       @action getRides = async ()=>{
            const rideData = await axios.get('http://localhost:3200/getRides');
            const ridesArry=[]
            rideData.data[0].forEach(r=>ridesArry.push(new Ride(r.id,r.location,r.destination,r.departureTime,r.driver,r.status,r.distance)))        
            this.rides=ridesArry
        }
        @action addRide = async(location,destination,departureTime,driver,status,distance)=>{
          const createNewRide = {location,destination,departureTime,driver,status,distance}
          const newRideData = await axios.post('http://localhost:3200/addRide', createNewRide);
          const newRide=newRideData.data[0]
          this.rides.
          push(new Ride(newRide.id,newRide.location,newRide.destination,
          newRide.departureTime,newRide.driver,newRide.status,newRide.distance))
          }
        @action removeRide = async (id)=>{
           const rideIdObject = {id:id}
           const resiveRideId= await axios.DELETE('http://localhost:3200/Ride', rideId);
           const rideId=resiveRideId.data[0].id
           const index=  this.rides.findIndex(r=>r.id===rideId)
           this.rides.splice(index,1)
         }
         @action approveRide = async (rideId,passengerId)=>{
            const putRideInfo = {rideId,passengerId}
            const resiveRideInfo=await axios.put('http://localhost:3200/approveRide', putRideInfo);
            const rideInfo=resiveRideInfo.data[0]
            const ride=this.rides.find(r=>r.id===rideInfo.rideId)
            const indexPassengerPending=ride.pendingPassengers.findIndex(r=>r.id===rideInfo.rideId)
            ride.pendingPassengers.splice(indexPassengerPending,1)
            ride.approvedPassengers.push(rideInfo.passenger)
           
         }
         @action requestRide = async (rideId,passenger)=>{
           const putRideInfo = {rideId,passenger}
           const resiveRideInfo=await axios.put('http://localhost:3200/requestRide', putRideInfo);
           const ride =this.rides.find(r=>r.id===resiveRideInfo.data[0].rideId)
           ride.pendingPassengers.push(resiveRideInfo.data[0].passenger)
         }
         @action finishRide = async (rideId)=>{
           const putRideId = {rideId}
           const resiveRideInfo= await axios.put('http://localhost:3200/requestRide', putRideId);
           const ride=this.rides.find(r=>r.id===resiveRideInfo.data[0].rideId)
           ride.status=true
         }
}
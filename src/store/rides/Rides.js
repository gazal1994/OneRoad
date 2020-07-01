import { observable, action, computed } from 'mobx'
import {Ride} from './Ride'
import rides from './rides.json'

const axios = require('axios')
export class Rides {
       @observable rides=[]
       @observable handelInput
    

       @action getRides = async ()=>{
            const rideData = rides /* await axios.get('http://localhost:3200/getRides'); */
            const ridesArry=[]
            rideData/* .data[0] */.forEach(r=>ridesArry.push(new Ride(r.id,r.location,r.destination,r.departureTime,r.driver,r.status,r.distance)))        
            this.rides=ridesArry
        }
         @action addRide = async(id,location,destination,departureTime,driver,status,distance)=>{
           
             let newRide = {id,location,destination,departureTime,driver,status,distance}
       /*    const newRideData = await axios.post('http://localhost:3200/addRide', newRide); */
        /*   newRide=newRideData.data[0] */
          this.rides.
          push(new Ride(/* newRide */newRide.id,/* newRide */newRide.location,/* newRide */newRide.destination,
          /* newRide */newRide.departureTime,/* newRide */newRide.driver,/* newRide */newRide.status,/* newRide */newRide.distance))
          }
          
        @action removeRide = async (id)=>{
           const rideIdObject = {id:id}
         /*   const resiveRideId= await axios.DELETE('http://localhost:3200/Ride', rideIdObject); */
          /*  const rideId=resiveRideId.data[0].id */
           const index=  this.rides.findIndex(r=>r.id===/* rideId */rideIdObject.id)
           this.rides.splice(index,1)
        }
        
         
         @action approveRide = async (rideId,passengerId,users)=>{
            const putRideInfo = {rideId,passengerId}
            /* const resiveRideInfo=await axios.put('http://localhost:3200/approveRide', putRideInfo); */
            /* const rideInfo=resiveRideInfo.data[0] */
            const ride=this.rides.find(r=>r.id===/* rideInfo */putRideInfo.rideId)
            const passenger =users.find(u=>u.id===/* resiveRideInfo.data[0] */passengerId)
            const indexPassengerPending=ride.pendingPassengers.findIndex(r=>r.id===/* rideInfo */putRideInfo.passengerId)
            ride.pendingPassengers.splice(indexPassengerPending,1)
            ride.approvedPassengers.push(passenger)
              }
          
       
         @action requestRide = async (rideId,passengerId,users)=>{
           const putRideInfo = {rideId,passengerId}
          /*  const resiveRideInfo=await axios.put('http://localhost:3200/requestRide', putRideInfo); */
           const ride =this.rides.find(r=>r.id===/* resiveRideInfo.data[0] */putRideInfo.rideId)
           const passenger =users.find(u=>u.id===/* resiveRideInfo.data[0] */passengerId)
           ride.pendingPassengers.push(/* resiveRideInfo.data[0].passenger */passenger)
         }
            
         @action finishRide = async (rideId)=>{
           const putRideId = {rideId}
          /*  const resiveRideInfo= await axios.put('http://localhost:3200/requestRide', putRideId); */
           const ride=this.rides.find(r=>r.id===/* resiveRideInfo.data[0] */putRideId.rideId)
           ride.status=true
         } 
         @action pushTohandelInput = (inputData)=>{
           this.handelInput={inputData}
         }
}
import { observable, action, computed } from 'mobx'
import {Ride} from './Ride'
export class Rides {
       @observable rides=[]

    

       @action getRides = async ()=>{
            let json = await axios.get('http://localhost:3200/getRides');
             json.data[0].forEach(m=>this.rides.push(new Ride(m.id,m.location,m.destination,m.departureTime,m.driver,m.status,m.distance)))        
        }
        @action addRide = async(id,location,destination,departureTime,driver,status,distance)=>{
            let temp = {id,location,destination,departureTime,driver,status,distance}
            await axios.post('http://localhost:3200/addRide', temp);
          }
        @action removeRide = async (id)=>{
            let temp = {id:id}
           await axios.DELETE('http://localhost:3200/Ride', temp);
         }
         @action approveRide = async (rideId,passengerId)=>{
            let temp = {rideId,passengerId}
           await axios.put('http://localhost:3200/approveRide', temp);
         }
         @action requestRide = async (rideId,passenger)=>{
            let temp = {rideId,passenger}
           await axios.put('http://localhost:3200/requestRide', temp);
         }
         @action finishRide = async (rideId)=>{
            let temp = {rideId}
           await axios.put('http://localhost:3200/requestRide', temp);
         }
}
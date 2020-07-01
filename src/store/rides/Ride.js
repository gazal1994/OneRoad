import { observable, action, computed } from 'mobx'
export class Ride {
      @observable id
      @observable location
      @observable destination 
      @observable departureTime
      @observable driver
      @observable approvedPassengers =[]  
      @observable pendingPassengers=[]
      @observable status 
      @observable distance
       

      constructor (id,location,destination,departureTime,driver,status=false,distance=null){
         this.id=id
         this.location=location
         this.destination=destination
         this.departureTime=departureTime
         this.driver=driver
         this.status=status
         this.distance=distance
      }
      
     
}
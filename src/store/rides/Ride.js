import { observable, action, computed } from 'mobx'
export class Ride {
      @observable id
      @observable location
      @observable destination
      @observable departureTime
      @observable driver
      @observable approvedPassengers
      @observable pendingPassengers
      @observable distance
      @observable isDone


      constructor(id, location, destination, departureTime, driver, distance = null, isDone = false,
            pendingPassengers = [], approvedPassengers = []) {
            this.id = id
            this.location = location
            this.destination = destination
            this.departureTime = departureTime
            this.driver = driver
            this.isDone = isDone
            this.distance = distance
            this.pendingPassengers = pendingPassengers
            this.approvedPassengers = approvedPassengers
      }


}
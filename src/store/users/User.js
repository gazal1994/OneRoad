import { observable, action, computed } from 'mobx'
export class User {
       @observable id
       @observable name
       @observable phone 
       @observable income
       @observable expense
       @observable rides =[]

      constructor (id,name,phone,income,expense){
         this.id=id
         this.name=name
         this.phone=phone
         this.income=income
         this.expense=expense
      }
}
import { observable, action, computed } from 'mobx'
import { User } from './User'
const axios = require('axios')

export class Users {
       @observable users=[]
       @observable loggedInUser
       @action getUsers = async ()=>{
            const useraData =  await axios.get('http://localhost:3200/users');
            
            const usersArry=[]
            useraData.data.forEach(m=>usersArry.push(new User(m.id,m.name,m.phone,m.income,m.expense)))        
            this.users=usersArry
            console.log(this.users)
        }
        //addUser
     /*  @action removeUser = async (id)=>{
           const delteUserId = {id:id}
           const resiveUserInfo=await axios.DELETE('http://localhost:3200/removeUser', delteUserId);
           const index=this.users.findIndex(u=>u.id=== delteUserId.idresiveUserInfo.data[0].id)
           this.users.splice(index,1)
         } */

       @action analyticsSearch=async(userId,startDate,endDate)=>{
       let backAnalytics=[]
       const analytics=await axios.get(`http://localhost:3200/analytics/${userId}/${startDate}/${endDate}`)
       backAnalytics.push(analytics.data)
       return backAnalytics
         }
        }

 


export default Users
import { observable, action, computed } from 'mobx'
import {User} from './User'
import users from './users.json'
const axios = require('axios')
export class Users {
       @observable users=[]
      
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
       const analytics=await axios.get(`http://localhost:3200/analytics/${userId}/${startDate}/${endDate}`)
       return analytics.data[0]
         }
        }

        export default Users
import { observable, action, computed } from 'mobx'
import {User} from './User'

export class Users {
       @observable users=[]
      
       @action addAllUsers = async ()=>{
            let json = await axios.get('http://localhost:3200/Users');
             json.data[0].forEach(m=>this.users.push(new User(m.id,m.name,m.phone,m.income,m.expense)))        
        }
        @action removeUser = async (id)=>{
            let temp = {id:id}
           await axios.DELETE('http://localhost:3200/removeUser', temp);
         }
}
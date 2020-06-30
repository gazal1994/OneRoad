import React, { Component } from 'react';
import Client from './Client'
import {observer, inject} from 'mobx-react'

@inject('storeList')
@observer
class Clients extends Component {
 constructor(){
   super()
this.state ={}
 
 }


 
      render() {
        return (
          <div>
           
             
             </div>
            )
            
    }
}

export default Clients
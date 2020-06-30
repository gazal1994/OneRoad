import React, { Component } from 'react';
import {observer, inject} from 'mobx-react'


@inject('storeList')
@observer

class Analytice extends Component {
   constructor(){
     super()
     this.state={ }
   }



      render() {
         
        return (
           <div>

      
             </div>
            )
    }
}

export default Analytice
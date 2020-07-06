import React, { useState, useEffect } from 'react'
import MyRide from './MyRide'
import {observer, inject} from 'mobx-react'


const MyRides= inject('users','rides')(observer((props)=> {
  debugger

    return (
   <div></div>
    )
  }
))
export default MyRides;

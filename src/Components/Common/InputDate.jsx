import React, { useState, useEffect } from 'react'

import {observer, inject} from 'mobx-react'
import Container from '@material-ui/core/Container';

const dateInput= inject('users','rides')(observer((props)=> {
  debugger

    return (
   <div></div>
    )
  }
))
export default dateInput;
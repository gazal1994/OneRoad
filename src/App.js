//import React from 'react';
import React, { Component } from 'react';
import './App.css';
import {observer, inject} from 'mobx-react'
import Clients from './Components/Clients'
import Analytice from './Components/Analytice'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar'
@inject('storeList')
@observer

class App extends Component {
constructor(){
  super()
}
componentDidMount=async()=>{

}
  
  render(){
  
    return (
      <div >
           <Router>
        
            </Router>
            
    
      </div>
    );
  }

}

export default App;

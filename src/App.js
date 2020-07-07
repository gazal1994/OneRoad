//import React from 'react';
import React, { useEffect } from "react";
import "./App.css";
import { observer, inject } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Analytics from './Components/Analytics/Analytics'
import CssBaseline from '@material-ui/core/CssBaseline';
import MyRides from "./Components/MyRides/MyRides";
import PassengerSearch from './Components/Operations/PassengerSearch'
import CreateRide from './Components/Operations/CreateRide'
import ListOfRequestedRides from './Components/MyRides/ListOfRequestedRides'
const App = inject(
  "users",
  "rides"
)(
  observer((props) => {

    useEffect(() => {
      (async () => {
        await props.rides.getRides()
        await props.users.getUsers()
        let id = null
        if (!localStorage.getItem('user')) {
          id = prompt('your id please')
          localStorage.setItem('user', id)
        }
        else {
          id = localStorage.getItem('user')
        }
        props.users.loggedInUser = props.users.users.find(u => u.id == id)
        console.log(props.users.loggedInUser);

      })()
    }, [])
    console.log(props.users.users)
    console.log(props.rides.rides)
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Route exact path="/Landing" component={Landing} />
          <Route exact path="/MyRides" component={MyRides} />
          <Route exact path="/operation/passenger" component={PassengerSearch} />
          <Route exact path="/operation/CreateRide" component={CreateRide} />
          <Route exact path='/Analytics' component={Analytics} />
          <Route exact path='/ListOfRequestedRides' component={ListOfRequestedRides} />
        </Router>
      </React.Fragment>
    );
  })
);

export default App;

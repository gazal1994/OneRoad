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
const App = inject(
  "users",
  "rides"
)(
  observer((props) => {
    //  props.users.getUsers() store testing
    //  console.log(props.users.users)
    //  props.users.removeUser(3)
    //  console.log(props.users.users)
    //  props.rides.getRides()
    //  console.log(props.rides.rides)
    //  props.rides.removeRide(3)
    //  props.rides.requestRide(2,2,props.users.users)
    //  props.rides.approveRide(2,2,props.users.users)
    //  props.rides.finishRide(2)

    /* props.rides.addRide("ashkelon", "Tel Aviv", null, {
      id: 1,
      name: "david",
      phone: "123",
      income: 0,
      expense: 0
    }, 45, false) */
    useEffect(() => {
      (async () => {
        await props.rides.getRides()
        await props.users.getUsers()
      })()
    }, [])
    console.log(props.rides.rides)
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Route exact path="/Landing" component={Landing} />
          <Route exact path="/MyRides" component={MyRides} />
          <Route exact path="/operation/passenger"  component={PassengerSearch} />
          <Route exact path="/operation/CreateRide"  component={CreateRide} />
          <Route exact path='/Analytics' component={Analytics} />
        </Router>
      </React.Fragment>
    );
  })
);

export default App;

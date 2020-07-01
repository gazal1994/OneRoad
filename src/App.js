//import React from 'react';
import React from "react";
import "./App.css";
import { observer, inject } from "mobx-react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import MyRides from "./Components/MyRides/MyRides";
import CommonButton from './Components/Common/CommonButton'
import Operation from './Components/Operations/Operation'
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
    //  props.rides.addRide(9,"ashkelon","Tel Aviv","2020-07-09T21:00:00.000Z",'David B',false,45)
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Route exact path="/Landing" component={Landing} />
          <Route exact path="/MyRides" component={MyRides} />
          <Route exact path="/operation" component={Operation} />
        </Router>
      </React.Fragment>
    );
  })
);

export default App;

//import React from 'react';
import React from "react";
import "./App.css";
import { observer, inject } from "mobx-react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
const App = inject(
  "users",
  "rides"
)(
  observer((props) => {
    return (
      <React.Fragment>
        <CssBaseline />
        
        <Router>
          <Route exact path="/Landing" component={Landing} />
          {/*  <Landing /> */}
        </Router>
      </React.Fragment>
    );
  })
);

export default App;

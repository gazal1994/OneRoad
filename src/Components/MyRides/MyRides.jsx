import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import PendingPassengerList from "./PendingPassengersList";
import ApprovedPassengersList from "./ApprovedPassengersList";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import '../../App.css'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Tooltip, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import MapIcon from '@material-ui/icons/Map';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavBar from '../Landing/NavBar'
const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    marginTop: theme.spacing(1),
    direction: "column",
    justify: "center",
    alignItems: "center",
    backgroundColor: "#12343b",
    padding:20
  },
  div: {
    flexGrow: 1,
    marginTop: theme.spacing(10),
  },
  bullet: {
    marginLeft: theme.spacing(1),
    color: "#c89666",
  },
  title: {
    fontSize: 14,
    marginLeft: theme.spacing(8),
  },
  pos: {
    marginBottom: 12,
  },
  paper:{
    backgroundColor: "#c89666",
    padding:15,
    width:350,
  
  },

  head:{
    /* marginLeft: theme.spacing(6) */
  }
}));

const MyRides = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();
    const [myRides, setMyRides] = useState([]);
    const user = props.users.loggedInUser;

    useEffect(() => {
      const filteredRides = props.rides.rides.filter(
        (r) => r.driver.id == props.users.loggedInUser.id
      );
      setMyRides(filteredRides);
    }, [user]);
    return (
<React.Fragment>
       <NavBar />
      <div className={classes.div}>
        
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="right"
          spacing={0}
        >
            <Grid item xs={6}>
          <Link
              style={{ textDecoration: "none", color: "white" }}
              to='/MyRides'
            >
            <h4 className={classes.head}>My Carpools</h4>
            </Link>
            </Grid>
            <Grid item xs={6}>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/ListOfRequestedRides"
            >
              <h4 className={classes.head}>My Requests</h4>
            </Link>
           </Grid>
           </Grid>
            </Paper>
          </Grid>
          {/*  /${r.id} */}
          {myRides.map((r) => {
            return (
              /*  <div key={r.id} style={{ border: '2px solid blue' }}>
            <Link to={`/map/${r.id}`}>
              <p>{r.location.name} => {r.destination.name}</p>
            </Link>
            <p>pending passengers:</p>
            <PendingPassengerList key={r.id + 'p'} ride={r} />
            <p>approved passengers:</p>
            <ApprovedPassengersList key={r.id + 'a'} ride={r} />
          </div> */
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/map/${r.id}`}
                    >
                      <h6> {r.location.name} <ArrowRightAltIcon /> {r.destination.name} <MapIcon /></h6>
                    </Link>
                  </Typography>

                  <Typography
                    className={classes.bullet}
                    variant="body2"
                    component="p"
                  >
                    <h6 >Pending Passengers:</h6>
                    <PendingPassengerList key={r.id} ride={r} />
                  </Typography>

                  <Typography
                    className={classes.bullet}
                    variant="body2"
                    component="p"
                  >
                  <h6 >Approved Passengers:</h6>
                   </Typography>

                  <ApprovedPassengersList key={r.id} ride={r} /> 

                 
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
      </React.Fragment>
    );
  })
);
export default MyRides;

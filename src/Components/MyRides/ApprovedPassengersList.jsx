import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import Typography from "@material-ui/core/Typography";
import '../../App.css'
import { makeStyles } from "@material-ui/core/styles";
import CallIcon from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';
const useStyles = makeStyles((theme) => ({
    
    root: {
      width: 300,
      marginTop: theme.spacing(1),
      direction: "column",
      justify: "center",
      alignItems: "center",
      backgroundColor: "#12343b",
    },
    div: {
      flexGrow: 1,
      marginTop: theme.spacing(16),
    },
    bullet: {
      marginLeft: theme.spacing(1),
      color: "white",
    },
    title: {
      fontSize: 14,
      marginLeft: theme.spacing(10),
    },
    pos: {
      marginBottom: 12,
    },
  }));
const ApprovedPassengersList = inject('users', 'rides')(observer((props) => {
    const classes = useStyles();
    const myRide = props.ride
    return (
        <React.Fragment>
            {myRide.approvedPassengers.map(p => <Typography className={classes.bullet} ><PersonIcon />{p.name}  <CallIcon /> {p.phone}</Typography >)}
        </React.Fragment>
    )
}
))

export default ApprovedPassengersList;

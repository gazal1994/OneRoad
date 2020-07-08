
import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import Typography from "@material-ui/core/Typography";
import '../../App.css'
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CallIcon from '@material-ui/icons/Call';
import PersonIcon from '@material-ui/icons/Person';

const use = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    button: {
      backgroundColor: "#c89666",
      color: "white",
      border: "1px solid",
      borderColor: "#c89666",
      textTransform: "none",
      borderRadius:'100px',
      width: 200,
      "&:hover": {
        backgroundColor: "#c89666",
        borderColor: "#c89666",
        boxShadow: "#c89666",
      },
      "&:active": {
        boxShadow: "#c89666",
        backgroundColor: "#c89666",
        borderColor: "#c89666",
      },
      "&:focus": {
        boxShadow: "#c89666",
        borderColor: "#c89666",
      },
    },
  }));

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
      marginRight: theme.spacing(2),
      color: "#c89666",
      cursor: 'pointer'
    },
    title: {
      fontSize: 14,
      marginLeft: theme.spacing(10),
    },
    pos: {
      marginBottom: 12,
    },
  }));
const PendingPasssenger = inject('users', 'rides')(observer((props) => {
    const classes = useStyles();
    const classe=use()
    const passenger = props.user
    const ride = props.ride
    const [isApproved, setIsApproved] = useState(false)
    const handleClick = () => {
        props.rides.approveRide(passenger.id, ride.id, props.users.users)
        setIsApproved(true)
    }
    return (
        <div style={{color:'whie'}}>
          {/*  <Tooltip title="Delete">  */}

          
          <Typography style={{color:'white'}}> {isApproved ?
                <span>Approved</span> :
              /*   <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab> */
                <span><AddCircleOutlineIcon className={classes.bullet}  size="small" 
                
                variant="contained"
                color="primary" onClick={handleClick}Approve passenger /></span>}<PersonIcon />{passenger.name}
            <span style={{color:'white'}}>    <CallIcon /> {passenger.phone}</span></Typography> {/* </Tooltip>  */}
           

        </div>
    )
}
))
export default PendingPasssenger;
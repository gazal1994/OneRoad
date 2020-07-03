import React from 'react';
import {observer, inject} from 'mobx-react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
     head:{
        padding: theme.spacing(2),
        cursor:'pointer'
        
     }
  }));

const NavBar=inject('users','rides')(observer((props)=> {
    const classes = useStyles();
    return (
        <div className={classes.root}>
       
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography className={classes.head} align='right' variant="h6" color="inherit">
             <Link  style={{ textDecoration: "none", color: "white" }} to='/Landing'> HOME</Link>
            </Typography>
            <Typography className={classes.head} align='right' variant="h6" color="inherit">
              ANALYTICS
            </Typography>
            <Typography className={classes.head} align='right' variant="h6" color="inherit">
            <Link  style={{ textDecoration: "none", color: "white" }} to='/MyRides'>MY RIDES</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        
      </div>
    );
}))

export default NavBar;
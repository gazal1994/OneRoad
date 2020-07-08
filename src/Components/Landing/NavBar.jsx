import React from 'react';
import {observer, inject} from 'mobx-react'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import '../../App.css'
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      
    },
     head:{
        padding: theme.spacing(2),
        cursor:'pointer'
        
     },
     toolbar:{
         backgroundColor:' #2d545e',
         padding:0,
     },
     appbar:{
       opacity:1
     }
  }));

const NavBar=inject('users','rides')(observer((props)=> {
    const classes = useStyles();
    return (
        <div className={classes.root}>
       
        <AppBar position="static" className={classes.appbar}>
          <Toolbar variant="dense" className={classes.toolbar} >
            <Typography className={classes.head} align='right' variant="h6" color="inherit">
             <Link  style={{ textDecoration: "none", color: "white" }} to='/Landing'> HOME</Link>
            </Typography>
            <Typography className={classes.head} align='right' variant="h6" color="inherit">
              <Link style={{ textDecoration: "none", color: "white" }}to='/Analytics'>ANALYTICS</Link>
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
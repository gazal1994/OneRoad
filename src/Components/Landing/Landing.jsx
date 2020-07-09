import React from "react";
import { observer, inject } from "mobx-react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles} from '@material-ui/core/styles';
import '../../App.css'
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button:{
    backgroundColor:'#c89666',
    color:'white',
    border: '1px solid',
    borderColor: '#c89666',
    textTransform: 'none',
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#c89666',
      borderColor: '#c89666',
      boxShadow: '#c89666',
    },
    '&:active': {
      boxShadow: '#c89666',
      backgroundColor: '#c89666',
      borderColor: '#c89666',
    }, '&:focus': {
      boxShadow: '#c89666',
      borderColor: '#c89666',
    },
    
    },
    grid:{
       marginTop: theme.spacing(15),
      position:'relative',

     }
  
}));




const Landing = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();

    return (
      <React.Fragment>
        <NavBar />
        <div className={classes.grid} >
        <Grid
        className={classes.grid}
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={0}
          
        >
           <Grid item  xs={12}>
        <Link
          style={{ textDecoration: "none", color: "white"}}
          to="/operation/passenger"
        >
        <Button size="medium" className={classes.button} variant="contained" color="primary">Create Carpool</Button>  
        
        </Link>
        </Grid>
        <Grid item xs={12}>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/operation/CreateRide"
        >
         <Button size="medium" variant="contained"  className={classes.button}   >Catch A  Ride</Button>  
        </Link>
        </Grid>
        </Grid>
        </div>
      </React.Fragment>
    );
  })
);

export default Landing;

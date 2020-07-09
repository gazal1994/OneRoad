import React, { useState, useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { Typography } from '@material-ui/core'
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import { Tooltip, Paper } from "@material-ui/core";
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
      marginLeft: theme.spacing(0),
    },
  
    head:{
      color:'white'
    }
  }));
const ListOfRequestedRides = inject('users', 'rides')(observer((props) => {
    const classes = useStyles()
    console.log('1111111')
    const [myRequestedRides, setMyRequestedRides] = useState({ pending: [], approved: [] })
    const rides = props.rides.rides
    const user = props.users.loggedInUser
    useEffect(() => {
        const PendingdRides = rides
            .filter(r => r.pendingPassengers.find(p => p.id == props.users.loggedInUser.id))
        const approvedRides = rides
            .filter(r => r.approvedPassengers.find(p => p.id == props.users.loggedInUser.id))
        setMyRequestedRides({ pending: PendingdRides, approved: approvedRides })
    }, [user])
    console.log(myRequestedRides)
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
          justify="center"
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
              <h4 className={classes.head}>My Requests </h4>
            </Link>
           </Grid>
           </Grid>
            </Paper>
          </Grid>
            {myRequestedRides.pending.map(r => {
               
                return (
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                      <Grid item xs={12}>
                    <Card key={r.id + 'p'} className={classes.root}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/map/${r.id}`}
                    >  <Typography className={classes.head}>{r.location.name} <TrendingFlatIcon/> {r.destination.name}</Typography>
                       </Link>
                        <Typography className={classes.bullet}>< EmojiTransportationIcon/>{r.driver.name}</Typography>
                        <Typography className={classes.bullet}><Avatar  src="https://media.giphy.com/media/l41YtzJmMgEyOWBKU/giphy.gif" /></Typography>
                    </Card>
                    </Grid>
                 </Grid>
                )
            }
            )}
            {myRequestedRides.approved.map(r => {
                return (
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={3}
                  >
                      <Grid item xs={12}>
                    <Card key={r.id + 'p'} className={classes.root}>
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/map/${r.id}`}
                    >  
                        <Typography className={classes.head}>{r.location.name} <TrendingFlatIcon/>{r.destination.name}</Typography>
                        </Link>
                        <Typography className={classes.bullet}>< EmojiTransportationIcon/>{r.driver.name}</Typography>
                        <Typography className={classes.bullet}><Avatar src="https://media.giphy.com/media/3kuSo744UIPJjcJUEn/giphy.gif" /></Typography>
                 </Card>
                 </Grid>
                 </Grid>
                )
            }
            )}
            </Grid>
     </div>   
     </React.Fragment>
    )
}
))
export default ListOfRequestedRides;
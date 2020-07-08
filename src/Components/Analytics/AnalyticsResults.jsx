import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Avatar from '@material-ui/core/Avatar';
import "../../App.css";
const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      backgroundColor: '#12343b',
      color:'#c89666',
      /* backgroundImage: `url("https://media.giphy.com/media/D4zbzXKSl9tOE/source.gif")`,
      backgroundRepeat: 'no-repeat', */
      /* background-size: cover;
      height: 800px; */
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 20,
      color:'white'
    },
    pos: {
      marginBottom: 12,
      color:'white'
    },
    avatar: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
  }));

const AnalyticsResults = inject('users', 'rides')(observer((props) => {
    const classes = useStyles();
    const income = props.income
    const expense = props.expense
    const ridesJoined = props.ridesJoined
    const carpools = props.carpools
    const name=props.name

    return (
        <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
          Summary of Activities
          </Typography>

          <Typography className={classes.pos} color="textSecondary">
         
            {name}
            <Avatar alt={name} src="https://media.giphy.com/media/3o72F7XR0Gnd5NarQs/giphy.gif" />
          </Typography>
          <Typography variant="body2" component="p">
          <AttachMoneyIcon />
          Money Earnd:{income ? income : 0}
            <br />
            <CardMembershipIcon />
            Money Spend:{expense ? expense : 0}
          </Typography>
          <Typography variant="body2" component="p">
          <EmojiPeopleIcon />
          Rides Joined:{ridesJoined}
            <br />
            <DirectionsCarIcon  />
            Accomplished Carpools:{carpools}
            
          </Typography>
        </CardContent>
       
      </Card>
       /*  <div>
            <p>moneyEarnd:{income ? income : 0}</p>
            <p>moneySpend:{expense ? expense : 0}</p>
            <p>ridesJoined:{ridesJoined}</p>
            <p>accomplished carpools:{carpools}</p>
        </div> */

    )
}
))
export default AnalyticsResults;
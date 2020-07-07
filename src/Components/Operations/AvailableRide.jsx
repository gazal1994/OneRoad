
import React from "react";
import { inject, observer } from "mobx-react";
import Grid from "@material-ui/core/Grid";
import "../../App.css";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
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
    width: 50,
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
    flexGrow: 1,
    marginTop: theme.spacing(16),
  },
  list: {
    flexGrow: 1,
    maxWidth: 752,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  divider: {
    color: "red",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  list: {
    backgroundColor: '#12343b',
    margin: theme.spacing(1),

    borderColor: "#12343b",
    borderRadius: '5px',
    color: 'white'
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const AvailableRide = inject('users', 'rides')(observer((props) => {
  const classe = use()
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const textInput = props.textInput
  const setTextInput = props.setTextInput
  const passengerId = props.users.loggedInUser.id
  const ride = props.ride
  console.log(ride.id)
  const handleClick = () => {
    props.rides.requestRide(passengerId, ride.id, props.users.users)
    setTextInput({ ...textInput, location: '', destination: '', departureTime: '', passengerId: '' })
  }
  return (
    <React.Fragment>


      <ListItem className={classes.list}>
        <ListItemText
          primary={ride.location.name}
          secondary='david'
        />

        <IconButton edge="start" aria-label="delete">
          <DeleteIcon />
        </IconButton>

        <ListItemText
          primary={ride.destination}
        />
        <ListItemSecondaryAction>
          <Button onClick={handleClick} className={classe.button}>join</Button>
        </ListItemSecondaryAction>
      </ListItem>

      {/* <span>From{ride.location}</span>
            <span>To{ride.destination}</span>
            <span><button onClick={handleClick}>join</button></span> */}

    </React.Fragment>


  )
}
))
export default AvailableRide;
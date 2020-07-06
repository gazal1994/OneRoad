import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Driver from "../../store/users/users.json";
import Button from "@material-ui/core/Button";
import AvailableRide from "./AvailableRide";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
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
    backgroundColor:'transpernt',
    width:400,
},
title: {
  margin: theme.spacing(4, 0, 2),
},
list:{
  backgroundColor:'white',
}

}));



const PassengerSearch = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    const classes = useStyles();
    const classe = use();

    useEffect(() => {
      (async () => {
        await props.rides.getRides();
      })();
    }, []);

    const [relevantRides, setRelevantRides] = useState([]);
    const [textInput, setTextInput] = useState({
      location: "",
      destination: "",
      departureTime: "2020-07-08T10:30",
    });
    const handleChange = (e) => {
      const name = e.target.name;
      setTextInput({ ...textInput, [name]: e.target.value });
    };
    const handelClick = () => {
      const relevant = props.rides.rides.filter(
        (r) =>
          r.location == textInput.location &&
          r.destination == textInput.destination //&&
        // r.departureTime == textInput.departureTime
      );
      setRelevantRides([...relevant]);
    };

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label=" Location"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              value={textInput.location}
              name="location"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-textarea"
              label="Destination"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              value={textInput.destination}
              name="destination"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="datetime-local"
              label="Departure Time"
              type="datetime-local"
              name="departureTime"
              defaultValue={textInput.departureTime}
              onChange={handleChange}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classe.button}
              onClick={handelClick}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </Grid>

     
     
      
      <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={0}
    >
<Grid  item xs={12} md={6}>
     
      <div className={classes.demo}>
     
        <List  dense={dense}>
       {/*  <Typography variant="h6" align="center" className={classes.title}>
        Avatar with text and icon
      </Typography> */}
        {relevantRides.map((r) => (
          <AvailableRide
            key={r.id}
            ride={r}
            textInput={textInput}
            setTextInput={setTextInput}
          />
        ))}
             
        </List>
          </div>
        </Grid>
        </Grid>
        </div>
    );
  })
);

export default PassengerSearch;

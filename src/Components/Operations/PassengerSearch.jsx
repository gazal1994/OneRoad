import React, { useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Driver from '../../store/users/users.json'
import Button from "@material-ui/core/Button";
import AvailableRide from "./AvailableRide"
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const PassengerSearch = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();

    useEffect(() => {
      (async () => {
        await props.rides.getRides()
      })()
    }, [])

    const [relevantRides, setRelevantRides] = useState([])
    const [textInput, setTextInput] = useState({ location: '', destination: '', departureTime: "2020-07-08T10:30" });
    const handleChange = (e) => {
      const name = e.target.name;
      setTextInput({ ...textInput, [name]: e.target.value });
    }
    const handelClick = () => {
      const relevant = props.rides.rides.filter(r =>
        r.location == textInput.location &&
        r.destination == textInput.destination //&&
        // r.departureTime == textInput.departureTime
      )
      setRelevantRides([...relevant])
    }

    return (
      <div>

        <TextField
          id="outlined-textarea"
          label=" location"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.location}
          name="location"
          onChange={handleChange}
        />
        <TextField
          id="outlined-textarea"
          label="destination"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.destination}
          name="destination"
          onChange={handleChange}
        />

        <TextField
          id="datetime-local"
          label="departureTime"
          type="datetime-local"
          name="departureTime"
          defaultValue={textInput.departureTime}
          onChange={handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handelClick} variant="contained" color="primary">Search</Button>
        <Divider></Divider>
        {relevantRides.map(r => <AvailableRide key={r.id} ride={r} textInput={textInput} setTextInput={setTextInput} />)}

      </div>
    );
  })
);

export default PassengerSearch;
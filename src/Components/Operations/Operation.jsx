import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Input from '../Common/Input'
import CommonButton from "../Common/CommonButton";
import TextField from "@material-ui/core/TextField";
import Driver from '../../store/users/users.json'
import Button from "@material-ui/core/Button";
import AvailableRide from "./AvailableRide"

const Operation = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const driver = Driver[0]
    const [relevantRides, setRelevantRides] = useState([])
    const [textInput, setTextInput] = useState({ location: '', destination: '', departureTime: '' });
    const handleChange = (e) => {
      const name = e.target.name;
      setTextInput({ ...textInput, [name]: e.target.value });
    }
    const handelClick = () => {
      if (props.match.params.type == 'driver') {
        props.rides.addRide(textInput)
      }
      else {
        console.log(textInput);

        const relevant = props.rides.rides.filter(r =>
          r.location == textInput.location &&
          r.destination == textInput.destination //&&
          // r.departureTime == textInput.departureTime
        )
        console.log(relevant);
        setRelevantRides([...relevant])
      }
    }
    const checkTypeUser = () => {
      if (props.match.params.type == 'passenger') {
        return 'Search'
      } else {
        return 'declare ride'
      }
    }

    return (
      <div>
        {props.match.params.type}
          location:<TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.location}
          name="location"
          onChange={handleChange}
        />
          destination:<TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.destination}
          name="destination"
          onChange={handleChange}
        />
          departure time:<TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.departureTime}
          name="departureTime"
          onChange={handleChange}
        />
        <Button onClick={handelClick} variant="contained" color="primary">Search</Button>
        {relevantRides.map(r => <AvailableRide key={r.id} ride={r} />)}

      </div>
    );
  })
);

export default Operation;
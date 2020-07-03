import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Driver from '../../store/users/users.json'
import Button from "@material-ui/core/Button";
import AvailableRide from "./AvailableRide"

const PassengerSearch = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const driver = Driver[0]
    const [relevantRides, setRelevantRides] = useState([])
    const [textInput, setTextInput] = useState({ location: '', destination: '', departureTime: '',passengerId:'' });
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
    
  console.log(textInput)

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
          id="outlined-textarea"
          label="departure time"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.departureTime}
          name="departureTime"
          onChange={handleChange}
        />
        <TextField
          id="outlined-textarea"
          label="passengerId"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.passengerId}
          name="passengerId"
          onChange={handleChange}
        />
        <Button onClick={handelClick} variant="contained" color="primary">Search</Button>
        {relevantRides.map(r => <AvailableRide key={r.id} ride={r}  textInput={textInput} setTextInput={setTextInput} />)}

      </div>
    );
  })
);

export default PassengerSearch;
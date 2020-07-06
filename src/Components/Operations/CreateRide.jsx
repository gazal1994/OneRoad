import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../../App.css";
/* import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"; */
/* import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox"; */
import GoogleMaps from "../Common/Input";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const CreateRide = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();
    const classe = use();
    const toSqlDate = (date) =>
      new Date(date).toISOString().slice(0, 19).replace("T", " ");

    const [textInput, setTextInput] = useState({
      location: "",
      destination: "",
      departureTime: "2020-07-08T10:30",
    });
    const handleChange = (e) => {
      const name = e.target.name;
      console.log(toSqlDate(textInput.departureTime));

      setTextInput({ ...textInput, [name]: e.target.value });
    };
    const handelClick = async () => {
      /*  const x=  await coordinate(textInput.location)
    console.log(x) */
      props.rides.addRide(
        textInput.location,
        textInput.destination,
        textInput.departureTime,
        props.users.loggedInUser.id,
        100,
        0,
        props.users.users
      );
      setTextInput({
        ...textInput,
        location: "",
        destination: "",
        departureTime: "",
        DriverId: "",
      });
    };
    /*  const coordinate = async(value)=>{
      const results = await getGeocode({address: value });
      const { lat, lng } = await getLatLng(results[0]);
      return {lat,lng}
      } */
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [address, setAddress] = React.useState("");
    const [coordinates,setCoordinates]=React.useState({lat:null,lng:null})
    const handleSelect = async (value) => {
      const results = await geocodeByAddress(value)
      const latLng = await getLatLng (results[0])
      setAddress(value)
      setCoordinates(latLng)

    };
    return (
      <div className={classes.root}>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <p>Latitude:{coordinates.lat}</p>
              <p>Longitude:{coordinates.lng}</p>
              <input {...getInputProps({ placeholder: "Type address",name:'location' })} />
              <div>
                {loading ? <div>...loading</div>:null}
                {suggestions.map((suggestion)=>{
                  const style =suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  
                  return <div {...getSuggestionItemProps(suggestion,{style})}>{suggestion.description}</div>
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
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
              label="DepartureTime"
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
              onClick={handelClick}
              className={classe.button}
              variant="contained"
              color="primary"
            >
              Create Ride
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  })
);

export default CreateRide;

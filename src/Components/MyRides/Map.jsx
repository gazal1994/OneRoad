import React, { useState,useEffect } from 'react';
import {observer, inject} from 'mobx-react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";
const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
let initialLocation ={}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = ({lat:position.coords.latitude, lng: position.coords.longitude});
       const center = {
        lat: position.coords.latitude ,
        lng: position.coords.longitude,
      };
       console.log(initialLocation)
    });
}
const center = {
  lat: 32.3111117 ,
  lng: 34.8734416,
};
const Map= inject('users','rides')(observer((props)=> {
    console.log(props.ride)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD94ubm5h4StZkJ71eoCADnoezcpzTAo4k",
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
 useEffect(() => {
  setMarkers((current) => [
    ...current,
    {
      lat: initialLocation.lat,
      lng:initialLocation.lng,
      time: new Date(),
    },
  ]);
  }, [])
  useEffect(() => {
    setMarkers((current) => [
      ...current,
      {
        lat: 32.4340458,
        lng:34.9196518,
        time: new Date(),
      },
    ]);
    }, [])
    useEffect(() => {
        setMarkers((current) => [
          ...current,
          {
            lat: 32.0852999 ,
            lng:34.78176759999999,
            time: new Date(),
          },
        ]);
        }, [])
  const onMapClick = React.useCallback((e) => {
    console.log(e)
    console.log(markers)
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    setMarkers((current) => [
      ...current,
      {
        lat: lat,
        lng: lng,
        time: new Date(),
      },
    ],)
    mapRef.current.setZoom(17);
  }, []);
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <div>
      <h1>
      OneRoad{" "}
        <span role="img" aria-label="tent">
        <img src="https://img.icons8.com/officel/40/000000/waypoint-map.png"/>
        </span>
      </h1>
       <Locate panTo={panTo} />
      <Search panTo={panTo} /> 
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={initialLocation}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
          <MapDirectionsRenderer />
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              url: `https://img.icons8.com/officel/80/000000/map-pin.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                <img height="40px" width="40px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwvyS6m31YzJDsGOlRYdXgMXLQxMGNsj954A&usqp=CAU"/>
                </span>{" "}
               <p> Driver:{props.ride.driver.name}</p>
               <p>destination:{props.ride.destination}</p>
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}))
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }, console.log( position.coords.latitude, position.coords.longitude));
          },
          () => null
        );
      }}
    >
      <img src="https://img.icons8.com/plasticine/100/000000/street-view.png" alt="compass" />
    </button>
  );
}
function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });
  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
  const handleInput = (e) => {
    setValue(e.target.value);
    console.log(e.target.value)
  };
  const handleSelect = async (address) => {
    setValue(address, false);
    console.log(address)
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(lat, lng)
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your destination"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
function MapDirectionsRenderer() {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
   // const { places, travelMode } = props;
    const placesN = [
      {latitude: 32.4340458,longitude: 34.9196518},
      {latitude: 32.321458,longitude: 34.853196},
      {latitude: 32.266892,longitude: 35.009675},
      {latitude: 32.0852999,longitude: 34.78176759999999},
      
       
    ]
    const waypoints = placesN.map(p => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    //console.log(waypoints)
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination:destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        // origin: new window.google.maps.LatLng(32.0852999,34.78176759999999),
        // destination: new window.google.maps.LatLng(32.517127, 35.148529),
        // travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: waypoints
      },
      (result, status) => {
        console.log(result)
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          setError(result);
        }
      }
    );
  }, []);
  if (error) {
    return <h1>{error}</h1>;
  }
  console.log(directions)
  return (
     <div>
         {/* <DirectionsRenderer  />  */}
    {directions && <DirectionsRenderer directions={directions} />}
     </div>
  );
}

export default Map;
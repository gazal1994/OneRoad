import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
//import Search from './Search'
import MapDirectionsRenderer from './Directions'
//import Locate from './Locate'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import {
  DirectionsRenderer,
} from "@react-google-maps/api";
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
let initialLocation = {}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    initialLocation = ({ lat: position.coords.latitude, lng: position.coords.longitude });
  });
}
const Map = inject('users', 'rides')(observer((props) => {
  const rideId = props.match.params.rideId
  //let ride = null
  const [isRide, setIsRide] = useState(false)
  const [ride, setRide] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyD94ubm5h4StZkJ71eoCADnoezcpzTAo4k",
    libraries,
  });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    //  ride = props.rides.rides.find(r => r.id == rideId)
    setRide(props.rides.rides.find(r => r.id == rideId))
    console.log(ride);
    if (ride) {
      //setRide(ride2)
      setIsRide(true)
      setMarkers((current) => [
        ...current,
        {
          lat: parseFloat(ride.location.latitude),
          lng: parseFloat(ride.location.longitude),
          time: new Date(),
        },
        {
          lat: parseFloat(ride.destination.latitude),
          lng: parseFloat(ride.destination.longitude),
          time: new Date(),
        }
      ]);
    }
  }, [props.rides.rides])

  useEffect(() => {
    if (ride) {
      //setRide(ride2)
      setIsRide(true)
      setMarkers((current) => [
        ...current,
        {
          lat: parseFloat(ride.location.latitude),
          lng: parseFloat(ride.location.longitude),
          time: new Date(),
        },
        {
          lat: parseFloat(ride.destination.latitude),
          lng: parseFloat(ride.destination.longitude),
          time: new Date(),
        }
      ]);
    }
  }, [ride])
  const onMapClick = React.useCallback((e) => {
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
  /*  const panTo = React.useCallback(({ lat, lng }) => {
     mapRef.current.panTo({ lat, lng });
     setMarkers((current) => [
       ...current,
       {
         lat: lat,
         lng: lng,
         time: new Date(),
       },
     ])
     mapRef.current.setZoom(17);
   }, []); */
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  console.log(ride);

  return (
    <div>
      <h1>
        OneRoad{" "}
        <span role="img" aria-label="tent">
          <img src="https://img.icons8.com/officel/40/000000/waypoint-map.png" />
        </span>
      </h1>
      {/* <Locate panTo={panTo} />
      <Search panTo={panTo} /> */}
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={initialLocation}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        <MapDirectionsRenderer markers={markers} />
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
                  <img height="40px" width="40px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTwvyS6m31YzJDsGOlRYdXgMXLQxMGNsj954A&usqp=CAU" />
                </span>{" "}
                <p> Driver:{props.ride.driver.name}</p>
                <p>destination:{props.ride.destination}</p>
                <p>time:{props.distance}</p>
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>

      {ride ?
        <div style={{ color: 'white' }}>
          <p >price: {ride.distance / (ride.approvedPassengers.length + 1)}</p>
          <p>approved passengers:</p>
          {ride.approvedPassengers.map(p => <p>{p.name}</p>)}
          {ride.driver.id == props.users.loggedInUser.id ?
            ride.isDone ? <p>Ride Finished</p> :
              <button onClick={() => props.rides.finishRide(ride.id)}>Finish Ride</button>
            : null}
        </div>
        : null}
    </div>
  );
}))
export default Map;

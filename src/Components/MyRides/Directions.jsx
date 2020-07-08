import React, { useState, useEffect } from 'react';
import {
    DirectionsRenderer,
} from "@react-google-maps/api";
function MapDirectionsRenderer(markers) {
    console.log(markers.markers)
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        console.log(markers.markers)
        const waypoints = markers.markers.map(p => ({
            location: { lat: p.lat, lng: p.lng },
            stopover: true
        }));
        const origin = waypoints.shift().location;
        const destination = waypoints.pop().location;
        const directionsService = new window.google.maps.DirectionsService();
        const distanceMatrixService = new window.google.maps.DistanceMatrixService();
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
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
        distanceMatrixService.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC
        },
            (result, status) => {
                //console.log(result.rows[0].elements[0].distance.text, result.rows[0].elements[0].duration.text)
                if (status === "OK") {
                    setDistance(result);
                    // markers.getDistanc(result.rows[0].elements[0].distance.text +" "+ result.rows[0].elements[0].duration.text)
                } else {
                    setError(result);
                }
            }
        );
    }, []);
    if (error) {
        return <h1>{error}</h1>;
    }
    return (
        <div>
            {distance && directions && <DirectionsRenderer distance={distance} directions={directions} />}
        </div>
    );
}
export default MapDirectionsRenderer;
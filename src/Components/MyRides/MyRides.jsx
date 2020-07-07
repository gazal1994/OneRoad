import React, { useState, useEffect } from 'react'
import MyRide from './MyRide'
import {observer, inject} from 'mobx-react'


const MyRides= inject('users','rides')(observer((props)=> {
  debugger

    return (
   <div></div>
    )
  }
))
export default MyRides;
// const [address, setAddress] = React.useState({location:''});
// const [coordinates,setCoordinates]=React.useState({lat:null,lng:null})
// const handleChange = name => value => {
//   setAddress({...address, [name]: value})
// }

// const handleSelect = (name) => async (value) => {
//   /* console.log(name) */
//   const results = await geocodeByAddress(value)
//   const latLng = await getLatLng (results[0])
//   setAddress({...address, [name]: value})
//   setCoordinates(latLng)

// };
// console.log(address)

// <PlacesAutocomplete
        //   value={address.location}
        //   onChange={handleChange('location')}
        //   onSelect={handleSelect('location')}
          
        // >
        //   {({
        //     getInputProps,
        //     suggestions,
        //     getSuggestionItemProps,
        //     loading,
        //   }) => (
        //     <div>
        //       <p>Latitude:{coordinates.lat}</p>
        //       <p>Longitude:{coordinates.lng}</p>
        //       <input  {...getInputProps({ placeholder: "Type address" })}  />
        //       <div>
        //         {loading ? <div>...loading</div>:null}
        //         {suggestions.map((suggestion)=>{
        //           const style =suggestion.active
        //           ? { backgroundColor: '#fafafa', cursor: 'pointer' }
        //           : {null }
                  
        //           return <div {...getSuggestionItemProps(suggestion,{style})}>{suggestion.description}</div>
        //         })}
        //       </div>
        //     </div>
        //   )}
        // </PlacesAutocomplete>
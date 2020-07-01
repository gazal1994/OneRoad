import React ,{useState} from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Input from '../Common/Input'
import CommonButton from "../Common/CommonButton";
import TextField from "@material-ui/core/TextField";
import Driver from '../../store/users/users.json'

const Operation= inject(
  "users",
  "rides"
)(
  observer((props) => {
      const driver=Driver[0]
      const [textInput, setTextInput] = useState({location:'',destination:'',departureTime:''});
      const handleChange = (e) => {
      const name = e.target.name;
      setTextInput({...textInput,[name]:e.target.value});
      props.rides.pushTohandelInput(textInput)
      }

      console.log(props.rides.handelInput)

  const checkTypeUser=()=>{
      if(props.match.params.type=='passenger'){
          return 'Search'
      }else{
          return 'declare ride'
      }
  }
      
    return (
      <div>
     { props.match.params.type}
          location:<TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.location}
          name= "location"
          onChange={handleChange}
        />
          destination:<TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.destination}
          name= "destination"
          onChange={handleChange}
        />
          departure time:<TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={textInput.departureTime}
          name= "departureTime"
          onChange={handleChange}
        />
     {/* <Link to='/Landing'> */} <CommonButton textInput={textInput} setTextInput={setTextInput} operation={props.match.params.type} name = {checkTypeUser()}/>{/* </Link> */}
      </div>
    );
  })
);

export default Operation;
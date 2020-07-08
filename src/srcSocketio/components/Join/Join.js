import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn(props) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  useEffect(() => {
    console.log(props.ride)
    setName(props.name)
     setRoom(props.ride)
     console.log(name)
  },[]);
  
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">chat</button>
        </Link>
      </div>
    </div>
  );
}

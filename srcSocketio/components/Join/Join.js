import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn(userName,ride) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  useEffect(() => {
    setName("gazal")
     setRoom("natnya-holon")
  });
  
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

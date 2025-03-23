import axios from 'axios';
import React, { useEffect } from 'react'

function Home() {

useEffect(() => {

    axios.defaults.withCredentials = true
    
    axios.get("http://localhost:5000/home")
    .then(result => {
      if (result.data !== "Success") {
        // navigate("/login");
      } 
    })
    .catch((err) => console.log(err));
   
}, []);

  return (
    <div>Home</div>
  )
}

export default Home

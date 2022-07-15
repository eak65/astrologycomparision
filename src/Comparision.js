import React, { useEffect, useState } from "react";
import {useParams, useLocation} from "react-router-dom";
import './App.css';


  function Result() {
    // Initialize state to hold the posts
    const [posts, setPosts] = useState([]);
    const id = useParams().id
  
    // effect functions can't be async, so declare the
    // async function inside the effect, then call it
    useEffect(() => {
      async function fetchData() {
        // Call fetch as usual
        const res = await fetch('https://84dvvklokj.execute-api.us-east-1.amazonaws.com/Production/compatibility?id='+id);
  
        // Pull out the data as usual
        const json = await res.json();
  
        // Save the posts into state
        // (look at the Network tab to see why the path is like this)
        setPosts(json);
      }
  
      fetchData();
    }); // <-- we didn't pass a value. what do you think will happen?
  
    // Render as usual
    return (
        
      <>
      {posts.as1}
      {posts.description}
      {posts.as2}
      </>
    );
  }


//   useEffect(() => {
//     const getUsers = async () => {
//       const users = await fetch('https://84dvvklokj.execute-api.us-east-1.amazonaws.com/Production/compatibility?id='+useParams().id)
//       .then(response => response.json())
//       .then(data => useState.count = data);
//       setUsers(users);
//     };
  
//     return () => {
//       // this now gets called when the component unmounts
//     };
//   }, []);
export default Result;

import React from "react";
import {useParams, useLocation} from "react-router-dom";

function Result()  {
    fetch('https://84dvvklokj.execute-api.us-east-1.amazonaws.com/Production/compatibility?id='+useParams().id)
    .then(response => response.json())
    .then(data => console.log(data));
    
    return (<div>{useParams().id}</div>)
    
  }
export default Result;
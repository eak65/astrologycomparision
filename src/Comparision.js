import React, { useEffect, useState } from "react";
import {useParams, useLocation} from "react-router-dom";

import aquarius from './images/aquarius.jpg';
import aries from './images/aries.jpg';
import cancer from './images/cancer.jpg';
import capricorn from './images/capricorn.jpg';
import gemini from './images/gemini.jpg';
import leo from './images/leo.jpg';
import libra from './images/libra.jpg';
import pisces from './images/pisces.jpg';
import sagittarius from './images/sagittarius.jpg';
import scorpio from './images/scorpio.jpg';
import taurus from './images/taurus.jpg';
import virgo from './images/virgo.jpg';


  function Result() {
    // Initialize state to hold the posts
    const [posts, setPosts] = useState([]);
    const id = useParams().id
    const [image1, setImage1] = useState([]);
    const [image2, setImage2] = useState([]);

    var loaded = false;
    // effect functions can't be async, so declare the
    // async function inside the effect, then call it
    console.log("render")

    useEffect(() => {
      async function fetchData() {
        // Call fetch as usual
        console.log("begin load")

        const res = await fetch('https://84dvvklokj.execute-api.us-east-1.amazonaws.com/Production/compatibility?id='+id);
  
        // Pull out the data as usual
        const json = await res.json();
        // Save the posts into state
        // (look at the Network tab to see why the path is like this)
        console.log("save response")
        setImage2(getImage(posts.as2));
        console.log("load images ")
        setImage1(getImage(posts.as1));
        console.log(image1)
        setPosts(json);

      }
      function getImage(value) {
        var image;
        if (value == "Aquarius") {
            image = aquarius
        } else if (value == "Aries") {
            image = aries
        } else if (value == "Cancer") {
            image = cancer
        } else if (value == "Capricorn") {
            image = capricorn
        } else if (value == "Gemini") {
            image = gemini
        } else if (value == "Leo") {
            image = leo
        } else if (value == "Libra") {
            image = libra
        } else if (value == "Pisces") {
            image = pisces
        } else if (value == "Sagittarius") {
            image = sagittarius
        } else if (value == "Scorpio") {
            image = scorpio
        } else if (value == "Taurus") {
            image = taurus
        } else if (value == "Virgo") {
            image = virgo
        } else {
            console.log(value)
            console.log("nothing")
        }
        return image;
      }
      fetchData();
      loaded = true;
    },[image2]); // <-- we didn't pass a value. what do you think will happen?
    return (
        <div>
            <div className="row-12 text-center">
                <h1>🔥 Astrology Sign Compatability 🔥</h1>
            </div>
            <div className="row">
                <div className="col-6 d-block m-auto">
                <img className="Circular" src={image1}  />
                </div>
                <div className="col-6 ">
                 <img className="Circular" src={image2}  />
                </div>
            </div>
                <div className="row mt-5" style={ {borderRadius:'5px', backgroundColor:'rgba(0, 0, 0, 0.5)', padding:'15px'}} >
                    <div className="col ">
                         <p class="text-center">
                                  Compatibility Rating: <span  style={{ padding:'5px', borderRadius:'5px', backgroundColor:'green', color:'white', fontWeight: 'bold'}}> 96% </span>
                         </p>
        </div>
   
      <div className="row mt-2">
        <div className="col-8 offset-2">
    
         {posts.description}
        </div>
        </div>
        
        </div>
    </div>

    );
  }
export default Result;

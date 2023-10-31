import React, { useEffect } from 'react'
import { useState } from 'react';
import Styles from "./Card.module.css";
export default function Card(props) {
    const[showAll,setShowAll]=useState(false);
    const[expand,setExpand]=useState("Tap to expand...")
    // const[ssec,milliSec]=props.createdAt
    function handleShow(){
        //{showAll===true?setShowAll(false):setShowAll(true)};
        if(showAll===true){
           
            setShowAll(false); 
            setExpand("Tap to expand...");
        }
        else{      
            setShowAll(true); 
            setExpand("Shrink...");
        }
    }
     const createdAt=props.createdAtDate;
     let today="";
     let atTime=""
    // const today=props.createdAt.toDate().toLocalDate();
    // const atTime = props.createdAt.toDate().toLocaleTimeString();
   
   async function  getTimeAndDate(createdAt) {
      let time = {
        seconds: createdAt.seconds,
        nanoseconds: createdAt.nanoseconds,
      };
      const fireBaseTime =  new Date(
        time.seconds * 1000 + time.nanoseconds / 1000000
      );
      //  const date = fireBaseTime.toDateString();
      const mon = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = fireBaseTime.getDate();
      const month = mon[fireBaseTime.getMonth()];
      const year = fireBaseTime.getFullYear();
       atTime = fireBaseTime.toLocaleTimeString();
       today = `${month} ${date},${year}`;
    }
   getTimeAndDate (createdAt) 
    // useEffect(
    //  getTimeAndDate(createdAt)
    // ,[])

  return (
    <div className={`${showAll===true?Styles.dailyThingsShowFull:Styles.dailyThings}`}>
    <div className={Styles.timeAndDate}>     
   { `${today} At ${atTime}`}
    </div>
    {props.content}
    <div className={Styles.continue} onClick={handleShow}>{expand}</div>
    </div>
  )

}

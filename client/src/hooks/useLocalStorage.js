import React, { Component, useEffect, useState } from "react";

const PREFIX = "myapp-clone-";
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {

    const jsonValue = localStorage.getItem(PREFIX + key);
    if (jsonValue!==null && jsonValue!==undefined) return JSON.parse(jsonValue);
    console.log("initialValue", initialValue, localStorage);
    if(!initialValue) return null;
    if (typeof initialValue == "function") return initialValue();
    return initialValue;
  });


  useEffect(async() => {
    
    console.log("---> useEffect ",key,value)
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    const store = JSON.stringify(localStorage);
    const obj = {id:JSON.parse(localStorage.getItem("myapp-clone-id")),value:store};

    if(key!=='id' && value.length===0){
      console.log("func--> ",key)
      return [value, setValue];
    }
    try{   
const result = await fetch("https://chatty9242.herokuapp.com/transfer",{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(obj),
})
console.log("posting to mongodb successfully");
    }
    catch{
      console.log("error posting to mongodb");
    }



  }, [PREFIX + key, value]);

  return [value, setValue];
};
export default useLocalStorage;

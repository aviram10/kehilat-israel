import { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../config/server';


const keys = ["fixed", "prayer_name", "dependecy", "minutes", "serial", "id", "category"]
export async  function handlePrayer(type, data){
    console.log(type, data);
    const prayer = {};
   keys.forEach(key => {
      prayer[key] = data[key];
   }) 
    let url1 = url + "/times/prayers"
    try{
        switch(type){
        case 1:
           return await axios.post(url1, prayer, {withCredentials: true});
        case 2:
            return await axios.put(url1+"/"+data.id, prayer, {withCredentials: true});
        case 3:
            return data.forEach( async p => await axios.delete(url1+"/"+p, {withCredentials: true}));
        default:
            return;
    } 
    }catch(err){
        console.log(err);
    }
   
}

export async function get(endPoint){
    console.log("get", endPoint, url);
    try{
        const {data} = await axios.get(url+endPoint, {withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function post(endPoint, data){
    try{
        const {data: res} = await axios.post(url+endPoint, data, {withCredentials: true});
        return res;
    }catch(err){console.log(err);}
}


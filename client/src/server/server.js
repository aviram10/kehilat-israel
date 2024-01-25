import { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../config/server';




export async function get(endPoint){
    console.log("get", endPoint, url);
    try{
        const {data} = await axios.get(url+endPoint, {withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function post(endPoint, data){
   
        const result = await axios.post(url+endPoint, data, {withCredentials: true});
        return result;
    
}


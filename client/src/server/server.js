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

export async function post(endPoint, body){
        const {data} = await axios.post(url+endPoint, body, {withCredentials: true});
        return data;
}

export async function put(endPoint, body){
        const {data} = await axios.put(url+endPoint, body, {withCredentials: true});
        return data;
}


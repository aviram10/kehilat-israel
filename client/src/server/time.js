import axios from 'axios';
import {url} from '../config/server';


export function convertToLocalTime(time){
    return time.split('T')[1].slice(0,5);
}


export async function getTimes(){
    try{
        const { data } = await axios.get(`${url}/times`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}


import axios from 'axios';
import { url } from '../config/server';

export async function getDedications(){
    try{
        const { data } = await axios.get(`${url}/dedications`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function getDonations(){
    try{
        const { data } = await axios.get(`${url}/donations`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function getDebts(){
    try{
        const { data } = await axios.get(`${url}/debts`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}









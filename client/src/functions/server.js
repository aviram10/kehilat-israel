import axios from 'axios';
import { url } from '../config/server';


export async function getMessages(filters={}) {
    try {
        const query = Object.entries(filters).map(([key, value]) => `${key}=${value}`).join("&");
        const { data } = await axios.get(`${url}/messages`,{withCredentials: true});
        return data;
    } catch (err) { console.log(err); }
}

export async function toggleLike( id){
    try{
        const { data } = await axios.put(`${url}/messages/${id}/likes`, {},{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}






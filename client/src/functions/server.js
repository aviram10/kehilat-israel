import axios from 'axios';
import { url } from '../config/server';


export async function getMessages(filters={}) {
    try {
        
        const { data } = await axios.get(`${url}/messages`,{withCredentials: true});
        console.log(data);
        return data;
    } catch (err) { console.log(err); }
}

export async function toggleLike( id){
    try{
        const { data } = await axios.put(`${url}/messages/${id}/likes`, {},{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}






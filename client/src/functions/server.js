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

export async function deleteMessage(message_id){
    try{
        const { data } = await axios.delete(`${url}/messages/${message_id}`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function postMessage(message){
    try{
        const { data } = await axios.post(`${url}/messages`, message,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function postComment(message_id, comment){
    try{
        const { data } = await axios.post(`${url}/messages/${message_id}/comments`, comment,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function deleteComment(message_id, comment_id){
    try{
        const { data } = await axios.delete(`${url}/messages/${message_id}/comments/${comment_id}`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function editMessage(message_id, message){
    try{
        const { data } = await axios.put(`${url}/messages/${message_id}`, message,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function editComment(message_id, comment_id, comment){
    try{
        const { data } = await axios.put(`${url}/messages/${message_id}/comments/${comment_id}`, comment,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}   






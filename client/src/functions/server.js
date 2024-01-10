import axios from 'axios';
import { url } from '../config/server';


export async function getPosts(filters={}) {
    try {
        const { data } = await axios.get(`${url}/posts`,{withCredentials: true});
        return data;
    } catch (err) { console.log(err); }
}

export async function toggleLike( id, type = 'posts'){
    try{
        const { data } = await axios.put(`${url}/${type}/${id}/likes`, {},{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function deletePost(post_id){
    try{
        const data = await axios.delete(`${url}/posts/${post_id}`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function postPost(post){
    try{
        const { data } = await axios.post(`${url}/posts`, post,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function postComment( comment, post_id){
    try{
        const { data } = await axios.post(`${url}/posts/${post_id}/comments`, {content: comment},{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function deleteComment(post_id, comment_id){
    try{
        const { data } = await axios.delete(`${url}/posts/${post_id}/comments/${comment_id}`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function editPost(post_id, post){
    try{
        const { data } = await axios.put(`${url}/posts/${post_id}`, post,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function editComment(post_id, comment_id, comment){
    try{
        const { data } = await axios.put(`${url}/posts/${post_id}/comments/${comment_id}`, comment,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
} 

export async function getUser(user_id){
    console.log("getUser", user_id);
    try{
        const { data } = await axios.get(`${url}/users/${user_id || sessionStorage.user_id}`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function getUsers(){
    try{
        const { data } = await axios.get(`${url}/users`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

export async function getTimes(){
    try{
        const { data } = await axios.get(`${url}/times`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}

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

export async function deleteUser(user_id){
    try{
        const { data } = await axios.delete(`${url}/users/${user_id}`,{withCredentials: true});
        return data;
    }catch(err){console.log(err);}
}








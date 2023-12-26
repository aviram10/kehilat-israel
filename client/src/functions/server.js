import axios from 'axios';
import { url } from '../config/server';


export async function getPosts(filters={}) {
    try {
        const { data } = await axios.get(`${url}/posts`,{withCredentials: true});
        console.log(data);
        return data;
    } catch (err) { console.log(err); }
}

export async function toggleLike( id, type = 'posts'){
    try{
        const { data } = await axios.put(`${url}/${type}/${id}/likes`, {},{withCredentials: true});
        console.log(data);
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






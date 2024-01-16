import axios from "axios";
import{url} from '../config/server'

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

export async function deletePosts(post_id){
    console.log("deletePosts", post_id);
    if(!post_id) return console.log("No post_id");
    if(!(post_id instanceof Array)) post_id = [post_id];
    console.log("server deletePosts", post_id);

    try{
        const results = post_id.map(id =>axios.delete(`${url}/posts/${id}`,{withCredentials: true}));
        Promise.allSettled(results).then(res=>console.log(res));
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


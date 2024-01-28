import axios from "axios";
import { url } from "../config/server";
import {get, post} from "../server/server"
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

export async function deleteUsers(user_id){
    if(!user_id) return console.log("No user_id");
    if(!(user_id instanceof Array)) user_id = [user_id];
    try{
        let results = user_id.map(id =>axios.delete(`${url}/users/${id}`,{withCredentials: true}));
        results = await Promise.allSettled(results)
        console.log(results);
        return results;
    }catch(err){console.log(err);}
}

export async function manager(user_id){
    try{
        console.log("manager", user_id);
        const { data } = await axios.put(`${url}/users/${user_id}`, {role: "מנהל"},{withCredentials: true});
        console.log("success");
        return data;
    }catch(err){console.log(err);}
}

export async function addDebt({amount, user_id}){
    if(!amount || !user_id) throw new Error("No amount or user_id")
    return await post(`/users/${user_id}/debt?action=add`, { amount});
}

export async function newDebt(amount, user_id){
   
    if(!amount || !user_id) throw new Error("No amount or user_id")
    const data =  await post(`/users/${user_id}/debt?action=new`, { amount});
    console.log("users", data);
    return data
    
}
    


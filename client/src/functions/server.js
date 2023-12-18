import axios from 'axios';
import { url } from '../config/server';


export async function getMessages(filters={}) {
    try {
        const query = Object.entries(filters).map(([key, value]) => `${key}=${value}`).join("&");
        const { data } = await axios.get(`${url}/messages`);
        return data;
    } catch (err) { console.log(err); }
}



import axios from "axios";
import{url} from '../config/server'

export const addPrayer = async (data) => {
   return await axios.post(`${url}/prayers`, data, {withCredentials: true})
}

export const editPrayer = async (data, prayer_id) => {
    return await axios.put(`${url}/prayers/${prayer_id}`, data, {withCredentials: true})
    }
    
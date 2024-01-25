import axios from "axios";
import{url} from '../config/server'

const keys = ["fixed", "prayer_name", "dependency", "minutes", "serial", "id", "category"]

export const addPrayer = async (data) => {
   try {
      console.log(data);
      const prayer = {};
      keys.forEach(key => {
         prayer[key] = data[key];
      }) 
      const result =  await axios.post(`${url}/times/prayers`, prayer, {withCredentials: true});
      return result;
   } catch (error) {
      console.error(error);
   }
}

export const updatePrayer = async (data) => {
   const prayer = {};
   keys.forEach(key => {
     prayer[key] = data[key];
  }) 
    return await axios.put(`${url}/times/prayers/${data.id}`, data, {withCredentials: true})
   }

export const deletePrayer = async (prayer_id) => {
   return await axios.delete(`${url}/times/prayers/${prayer_id}`, {withCredentials: true})
}
    
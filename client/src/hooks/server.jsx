import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { url } from '../config/server';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Cookies from "js-cookie";
import { DateTime } from "luxon";
export  function useGet(endPoint, filter = {}) {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    let fullUrl = url +'/'+ endPoint;
    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(fullUrl,{withCredentials: true});
                if(data[0]?.date) data.forEach(d => d.date = DateTime.fromISO(d.date).toLocaleString());
                setData(data);
            } catch (error) {
                console.log("error", error);
                setUser({});
                navigate("/login", );
                Cookies.remove("token");
                Cookies.remove("user_id");
            }
        }
        fetchData();
    }, [fullUrl]);
    return [data, setData];
}

export  function usePost(endPoint, data) {
    const [response, setResponse] = useState(null);
    let fullUrl = url + endPoint;

    useEffect(() => {
        async function fetchData() {
            try {
                setResponse( await axios.post(fullUrl, data, {withCredentials: true}));
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, [data, fullUrl]);

    return [response, setResponse];
}

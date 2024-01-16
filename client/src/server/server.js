import { useState, useEffect } from 'react';
import axios from 'axios';
import {url} from '../config/server';

export  function useGet(endPoint) {
    const [data, setData] = useState(null);
    url = url + endPoint;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(url,{withCredentials: true});
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, []);

    return data;
}

export  function usePost(endPoint, data) {
    const [response, setResponse] = useState(null);
    url = url + endPoint;

    useEffect(() => {
        async function fetchData() {
            try {
                setResponse( await axios.post(url, data, {withCredentials: true}));
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchData();
    }, [data]);

    return [response, setResponse];
}


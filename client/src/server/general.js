// import axios from 'axios';
// import { url } from '../config/server';
// import Cookies from 'js-cookie';
// import { useContext } from 'react';
// import {useNavigate} from 'react-router-dom';
// import {UserContext} from "../App";

// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { UserContext } from './UserContext'; // Import UserContext from where it's defined

// export default function useGet() {
//     const [user, setUser] = useContext(UserContext);
//     const navigate = useNavigate();

//     return async function Server(source) {
//         try {
//             const { data } = await axios.get(`${url}/${source}`, { withCredentials: true });
//             return data;
//         } catch (err) {
//             Cookies.remove("token");
//             Cookies.remove("user_id");
//             setUser({});
//             navigate("/login");
//             return [];
//         }
//     }
// }









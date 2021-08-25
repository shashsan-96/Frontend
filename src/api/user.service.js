import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/shop/";


const getUserByID = (id) => {
  const a  = axios.get(API_URL +`user/${id}`, { headers: authHeader() });
  return a;
};

const deleteUserByID = (id) => {
  const a  = axios.delete(API_URL +`user/${id}`, { headers: authHeader() });
  return a;
};

const updateUser = (id,data) => {
  const a  = axios.put(API_URL +`user/${id}`,data, { headers: authHeader() });
  return a;
};

const getUser = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};


const getAdmin = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
const exp = {
  
  getUserByID,
  getUser,
  getAdmin,
  updateUser,
  deleteUserByID


};


export default  exp;
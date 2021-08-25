import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/shop/";




const createFeedBack = (rate, message, date) => {

    console.log("f"+date)
    const a  = axios.post(API_URL +"user/feedBack",{
        rate,
        message,
        date,
      }, { headers: authHeader() });
    return a;
  };
  
  const getAllFeedbacks = () => {
    const a  = axios.get(API_URL +"admin/feedBack", { headers: authHeader() });
    return a;
  };
  
  const DeleteFeedBackById = (id,data) => {
    const a  = axios.delete(API_URL +`admin/feedBack/${id}`, { headers: authHeader() });
    return a;
  };
  
  const DeleteAll = () => {
    return axios.delete(API_URL + "admin/feedBack", { headers: authHeader() });
  };
  
  
 
  const exp = {
    
    createFeedBack,
    getAllFeedbacks,
    DeleteFeedBackById,
    DeleteAll
  
  
  };
  
  
  export default  exp;
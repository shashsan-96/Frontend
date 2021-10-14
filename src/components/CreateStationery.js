import React, {useState} from "react";

import axios from "axios";
import '../StyleStationery.css';
import Loading from '../Loading';
import { Link } from 'react-router-dom';


 const CreatedStationery = () => {
//set state
const [StationeryId, setStationeryId] = useState("");
const [Title, setTitle] = useState("");
const [ISBN, setISBN] = useState("");
const [Category, setCategory] = useState("");
const [Price, setPrice] = useState("");
const [Description, setDescription] = useState("");
const [fileName, setFileName] = useState("");

//set file according to user input
const onChangeFile = e =>{
  setFileName(e.target.files[0]);
}

const changeOnClick = e => {
  e.preventDefault();

  //create object
//library generating an object of values from a set of inputs
  const formData = new FormData();

  formData.append("StationeryId", StationeryId);
  formData.append("Title", Title);
  formData.append("ISBN", ISBN);
  formData.append("Category", Category);
  formData.append("Price", Price);
  formData.append("Description", Description);
  formData.append("Img",fileName);


//after submit al fields set as empty
setStationeryId("");
setTitle("");
setISBN("");
setCategory("");
setPrice("");
setDescription("");
 
  //pass object to back end from http request using axios
  axios
  .post("/stationery/save",formData)
  .then(res => console.log(res.data))
  alert("created successfully")
  .catch(err =>{
    console.log(err);
  });
  
}




return (
    <div className="fd">
       <div className="rh2"> 
       <button className="btn btn-primary"><Link to={"/"} style={{textDecoration:'none',color:'white'}}>Back to stationery List</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
       
       <button className="btn btn-primary"><Link to={"/display"} style={{textDecoration:'none',color:'white'}}>Customer view</Link></button></div>  
    <div className="fd4">
      
          
            <form onSubmit={changeOnClick} encType="multipart/form-data"> 
<div className="fd1">
<h1 className="h3 mb-3 font-weight-normal">Create new stationery</h1>
              <div className="form-group" style={{marginBottom: '10px'}}>
              <i className="fa fa-list-alt"></i>&nbsp;&nbsp;
                <label htmlFor="StationeryId" style={{marginBottom:'5px'}}> StationeryId</label><br/>
                <input type="text "  
                className="input"
                required
                onChange ={e =>setStationeryId(e.target.value)}//change value according to user input
                pattern="[S][0-9]{5}"
                name="StationeryId"
                placeholder="Enter StationeryId ex:S12377 "
               />
                </div>



                <div className="form-group" style={{marginBottom: '10px'}}>
                <i className="fa fa-calendar-o"></i>&nbsp;&nbsp;
                <label htmlFor="Title" style={{marginBottom:'5px'}}> Title</label><br/>
                <input type="text "
                className="input"
                 required
                 onChange ={e =>setTitle(e.target.value)}
                
                name="Title"
                placeholder="Enter Title"
                />
                </div>



                <div className="form-group" style={{marginBottom: '10px'}}>
                <i className="fa fa-rss-square" aria-hidden="true"></i>&nbsp;&nbsp;
                <label htmlFor="ISBN" style={{marginBottom:'5px'}}> ISBN</label><br/>
                <input type="text "
                 className="input"
                 required  
                 onChange ={e =>setISBN(e.target.value)}
                
                name="ISBN"
                placeholder="Enter ISBN"
               />
                </div>


                <div style={{marginBottom: '10px'}}>
                <i className="fa fa-university" aria-hidden="true"></i>&nbsp;&nbsp;
                <label  htmlFor="Category">Category</label><br/>
                <select
                 className="input"
              
                 required
                 onChange ={ (e) =>{
                   const selectedop = e.target.value;
                   setCategory(selectedop);
                 }}
                 >
                    <option value="Enter stationery Type">Enter Stationery Type</option>
                     <option value="Drawing">Drawing</option>
                          <option value="Writing">Writing</option>
                          <option value="Working">Working materials</option>
                          <option value="Office">Office</option>

               </select>
             </div>

                     

                  </div>

               


               

            <div className ="fd2">
               


               <div className="form-group" style={{marginBottom: '10px'}}>
                <i className="fa fa-usd" aria-hidden="true"></i>&nbsp;&nbsp;
                <label htmlFor="Price" style={{marginBottom:'5px'}}> Price</label><br/>
                <input type="number " 
               className="input"
                 onChange ={e => setPrice(e.target.value)} 
                 required
                
                name="Price"
                placeholder="Enter Price LKR"
               />
                </div>
                
                <div style={{marginBottom: '10px'}}>
                <i class="fa fa-window-maximize" aria-hidden="true"></i>&nbsp;&nbsp;
                <label htmlFor="Description" style={{marginBottom:'5px'}}> Description</label><br/>
                <textarea
                 row ="140"
                 className="input2"
                 onChange ={e => setDescription(e.target.value)} 
                 required
                
                name="Description"
                placeholder="Enter Description"
               />
                </div>
             
                         
         </div>

         <div className="fd3">
                <div className="mb-3">
                        <div className="ki">
                            <center>
  
                            <div className="ki2">                         
                          <div className="form-group">
                          <i className="fa fa-cloud-upload" aria-hidden="true"></i>&nbsp;&nbsp;
                            <label htmlFor="file">choose image</label>
                            <input type="file" filename="Img" className="form-control-file"
                              className="input"
                            required
                            onChange={onChangeFile}/>
                          </div>
                          </div>
                          </center>
                          </div>
                        
                        </div><br/>



                <button className="btn btn-primary" type="submit" style={{marginTop:'10px'}} >
                  <i className="far fa-check-square"></i>
                  &nbsp;Create New Stationery
                  </button>
                 
                  </div>
                         
                       
                      
</form>
      
      
      </div>
      </div>
 
  )
}

export default CreatedStationery

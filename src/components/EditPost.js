import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom';
import axios from 'axios'
import '../StyleStationery.css';


export default class EditPost extends Component {

    constructor(props){
        super(props);
        this.state={
          
          StationeryId:"",
          Title:"",
          ISBN:"Drawing",
          Category:"",
          Price:"",
          Description:"",
          price:"",
         

        }
      }
    
      handleInputChange = (e) =>{
    
        const {name,value} = e.target;
    
        this.setState({
          ...this.state,
          [name]:value
    
        })
      }
    
    
    
      handleCategoryChange = event =>{
        this.setState({
          Category:event.target.value
        })
      }

     
    
      onSubmit =(e) =>{
       
        e.preventDefault();
       
    
        const{StationeryId,Title,ISBN,Category,Price,Description} = this.state;
    
        const data = {
          StationeryId:StationeryId,
          Title:Title,
          ISBN:ISBN,
          Category:Category,
          Price:Price,
          Description:Description,
         
        }
    
        console.log(data)
        const id = this.props.match.params.id;
        axios.put(`/stationery/other/${id}`,data).then((res)=>{
          if(res.data.success){
              alert("stationery Updated successfully")
           
          }
        })
    }

     componentDidMount(){

        const id = this.props.match.params.id;
        axios.get(`/stationery/${id}`).then((res)=>{
            if(res.data.success){
            this.setState({
              StationeryId:res.data.stationery.StationeryId,
                Title:res.data.stationery.Title,
                ISBN:res.data.stationery.ISBN,
                Category:res.data.stationery.Category,
                Price:res.data.stationery.Price,
                Description:res.data.stationery.Description,
                
             
              
                

            });
            console.log(this.state.stationery);
        }
        });
        
    }
    render() {

   return (

    <div className="fd">
    <div className="rh2"> 
    <button className="btn btn-primary"><Link to={"/"} style={{textDecoration:'none',color:'white'}}>Back to stationery List</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
    
    <button className="btn btn-primary"><Link to={"/display"} style={{textDecoration:'none',color:'white'}}>Customer view</Link></button></div>  
    <div className="fd4">
   
         
         <form onSubmit={this.onSubmit} encType="multipart/form-data"> 

<div className="fd1">
<h1 className="h3 mb-3 font-weight-normal">Edit stationery</h1><br/>
           <div className="form-group" style={{marginBottom: '10px'}}>
           <i className="fa fa-list-alt"></i>&nbsp;&nbsp;
             <label htmlFor="StationeryId" style={{marginBottom:'5px'}}> StationeryId</label><br/>
             <input type="text "  
             className="input"
           
             value={this.state.StationeryId}
             editable = {false}
             pattern="[S][0-9]{5}"
             name="StationeryId"
            
             
            />
             </div>



             <div className="form-group" style={{marginBottom: '10px'}}>
             <i className="fa fa-calendar-o"></i>&nbsp;&nbsp;
             <label htmlFor="Title" style={{marginBottom:'5px'}}> Title</label><br/>
             <input type="text "
             className="input"
              required
              value={this.state.Title}
              onChange={this.handleInputChange}
             
             name="Title"
             placeholder="Enter Title"
             />
             </div>






             <div className="form-group" style={{marginBottom: '10px'}}>
             <i className="fa fa-commenting" aria-hidden="true"></i>&nbsp;&nbsp;
             <label  htmlFor="ISBN" style={{marginBottom:'5px'}}> ISBN</label><br/>
             <input type="text "  
              className="input"
             name="ISBN"
             value={this.state.ISBN}
                onChange={this.handleInputChange}
             placeholder="Enter ISBN"
             required
            />
             </div>


             <div style={{marginBottom: '10px'}}>
             <i class="fa fa-window-maximize" aria-hidden="true"></i>&nbsp;&nbsp;
             <label  htmlFor="">Category</label><br/>
             <select
              className="input"
              required
              value={this.state.Category}
              onChange={this.handleCategoryChange}
            
              >
                 <option value="Enter category">Enter Category</option>
                  <option value="Drawing">Drawing</option>
                       <option value="Writing">Writing</option>
                       <option value="Working">Working</option>
                       <option value="Office">Office</option>

            </select>
        </div><br/>

        
        <button className="btn btn-primary" type="submit" style={{marginTop:'10px'}} >
                  <i className="far fa-check-square"></i>
                  &nbsp;Update
                  </button>
           



</div>

             <div className="fd2"><br/>
             <div className="form-group" style={{marginBottom: '10px'}}>
             <i className="fa fa-usd" aria-hidden="true"></i>&nbsp;&nbsp;
             <label htmlFor="Price" style={{marginBottom:'5px'}}> Price</label><br/>
             <input type="text" 
              className="input"
              value={this.state.Price}
                onChange={this.handleInputChange}
            
             name="Price"
             placeholder="Enter Price LKR"
             required
            />
             </div>

             <div className="form-group" style={{marginBottom: '10px'}}>
             <i class="fa fa-window-maximize" aria-hidden="true"></i>&nbsp;&nbsp;
                <label  style={{marginBottom:'5px'}}> Description</label>
                <textarea
                 row ="140"
                 className="input2"
                name="Description"
                
                placeholder="Enter Description"
                value={this.state.Description}
                onChange={this.handleInputChange}
                required
                />
                </div>


            


           

            
             
           </div>







             
         </form>
   
   
   </div>
   </div>

)
}
}
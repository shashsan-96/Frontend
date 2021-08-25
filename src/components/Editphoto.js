import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios'
import '../StyleStationery.css';


export default class Editphoto extends Component {

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
            Img:""
        }
      }

      onFileChange = event => {
        this.setState({
          Img: event.target.files[0] })
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
        const formData = new FormData();

  formData.append('StationeryId', this.state.StationeryId);
  formData.append('Title' ,this.state.Title);
  formData.append('ISBN', this.state.ISBN);
  formData.append('Category', this.state.Category);
  formData.append('Price', this.state.Price);
  formData.append('Description',this.state.Description);
  formData.append('Img',this.state.Img);
    
      
    
   const id = this.props.match.params.id;    
   axios.put(`/stationery/update/${id}`,formData).then((res)=>{
    if(res.data.success){
        alert("Stationery Updated successfully")
      this.setState(
        {
            StationeryId:"",
            Title:"",
            ISBN:"Drawing",
            Category:"",
            Price:"",
            Description:"",
            price:""
        }
      )
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
                Img:res.data.stationery.Img

            });
            console.log(this.state.stationery);
        }
        });
        
    }
    render() {
        return (
        
<div className="fd">

<div className="rh2"> 
      
        <button className="btn btn-primary"><Link to={"/"} style={{textDecoration:'none',color:'white'}}>Back to Stationery List</Link></button>&nbsp;&nbsp;
        <button className="btn btn-primary"><Link to={"/display"} style={{textDecoration:'none',color:'white'}}>Customer view</Link></button>&nbsp;&nbsp;
        <button className="btn btn-primary"><Link to={"/add"} style={{textDecoration:'none',color:'white'}}>Create New Stationery</Link></button>
        
        </div>  
<div className="fd4" >
            <h1 className="h3 mb-3 font-weight-normal">Edit Gallery</h1>
            <form className="needs-validation" noValidate onSubmit={this.onSubmit}>

 
  
        <img className="rd1p" src={`/uploads/${this.state.Img}`} alt="hi"/>
          
            

                

<div className="fd3">

                <div className="mb-3">
                        <div className="ki">
                            <center>
  
                            <div className="ki2p">                         
                            <div className="form-group">
                            <label htmlFor="file">choose image</label>
                            <input type="file" 
                             className="input"
                            filename="Img"
                            onChange={this.onFileChange}/>

<button className="btn btn-primary" type="submit" style={{marginTop:'10px'}} onClick={this.onSubmit}>
                  <i className="far fa-check-square"></i>
                  &nbsp;Update
                  </button>
                          </div>
                          </div>
                          </center>
                          </div>
                        
                        </div>



              </div>
                  
</form>
      
      </div>
      </div>
  
  )
        }
    }
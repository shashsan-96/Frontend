import React, { Component } from 'react'
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';


export default class Stationeryrepo extends Component {
    constructor(props){
        super(props);
    
        this.state={
          stationery:[]
        };
      }
    

      
    componentDidMount(){
      this.retrievestationerys();
    }
    

    printDocument() {  
      const input = document.getElementById('pdfdiv');  
      html2canvas(input)  
        .then((canvas) => {  
          var imgWidth = 200;  
          var pageHeight = 290;  
          var imgHeight = canvas.height * imgWidth / canvas.width;  
          var heightLeft = imgHeight;  
          const imgData = canvas.toDataURL('image/png');  
          const pdf = new jsPDF('p', 'mm', 'a4')  
          var position = 0;  
          var heightLeft = imgHeight;  
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
          pdf.save("download.pdf");  
        });  
    } 
      retrievestationerys(){
        axios.get("/stationery").then(res=>{
          if(res.data.success){
            this.setState({
              stationery:res.data.existingstationery
            });
            console.log(this.state.stationery)
          }
        });
      }
    
    
      
    
    filterdata(stationery,searchkey){
    
      const result = stationery.filter((stationery) =>
    
      stationery.StationeryId.toLowerCase().includes(searchkey) ||
      stationery.Title.toLowerCase().includes(searchkey)||
      stationery.Category.toLowerCase().includes(searchkey)
      )
    
      this.setState({stationery:result})
    }
    
      handleSearchArea = (e) =>{
        const searchkey=e.currentTarget.value;
        axios.get("/stationery").then(res=>{
          if(res.data.success){
    
            this.filterdata(res.data.existingstationery,searchkey)
          }
        });
      }
    
    
    render() {
        return (
          <div>
    
    <div className="rh1"> 
    <button className="btn btn-primary"><Link to={"/"} style={{textDecoration:'none',color:'white'}}>Back to stationery List</Link></button>&nbsp;
          <button className="btn btn-primary"><Link to={"/add"} style={{textDecoration:'none',color:'white'}}>Create new stationery</Link></button>&nbsp;
           <button className="btn btn-primary"><Link to={"/display"} style={{textDecoration:'none',color:'white'}}>Customer view</Link></button>&nbsp;
           <button className="btn btn-primary" onClick={this.printDocument} variant="contained" color="primary">Download Report PDF</button>
           &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-search" aria-hidden="true"></i>
          
          <input 
           
          type="search"
            placeholder="search stationerys here"
            name="searchQuery"
            onChange={this.handleSearchArea}>
    
            </input>
              </div>
         
          <div className ="container" style={{marginTop:"100px"}}>
          <h1>Current stationeries Report</h1>
            
            
            
            
            <table className="table" id="pdfdiv">
    
              <thead>
                <tr>
                <th scope ="col">#</th>
                 <th scope ="col">Stationery Id</th>
                 <th scope ="col">Title</th>
                 <th scope ="col">ISBN</th>
                 <th scope ="col">Category</th>
                 <th scope ="col">Price</th>
                 <th scope ="col">Description</th>
                
                    
     </tr>
              </thead>
               <tbody>
                 {this.state.stationery.map((stationery,index)=>(
    
                   <tr key ={index}>
                     <th scope="row">{index+1} </th>
                     <td>
                         {stationery.StationeryId}  
                      </td>
                     
                      <td>{stationery.Title}</td>
                 <td>{stationery.ISBN}</td>
                 <td>{stationery.Category}</td>
                 <td>LKR{stationery.Price}</td>
                 <td>{stationery.Description}</td>
                     <td>
                     
    
                     </td>
                     
    
    
    
    
    
                   </tr>
    
                 ))}
    
    
               </tbody>
    
    
            
                
            </table>
    
          
              </div>
              </div>
    
            
          
        )
      }
    }
    

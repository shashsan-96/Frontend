import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../StyleStationery.css';



export default class SHome extends Component {
  constructor(props){
    super(props);

    this.state={
      stationery:[]
    };
  }

componentDidMount(){
  this.retrievestationerys();
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


  onDelete = (id) =>{
    axios.delete(`/stationery/delete/${id}`).then((res)=>{
      alert("Delete stationery succesefully");
      this.retrievestationerys();
    })
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

  handleSearchArea = (e) =>{
    const searchkey =e.currentTarget.value;
    axios.get("/stationery").then(res=>{
      if(res.data.success){

        this.filterdata(res.data.existingstationery,searchkey)
      }
    });
  }

  filterdata1(stationery,cat){

    const result1 = stationery.filter((stationery) =>
    stationery.Category.includes(cat))

    this.setState({stationery:result1})
    
  }

  handleCategory =(e)=>{
    const cat = e.currentTarget.value;
    axios.get("/stationery").then(res=>{
      if(res.data.success){

        this.filterdata1(res.data.existingstationery,cat)
       
        
        
        console.log(this.state.stationery)
      }
    });

}

getallstationeries = (e)=>{
  axios.get("/stationery").then(res=>{
    if(res.data.success){
      this.setState({
        stationery:res.data.existingstationery
      });
      console.log(this.state.stationery)
    }
  });
}


render() {
    return (
      <div>

<div className="rh1"> 
      <button className="cusnavbtn2"><Link to={"/add"} style={{textDecoration:'none',color:'white'}}>Add stationery</Link></button>
       <button className="cusnavbtn2"><Link to={"/display"} style={{textDecoration:'none',color:'white'}}>Customer view</Link></button>
       <button className="cusnavbtn2"><Link to={"/report"} style={{textDecoration:'none',color:'white'}}>Generate Report</Link></button>
       <button value="all" className="cusnavbtn2" onClick={this.getallstationeries}>All</button>
       <button value="Drawing" onClick={this.handleCategory} className="cusnavbtn2">Drawing</button>
       <button value="Writing" onClick={this.handleCategory}className="cusnavbtn2">Writing</button>
       <button value="Working" onClick={this.handleCategory} className="cusnavbtn2">Work</button>
      <button value="Office" onClick={this.handleCategory} className="cusnavbtn2">Office</button>
       
    <i class="fa fa-search" aria-hidden="true"></i>
      
      <input 
       className="search"
      type="search"
        placeholder="search stationery here"
        name="searchQuery"
        onChange={this.handleSearchArea}>

        </input>
          </div>
     
      <div  style={{marginTop:"100px",marginLeft:"40px"}}>
      <h1>stationeries</h1>
        
        
        
        
        <table className="table">

          <thead>
            <tr>
                 <th scope ="col">#</th>
                 <th scope ="col">Id</th>
                 <th scope ="col">Title</th>
                 <th scope ="col">ISBN</th>
                 <th scope ="col">Category</th>
                 <th scope ="col">Price</th>
                 <th scope ="col">Description</th>
                 <th scope ="col">Action</th>
 </tr>
          </thead>
           <tbody>
             {this.state.stationery.map((stationery,index)=>(

               <tr key ={index}>
                 <th scope="row">{index+1} </th>
                 <td>
                     <a href={`/stationery/${stationery._id}`} style={{textDecoration:'none'}}>
                     {stationery.StationeryId}
                       </a>
                  </td>
                 
                 <td>{stationery.Title}</td>
                 <td>{stationery.ISBN}</td>
                 <td>{stationery.Category}</td>
                 <td>LKR{stationery.Price}</td>
                 <td>{stationery.Description}</td>
                
                
                  <td>
                  <a className ="btn btn-warning" href={`/edit/${stationery._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                    &nbsp;
                  <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(stationery._id)}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a>&nbsp;

                  <a className="btn btn-success" href={`/edit2/${stationery._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;photo
                  </a>
                

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

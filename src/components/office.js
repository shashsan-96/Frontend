import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import '../StyleStationery.css';
import { Link } from 'react-router-dom';
import axios from 'axios'








export default class office extends Component {

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
        const cat = "Office";
                axios.get("/stationery").then(res=>{
                  if(res.data.success){
            
                    this.filterdata1(res.data.existingstationery,cat)
                   
                    
                    
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
            
        <div className="cor3">
     
        <div className ="cat">

        </div>


        
<div>


<button className="cor2" value="drawing" ><Link to={"/drawing"} style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.055)'}}>Click here</Link></button>
 <button className="cat3" value= "Working"><Link to={"/working"} style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.055)'}}>Click here</Link></button>
</div>









<div className="container" >



            <div className="row" >
             {this.state.stationery.map((stationery,index)=>(

             


    
 <Card hoverable className ="crd"  style={{ width: '13rem'}}>
              <Card.Title className ="cardfont2">{stationery.Title}</Card.Title>
  <Card.Img  height ="150px" width ="400px" variant="top"  src= {`/uploads/${stationery.Img}`}  fluid/> 
  <Card.Body>
   
    <Card.Text className ="cardfont">
    LKR{stationery.Price}
    </Card.Text>  

    <a> <Link to={`/stationery/${stationery._id}`}> VIEW DETAILS  </Link></a>
  
        <button className="cartbtn" type="submit" style={{marginTop:'15px'}} >
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      &nbsp;ADD TO CART</button>
    
    </Card.Body>
  
    
</Card>
   



  
  
          
          ))}   
          
          </div>

</div>
   


        </div>
        





        
        
        
        
        
        
        
)}}
           
 
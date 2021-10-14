import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Carousel} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import '../app.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import col3 from'./../assets/images/col3.jpg';
import col1 from './../assets/images/col4.jpg';
import col2 from './../assets/images/col (2).jpg';
import '../StyleStationery.css';






export default class CusView extends Component {

    constructor(props){
        super(props);
    
        this.state={
          stationery:[]
        };
      }
    
    componentDidMount(){
      this.retrievestationery();
    }
    
      retrievestationery(){
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
     
        

<Carousel className="cor">
  <Carousel.Item interval={500}>
    <img
    
      className="d-block w-100"
      src={col3}
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Brought to you from the heart </h3>
      <p>Grab your favorite Stationery</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <img
    
      className="d-block w-100"
      src={col1}
      alt="Second slide"
    />
    <Carousel.Caption>
      <h3>Paint your life</h3>
      <p>Make your self branded with fine colours</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
        
      className="d-block w-100"
      src={col2}
      alt="Third slide"
    />
    <Carousel.Caption>
      <h3>Create Your life more creativve</h3>
      <p>stationeries on your finger tips </p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
        
<div>

<button className="cor2" value="drawing" ><Link to={"/drawing"} style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.055)'}}>Click here</Link></button>
 <button className="cor22" value= "writing"><Link to={"/writing"} style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.055)'}}>Click here</Link></button>
 
</div>

<div>

<Row className="cusrow">
    
    <Col className="cuscol1"></Col>
    <Col className="cuscol2"> </Col>
    <Col className="cuscol3"></Col>
    <Col className="cuscol4"></Col>
    <Col className="cuscol5"></Col>
    
  </Row>

  
</div>



<div  className="cusnav">
   
    <input type="search" placeholder="I am shopping for.." className="cusnavbtn" name="searchQuery" onChange={this.handleSearchArea}></input>
    <button value="all" onClick={this.getallstationeries} className="cusnavbtn">All items</button>
    <button value="Drawing" onClick={this.handleCategory} className="cusnavbtn">Drawing</button>
    <button value="Writing" onClick={this.handleCategory} className="cusnavbtn">Writing</button>
    <button value="Working" onClick={this.handleCategory} className="cusnavbtn">Work materials</button>
    <button value="Office"onClick={this.handleCategory} className="cusnavbtn">Office materials</button>
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
           
 
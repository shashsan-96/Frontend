import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';


import '../StyleStationery.css';




export default class StationeryDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            stationery:{},
            quantity: 1,
      show: true,
      max:5,
      min:0
        };

        }


        IncrementItem = () => {
            this.setState(prevState => {
              if(prevState.quantity < 10) {
                return {
                  quantity: prevState.quantity + 1
                }
              } else {
                return null;
              }
            });
        }
        DecreaseItem = () => {
          this.setState(prevState => {
            if(prevState.quantity > 0) {
              return {
                quantity: prevState.quantity - 1
              }
            } else {
              return null;
            }
          });
        }
        ToggleClick = () => {
          this.setState({
            show: !this.state.show
          });
        }
        handleChange = (event) => {
          this.setState({quantity: event.target.value});
        }
        
componentDidMount(){

    const id = this.props.match.params.id;
    axios.get(`/stationery/${id}`).then((res)=>{
        if(res.data.success){
        this.setState({
            stationery:res.data.stationery
        });
        console.log(this.state.stationery);
    }
    });
    
}

    
    render() {

        const {Title,ISBN,Category,Price,Description,Img} = this.state.stationery;
        
        return (
          <div className="rd5">
          <div>
      

        
        <div>
        <img className="rd1" src={`/uploads/${Img}`} alt="hi"/>
          </div>
  
       
  
  <div className="rd6">

        <dl className="row" style={{paddingLeft:"90px"}}>
       
                 <p className="font3">{Title}</p>
             <hr></hr>
                 <dd className="cardfont">LKR{Price}</dd>
                <hr></hr>
                 <p className ="cardfont3">More information</p>

                 
                  <dt className="col-sm-3">ISBN</dt>
                  <dd className="col-sm-9">{ISBN}</dd>
  
                   <dt className="col-sm-3">Description</dt>
                  <dd className="col-sm-9">{Description}</dd><br/><br/>

               
                  <div>

                 
<hr></hr>
                  <p className="cardfont3">Quantity</p>
      <button className="indecbtn"  onClick={this.IncrementItem}>+</button>
      <input className="inputne" value={this.state.quantity} onChange={this.handleChange}/>
      <button className="indecbtn"   onClick = {this.DecreaseItem}>-</button> <br/><br/>
    
  
       <div>
      
      <button type="button" className="btn btn-primary" className="addcartbtn">ADD TO CART</button>
      <div className="fb1"></div>
      </div>
      
      </div>
  
       </dl>
     
        </div>
        <div className="fb"></div>
      
        <button className="fb3" value="drawing" ><Link to={"/drawing"} style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.055)'}}>Click here</Link></button>
 <button className="fb4" value= "writing"><Link to={"/writing"} style={{textDecoration:'none',color:'rgba(255, 255, 255, 0.055)'}}>Click here</Link></button>
        


     
           
         
         
              </div>
              <div className="fb5"></div>
              <div className="fb6"></div>
              <div className="fb7"></div>
              </div>
           
      
       
        
      

      

     
      
      
  
  


    
        )       
        
    }
}


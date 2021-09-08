import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h1 style={{fontFamily: "sans-serif", color: "black"}}>{product.name}</h1>
        </Link>
        {/* <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating> */}
        <div className="price" style={{fontSize: "16px", color: "crimson"}}>LKR {product.price}</div>
      </div>
      <a  style={{color: "black"}} href={`/product/${product._id}`}>
        <button style={{width: "100%", backgroundColor: "#4d94ff"}}><i class="fa fa-shopping-cart" style={{"fontSize": "30px"}}></i> <b>&nbsp; Add to cart</b></button>
      
      </a>
    </div>
  );
}
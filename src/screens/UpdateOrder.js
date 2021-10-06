import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder , updateShipping} from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
  ORDER_UPDATE_SHIPPING_RESET
} from '../constants/orderConstants';

export default function UpdateOrder(props) {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhoneTwo] = useState('');

  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  

  // const orderPay = useSelector((state) => state.orderPay);
  // const {
  //   loading: loadingPay,
  //   error: errorPay,
  //   success: successPay,
  // } = orderPay;
  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const {
  //   loading: loadingDeliver,
  //   error: errorDeliver,
  //   success: successDeliver,
  // } = orderDeliver;

  // const OrderupdateShipping = useSelector((state) => state.OrderupdateShipping);

  // const {
  //   success: successUpdate,
  //   error: errorUpdate,
  //   loading: loadingUpdate,
  // } = OrderupdateShipping;

  const dispatch = useDispatch();
  useEffect(() => {
    if(!order || order._id !== orderId) {
      dispatch({ type: ORDER_UPDATE_SHIPPING_RESET });
      dispatch(detailsOrder(orderId));
    }else{
      setFullName(order.shippingAddress.fullName);
      setAddress(order.shippingAddress.address);
      setCity(order.shippingAddress.city);
      setPostalCode(order.shippingAddress.postalCode);
      setPhone(order.shippingAddress.phone);
      setPhoneTwo(order.shippingAddress.phone2);
    }
  }, [dispatch, orderId, order]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update order
        if(Date.now() > order.createdAt) {
          alert("Exceed 24 hours");
        }
        else {
          dispatch(updateShipping({ orderId: order._id, fullName, address, city, postalCode, phone, phone2}));
          alert("Your shipping details of the order was updated successfully");
          props.history.push('/orderhistory');

        }
    
  };
  
    return (
      
      <div>
            <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 style={{fontSize: "25px"}}>Update Shipping Details</h1>
        </div>
        {/* {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Shipping details Updated Successfully
              </MessageBox>
            )} */}

        {/* input field for getting full name */}      
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>

        {/* input field for getting address */}
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>

        {/* input field for getting city name */}
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>

        {/* input field for getting postal code */}
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            maxLength="5"
            pattern = "[0-9]{5}"
            required
          ></input>
        </div>

        {/* input field for getting phone number 1 */}
        <div>
          <label htmlFor="phone">Phone Number 1</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0][0-9]{9}"
            maxLength="10"
            required
          ></input>
        </div>

        {/* input field for getting phone number 2 */}
        <div>
          <label htmlFor="phone2">Phone Number 2</label>
          <input
            type="text"
            id="phone2"
            value={phone2}
            onChange={(e) => setPhoneTwo(e.target.value)}
            pattern="[0][0-9]{9}"
            maxLength="10"
            required
          ></input>
        </div>
        <div>
          {/* button for reset */}
          <input type="reset" value="Reset" style={{width: "45%", backgroundColor: "#4d94ff"}} />
          <label />

          {/* button for submit details */}
          <button className="primary" type="submit" style={{width: "45%", marginLeft: "8.5cm", marginTop: "-1.5cm", backgroundColor: "#4d94ff"}}>
            Update Order
          </button>
        </div>
        {/* </>
        )} */}
      </form>
            
      </div>
    );
}


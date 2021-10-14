import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps.js';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [phone2, setPhoneTwo] = useState(shippingAddress.phone2);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, phone, phone2 })
    );
    props.history.push('/payment');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Details</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            maxLength="5"
            pattern = "[0-9]{5}"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            value= "Sri Lanka"
            readOnly
            required
          ></input>
        </div>
        
        <div>
          <p style={{fontSize: "13px"}}>Enter two phone numbers in 0XXXXXXXXX format</p>
          <label htmlFor="phone">Phone Number 1</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="[0][0-9]{9}"
            maxLength="10"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phone">Phone Number 2</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            value={phone2}
            onChange={(e) => setPhoneTwo(e.target.value)}
            pattern="[0][0-9]{9}"
            maxLength="10"
            required
          ></input>
        </div>
        <br/>
        <div>
          <input type="reset" value="Reset" style={{width: "45%", backgroundColor: "#4d94ff"}} />
          <label />
          <button className="primary" type="submit" style={{backgroundColor: "#4d94ff", width: "45%", marginLeft: "8.5cm", marginTop: "-1.6cm"}}>
            Continue
          </button>
        </div>
      
      </form>
    </div>
  );
}
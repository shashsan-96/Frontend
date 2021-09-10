import React from 'react'

export default function UpdateOrder() {
    return (
        <div>
            <form className="form">
        <div>
          <h1>Edit Shipping Details</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            required
          ></input>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            placeholder="Enter Phone Number"
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" style={{backgroundColor: "#4d94ff"}}>
            Continue
          </button>
        </div>
      </form>
            
        </div>
    )
}

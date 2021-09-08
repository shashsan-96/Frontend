import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import axios from 'axios';

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  function filterData(Orders, searchKey){
    const result = Orders.filter((order)=>
    order.user.name.toLowerCase().includes(searchKey
    ) || 
    order.user.name.toUpperCase().includes(searchKey)||
    order.createdAt.includes(searchKey)
    )
    this.setState({ orderList:result })
}

    const handleSearchArea = (e)=>{
      const searchKey = e.currentTarget.value;
      axios.get('/api/orders').then(res=>{
          filterData(res.data, searchKey)
      })
    }



  return (
    <div>
      {/* Button for Report generating UI */}
      <button type="button" style={{"marginTop": "0.3cm", backgroundColor: "#3385ff", color: "white"}} onClick={() => {props.history.push('/OrderListPdf');}}><i className="fa fa-file" style={{"fontSize": "25px", color:"white"}}></i>&nbsp; Generate Report</button>

      <div style={{marginTop: "-1cm"}}><input className="form-control" type="search" placeholder="Search.." onclick={handleSearchArea} name="searchQuery" style={{width:"7cm", marginLeft:"32cm"}}/></div>
      <h1 style={{marginLeft: "19cm", fontSize: "28px", fontFamily: "Helvetica"}}>Order List</h1>
      
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table" id="pdfdiv">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAY_METHOD</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  ><i class="fa fa-info-circle" style={{fontSize: "18px"}}></i>
                    &nbsp; Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    <i class="fa fa-trash" style={{fontSize: "18px"}}></i>
                    &nbsp; Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
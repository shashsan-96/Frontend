import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//import axios from 'axios';

export default function OrderListPdf(props) {
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

  function printDocument() {  
    const input = document.getElementById('pdfdiv');  
    html2canvas(input)  
      .then((canvas) => {  
        var imgWidth = 200;  
        var pageHeight = 290;  
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
        const imgData = canvas.toDataURL('image/png');  
        const pdf = new jsPDF('p', 'mm', 'a4')  
        var position = 5;  
        var heightLeft = imgHeight;  
        pdf.addImage(imgData, 'JPEG', 5, position, imgWidth, imgHeight);  
        pdf.save("download.pdf");  
      });  
  }  
//   function filterData(Orders, searchKey){
//     const result = Orders.filter((food)=>
//     orders.user.name.toLowerCase().includes(searchKey
//     ) || 
//     orders.createdAt.toLowerCase().includes(searchKey) ||
//     orders.order._id.toLowerCase().includes(searchKey);
//     setState({ orders:result })
// }

// const handleSearchArea = (e)=>{
//     const searchKey = e.currentTarget.value;
//     axios.get('/api/orders').then(res=>{
//         filterData(res.data, searchKey)
//     })
// }

  return (
    <div>
      <button onClick={printDocument} style={{"marginTop": "0.3cm", backgroundColor: "#3385ff", color: "white"}}><i class="fa fa-download" style={{"fontSize": "25px", color:"white"}}></i>&nbsp; Download Report</button>
      <div style={{marginTop: "-1cm"}}><input className="form-control" type="search" placeholder="Search.." name="searchQuery" style={{width:"7cm", marginLeft:"32cm"}}/></div>
      
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table" id="pdfdiv">
            <caption style={{fontSize: "25px"}}><b>Order List</b></caption>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
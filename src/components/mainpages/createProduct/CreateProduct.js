import React, { useState, useContext,useEffect } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

//create report of the books
export default function Report() {

        const [allProductSummary, setallProductSummary] = useState([]);
  
        //This useEffect function used to get all user's data
        useEffect(() => {
            async function getDetails() {
                try {
                    const result = await (await axios.get("http://localhost:5000/report")).data.data
                    console.log(result)
                    setallProductSummary(result);
                } catch (err) {
                    console.log(err.message)
                }
            }
        
            getDetails();
        },[])

        //print pdf document
        const printDocument =() =>  {  
            const input = document.getElementById('viewtable');  
            html2canvas(input)  
            .then((canvas) => {  
                var imgWidth = 200;  
                var pageHeight = 290;  
                var imgHeight = canvas.height * imgWidth / canvas.width;  
                var heightLeft = imgHeight;  
                const imgData = canvas.toDataURL('image/png');  
                const pdf = new jsPDF('p', 'mm', 'a4')  
                var position = 0;  
                var heightLeft = imgHeight;  
                pdf.addImage(imgData, 'JPEG', 4, position, imgWidth, imgHeight);  
                pdf.save("Summary_Report.pdf");  
            });  
        }

        return (
            <div className="content" style={{marginTop:"2%"}}>
           
           <button onClick={printDocument} id = "button1" ><i className="fa fa-download"></i>&nbsp; Generate PDF</button>
          
            <div id="viewtable">
                <h2  style={{'textAlign':'center'}}>
                    BOOK DETAILS</h2>
                <table id = "table1"  style={{marginTop:"3%"}}>
                    <thead>
                        <tr>
                            <th style={{'textAlign':'center'}}>Book Id</th>
                            <th style={{'textAlign':'center'}}>Title</th>
                            <th style={{'textAlign':'center'}}>Author</th>
                            <th style={{'textAlign':'center'}}>Language</th>
                            <th style={{'textAlign':'center'}}>Category</th>
                            <th style={{'textAlign':'center'}}>Price</th>
                            <th style={{'textAlign':'center'}}>ISBN</th>
                            <th style={{'textAlign':'center'}}>Publihser</th>
                            <th style={{'textAlign':'center'}}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProductSummary.map((product)=>{
                            return <tr>
                            <td>{product.product_id}</td>
                            <td>{product.title}</td>
                            <td>{product.author}</td>
                            <td>{product.language}</td>
                            <td>{product.category.name}</td>
                            <td>{product.price} </td>
                            <td>{product.isbn} </td>
                            <td>{product.publisher} </td> 
                            <td>{product.description} </td>
                            </tr>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </div>
        )
    }

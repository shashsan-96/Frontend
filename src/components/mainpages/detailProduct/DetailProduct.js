import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'


function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2><br></br><br></br>
                    </div>
                    <span style={{color:"crimson", fontWeight:"bold"}}> LKR {detailProduct.price}</span><br></br><br></br>
                    <h4>More Information</h4>
                    <p><b>Language :</b> &nbsp; {detailProduct.language}</p>
                    <p><b>Author :</b>  &nbsp; {detailProduct.author}</p>
                    <p><b>Publisher : </b> &nbsp; {detailProduct.publisher}</p>
                    <p><b>Description :</b> <br/>{detailProduct.description}</p>
                </div>
            </div>
            <div id="related_products">
                <h2 style={{marginLeft:"55px"}}>Related products</h2>
                <div className="products" style={{marginLeft:"50px"}}>
                    {
                        products.map(product => {
                            return product.category === detailProduct.category 
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>
            </div>
            <div id="detail-addtocart">
                    <p>Price</p> 
                    <p id="price">LKR {detailProduct.price}</p>
                    <p>Status</p>
                    <p id="instock">In Stock</p>
                    <p>Qty</p>
                    <div id="Qty-select">
                        <select>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div><br></br>
                    <button id="addtocart" type="submit"><i class="fa fa-shopping-cart" style={{"fontSize": "30px"}}></i> &nbsp;Add to cart</button>
                </div>
        </>
    )
}

export default DetailProduct

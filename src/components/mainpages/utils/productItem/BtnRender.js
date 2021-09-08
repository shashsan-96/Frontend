import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buyc" to="#!" onClick={() => addCart(product)}>
                    <i class="fa fa-shopping-cart" style={{"fontSize": "30px"}}></i> &nbsp;Add to cart
                    </Link>
                    <Link id="btn_viewc" to={`/detail/${product._id}`}>
                        <u>View</u>
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender

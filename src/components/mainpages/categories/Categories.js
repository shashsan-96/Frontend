import React, {useState, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Categories() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.categoriesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                const res = await axios.put(`/api/category/${id}`, {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }else{
                const res = await axios.post('/api/category', {name: category}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg)
            }
            setOnEdit(false)
            setCategory('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editCategory = async (id, name) =>{
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async id =>{
        try {
            const res = await axios.delete(`/api/category/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="categories">
            <form id="form" onSubmit={createCategory}>
                <h1>Book Categories</h1>
                <input id="input" type="text" name="category" placeholder="Enter new category" value={category} required
                onChange={e => setCategory(e.target.value)} />

                <div id="creatediv"><button id="create_btn" type="submit">&nbsp;&nbsp;{onEdit? "Update" : "Create New Book Category"}&nbsp;</button></div>
            </form><br></br>

            <div className="col">
                {
                    categories.map(category => (
                        <div id="row" key={category._id}>
                            <p>&nbsp;{category.name}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <div>
                                <button id="edit_btn" onClick={() => editCategory(category._id, category.name)}><i className="fa fa-edit" style={{fontSize:"18px", color:"white"}}></i></button>
                                <button id="delete_btn" onClick={() => deleteCategory(category._id)}><i className="fa fa-trash" style={{fontSize:"18px", color:"white"}}></i></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories

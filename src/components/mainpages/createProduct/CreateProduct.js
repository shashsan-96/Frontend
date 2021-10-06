import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {
    product_id: '',
    title: '',
    author: '',
    language: '',
    category: '',
    price: 0,
    isbn: 0,
    publisher: '',
    description: '',
    _id: ''
}

//create product(book)
function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])

    //upload image
    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    //delete book product
    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/products/${product._id}`, {...product, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/book")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_product">
            <div  id="title"><h1 > CREATE NEW BOOK</h1></div>
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

           {/*  create (book) product form */}
            <form onSubmit={handleSubmit}>

               {/*  (book) prduct id */}
                <div className="row">
                    <label htmlFor="product_id">Book ID </label>
                    <input type="text" name="product_id" id="product_id" placeholder="EXX000000" maxLength="9" 
                    pattern="[A-Za-z]{3}[0-9]{6}" title="Three letters with six numbers" required
                    value={product.product_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

               {/*  book title */}
                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="titlen" placeholder="please enter book title" title="Book title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>
               
              {/*  author of the book */}
                <div className="row">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" placeholder="please enter author name" title="Author of the book" required
                    value={product.author} onChange={handleChangeInput} />
                </div>

               {/*  language of the book */}
                <div className="row">
                    <label htmlFor="language">Language</label>
                    <select name="language" value={product.language} onChange={handleChangeInput} required>
                        <option value="">Please select the language</option>
                        <option value="sinhala">Sinhala</option>
                        <option value="english">English</option>
                        <option value="tamil">Tamil</option>
                    </select>
                </div>

            {/*category of the book */}
                <div className="row">
                    <label htmlFor="categories">Category: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} required>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* price of the book */}
                <div className="row">
                    <label htmlFor="isbn">Price (LKR)</label>
                    <input type="number" name="price" id="pricenew" min="0" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                {/* isbn of the book */}
                <div className="row">
                    <label htmlFor="isbn">ISBN</label>
                    <input type="text" name="isbn" id="isbn" placeholder="XXXXXXXXXXXXX" title="Enter ISBN 13" maxLength="13" min="1" required
                    value={product.isbn} onChange={handleChangeInput} />
                </div>

                {/* publisher of the book */}
                <div className="row">
                    <label htmlFor="publisher">Publisher</label>
                    <input type="text" name="publisher" id="publisher" placeholder="please enter publisher name" required
                    value={product.publisher} onChange={handleChangeInput} />
                </div>

               {/* description of the book */}
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required placeholder="please enter product description"
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                {/* reset and submit button */}
                <button type="reset">{onEdit? "Reset" : "Reset"}</button>
                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct

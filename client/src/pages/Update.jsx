import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Update() {
    const location = useLocation()
    const baseURL = "http://localhost:3307"
    const navigate = useNavigate()
    const [err, setErr] = useState(null)
    const [updateBook, setupdateBook] = useState(location.state)

    console.log(updateBook);
    const handleChange = (e) => {
        setupdateBook(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }

    const handleClick = (e) => {
        e.preventDefault()
        axios
            .put(`${baseURL}/books/${updateBook.id}`, updateBook)
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                setErr(err)
            })
    }

    return (
        <div className="add-form">
            <h1>Update Book</h1>
            <input type="text" name="title" placeholder='Title' onChange={handleChange} value={updateBook.title} />
            <input type="text" name="descrp" placeholder='Description' onChange={handleChange} value={updateBook.descrp} />
            <input type="number" name="price" placeholder='Price' onChange={handleChange} value={updateBook.price} />
            <input type="text" name="cover" placeholder='Cover' onChange={handleChange} value={updateBook.cover} />
            <button className='update-book-button' onClick={handleClick}>Update</button>
            {err && <h2> {err} </h2>}
        </div>
    )
}

export default Update
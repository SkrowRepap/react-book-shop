import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Add() {
    const baseURL = "http://localhost:3307"
    const navigate = useNavigate()
    const [err, setErr] = useState(null)
    const [newBook, setNewBook] = useState({
        title: "",
        descrp: "",
        cover: "",
        price: 0,

    })

    const handleChange = (e) => {
        setNewBook(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }

    const handleClick = (e) => {
        axios
            .post(`${baseURL}/books`, newBook)
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                setErr(err)
            })
    }

    return (
        <div className="add-form">
            <h1>Add new Book</h1>
            <input type="text" name="title" placeholder='Title' onChange={handleChange} />
            <input type="text" name="descrp" placeholder='Description' onChange={handleChange} />
            <input type="number" name="price" placeholder='Price' onChange={handleChange} />
            <input type="text" name="cover" placeholder='Cover' onChange={handleChange} />
            <button onClick={handleClick}>Submit</button>
            {err && <h2> {err} </h2>}
        </div>
    )
}

export default Add
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteModal from '../components/DeleteModal'


function Books() {
  const [books, setBooks] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [bookID, setBookID] = useState(null)
  const [bookTitle, setBookTitle] = useState("")

  const baseURL = "http://localhost:3307"
  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  })

  useEffect(() => {
    const unsub = async () => {
      const res = await axios.get(`${baseURL}/books`)
      setBooks(res.data)
    }

    unsub()
  }, [])

  const handleDelete = (id, title) => {
    setModalShow(true)
    setBookID(id)
    setBookTitle(title)

  }

  return (
    <div className='books-container'>
      <h1>Christian's Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <img src={book.cover} alt="" />
            <h2>{book.title.toUpperCase()}</h2>
            <p>{book.descrp}</p>
            {book.price != 0 ?
              <span>{formatter.format(book.price)}</span> :
              <span>FREE</span>
            }

            <div className='buttons'>
              <Link to={`/update/${book.id}`} state={{ ...book }}>
                <button className="update">Update</button>
              </Link>
              <button className="delete" onClick={() => handleDelete(book.id, book.title)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <Link to={'add'}>
        <button className='add-book'>
          Add new book
        </button>
      </Link>
      <DeleteModal show={modalShow} onHide={() => setModalShow(false)} id={bookID} title={bookTitle} />
    </div>
  )
}

export default Books
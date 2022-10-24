import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Add from './pages/Add';
import Books from './pages/Books';
import Home from './pages/Home';
import Update from './pages/Update';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

function App() {
  return (
    <Router>
      <Routes>

        <Route index element={<Books />} />
        <Route path='/add' element={<Add />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>

    </Router>
  )
}

export default App


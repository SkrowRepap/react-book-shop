
const mysql = require('mysql2')

const express = require("express")

var cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cjay09322926010!",
    database: "react-book"
})

app.get("/", (req, resp) => {
    resp.json(
        "Hello world!"
    )
})

app.get("/books", (req, res) => {
    const q = "SELECT * FROM `react-book`.books;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {

    const q = "INSERT INTO `react-book`.`books` (`title`, `descrp`, `cover`, `price`) VALUES (?);"

    const values = [
        req.body.title,
        req.body.descrp,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        console.log("Succesfully inserted");
        return res.json(`Succesfully inserted: ${req.body.title}`)
    })
})

app.delete("/books/:id", (req, res) => {
    const id = req.params.id
    const q = 'DELETE FROM `react-book`.`books` WHERE (`id` = ?)'

    db.query(q, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json("Succesfully deleted book number " + id)
    })
})

app.put("/books/:id", (req, res) => {
    const id = req.params.id
    const q = "UPDATE `react-book`.`books` SET `title` = ?, `descrp` = ?, `cover` = ?, `price` = ? WHERE (`id` = ?);"

    const values = [
        req.body.title,
        req.body.descrp,
        req.body.cover,
        req.body.price,
    ]

    db.query(q, [...values, id], (err, data) => {
        if (err) return res.json(err)
        return res.json(`Succesfully updated`)
    })
})

app.listen(3307, () => {
    console.log("Connected");
})


import express from "express"
import mysql from "mysql"
import dotenv from 'dotenv'
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME; 

const app = express()
const db = mysql.createConnection({
    host:       DB_HOST,
    user:       DB_USER,
    password:   DB_PASS,
    database:   DB_NAME
})

app.get("/", (req, res)=>{
    res.json("hello, this is the backend.")
})

app.get("/PERSON", (req, res)=>{
    const q = "SELECT * FROM PERSON"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

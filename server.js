// const express = require('express')
// const firebase = require('firebase')

import express from 'express'
import cors from 'cors'
// import firebase from 'firebase'
// import { db }  from './firebase.js'

const app = express()

const corsOptions = {
    origin: [
        'http://localhost:9528',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json
// app.use(express.static('./dist')) // 靜態檔案

const port = 3000

app.post('/api/auth/login', function (req, res) {
    console.log(req.body)
    if(req.body.username == 'admin') {
        res.json({ code: 20000, data: {token: "admin-token"}}) 
    } else {
        res.json({ code: 20000, data: {token: "editor-token"}}) 
    }
})
app.listen(port, () => {
    console.log(`listening on ${ port }`)
})

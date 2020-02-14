// const express = require('express')
// const firebase = require('firebase')

import express from 'express'
import cors from 'cors'
import firebase from 'firebase'
import { db }  from './firebase.js'

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
    let username = req.body['username']
    let password = req.body['password'] 

    console.log(req.body)

    let data = []

    db.collection('users')
    .where('username', '==', username)
    .get().then(snapshot => {
        data = snapshot.docs.map(doc => doc.data())
        if(data.length <= 0) {
            res.json({ code: 50000, data: 'usernameNotExist'})
        } else {
            db.collection('users')
            .where('username', '==', username)
            .where('password', '==', password)
            .get().then(snapshot => {
                data = snapshot.docs.map(doc => doc.data())
                if(data.length <= 0) {
                    res.json({ code: 50000, data: 'passwordNotMatch'})
                } else {
                    let isAdmin = data[0].roles.find(item => item == 'admin')

                    console.log('isAdmin', isAdmin)

                    if(isAdmin) {
                        console.log('admin')
                        res.json({ code: 20000, data: {token: "admin-token"}})
                    } else {
                        console.log('editor')
                        res.json({ code: 20000, data: {token: "editor-token"}}) 
                    }
                }
            })
        }
    }).catch(error => {
        res.json({ code: 50000, data: 'otherError'})
        console.log(error)
    })
})




app.post('/api/auth/user/info', function (req, res) {
    let username = req.body['username']

    console.log(req.body)

    let data = []

    db.collection('users')
    .where('username', '==', username)
    .get().then(snapshot => {
        data = snapshot.docs.map(doc => doc.data())[0]

        delete data['password']
        // delete data['username']

        console.log('user data', data)

        if(data.length <= 0) {
            res.json({ code: 50000, data: 'usernameNotExist'})
        } else {
            res.json({ code: 20000, data: data})
        }
    }).catch(error => {
        res.json({ code: 50000, data: 'otherError'})
        console.log(error)
    })
})

app.listen(port, () => {
    console.log(`listening on ${ port }`)
})

const express = require("express");
const data = express.Router();
let user = require("./user.json");
const port = 3000;
const fs = require("fs");

data.use(express.json())

// console.log(user)
data.get('/user', (req, res)=>{
    res.status(200).json(user) 
})

data.get('/user', (req, res)=>{
    const post = user.find(i => i.id === +req.params.id)
    res.status(200).json(user) 
})

data.post('/user', (req, res)=>{
    const{email, pass} = req.body
    const id = user[user.length - 1].id + 1
    const post = {
        id, email, pass
    }
    user.push(post)
    res.status(201).json(post)
})

data.put('/user/:id', (req,res)=>{
    let post = user.find(i => i.id === +req.params.id)
    const params = {email: req.body.email, pass: req.body.pass}
    post = {...post, ...params}
    user = user.map(i=> i.id === post.id ? post : i)
    res.status(200).json(post)
})

data.delete('/user/:id', (req,res)=>{
    user = user.filter(i=>i.id != +req.params.id )
    res.status(200).json({
        msg: `delete id ${req.params.id}`
    })
})

module.exports = data;

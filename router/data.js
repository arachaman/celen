const express = require("express");
const data = express.Router();
let user = require("./user.json");
const port = 3000;
const fs = require("fs");

// data.use(express.json()); ////middleware
// /// get all
// data.get("/user", (req, res) => {
//   console.log(user);
//   res.status(200).json(user);
//   console.log(req.body)
// });

// ///create
// data.post("/user", (req, res) => {
//   let post = {
//     id: user[user.length - 1].id + 1,
//     email: req.body.title,
//     pass: req.body.body,
//   };
//   user.push(post);
//   res.status(201).json(user);
// });

// ///get  by id
// data.get("/user/detail/:id", (req, res) => {
//   let { id } = req.params;
//   let post = user.find((e) => e.id == id);
//   res.status(200).json(post);
// });

// ///update
// data.put("/user/update/:id", (req, res) => {
//   let { id } = req.params;
//   let { email, pass } = req.body;
//   let post = user.find((e) => e.id == id);
//   post = { ...post, title, body };
//   user = user.map((e) => (e.id == id ? post : e));
//   res.status(200).json({ msg: "Data berhasil diubah", data: post });
// });

// ///delete
// data.delete("/user/delete/:id", (req, res) => {
//   let { id } = req.params;
//   user = user.filter((e) => e.id != id);
//   res.status(200).json({ msg: "Data berhasil dihapus", data: id });
// });

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

const express = require("express");
const ejs = require("ejs");
const app = express();
const fs = require('fs')
const port = 3000;
let data = require('./router/data')
let user = require('./router/user.json')
const {
  user_game,
  user_game_biodata
} = require('./models');
const {
  response
} = require("express");



app.use(express.json())
app.use(express.urlencoded({
  extended: false
}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/views"));

//buat middleware
function logger(req, res, next) {
  console.log(`method: ${req.method}, url: ${req.url}`);
  next();
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.post('/signin', (req, res) => {
  const {
    username,
    password
  } = req.body;
  user_game.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(response => {
    if (response != null && response.isSuperAdmin == true) {
      res.redirect('dashboard')
    } else {
      res.redirect('signin')
    }
  })
});

app.get('/dashboard', (req, res) => {
  user_game.findAll({
      include: user_game_biodata
    })
    .then(user => {
      res.render('dashboard', {
        user
      })
      // res.json(user)
    })
})

app.post('/user', (req, res) => {
  const {
    username,
    password,
    firstName,
    lastName,
    birthPlace
  } = req.body
  user_game.update({
    username,
    password,
    isSuperAdmin: false
  }).then(user_game => {
    user_game_biodata.update({
      id_user: user_game.id,
      firstName,
      lastName,
      birthPlace
    }).then(response => {
      res.redirect('/dashboard')
    })
  })
})

app.get('/user/:id/delete',(req,res)=>{
  const {id} =req.params
  user_game.destroy({
    where: {id}
  }).then(response =>{
    res.redirect('/dashboard')
  })
})

app.get('/user/:id/update', (req,res) =>{
  const {id} = req.params
  user_game.findOne({
    where: {id},
    include: user_game_biodata
  }).then(response =>{
    res.render('update', {user})
  })
})

app.listen(port, () => {
  console.log(`SERVER PORT ${port}`);
});






// app.get("/rps", (req, res) => {
//   res.render("rps");
// });

// app.use('/api', data)


// app.use(logger)
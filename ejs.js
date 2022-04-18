const express = require("express");
const ejs = require("ejs");
const app = express();
const fs = require('fs')
const port = 3000;
let data = require('./router/data')
let user = require('./router/user.json')



app.use(express.json())
app.use(express.urlencoded({ extended: false }));

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

app.post('/signin', (req,res)=>{
  const { email, pass } = req.body;
  user.push({ email, pass });
  fs.writeFile("./router/user.json", JSON.stringify(user), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync("./router/user.json", "utf8"));
    }
  });
  res.redirect('/')
})

app.get("/rps", (req, res) => {
    res.render("rps");
  });

app.use('/api', data)

app.listen(port, () => {
  console.log(`SERVER PORT ${port}`);
});

app.use(logger)

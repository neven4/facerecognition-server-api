const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: "123",
      name: "Jona",
      email: "jona@gmail.com",
      password: "cookies",
      enters: 0,
      join: new Date()
    },
    {
      id: "124",
      name: "Colla",
      email: "Colla@gmail.com",
      password: "cooki",
      enters: 0,
      join: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send("its working!");
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.json("error");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submition");
  }
  database.users.push({
    id: "125",
    name: name,
    email: email,
    enters: 0,
    join: new Date()
  });
  res.json(database.users[database.users.length - 1]);
});

app.post("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.enters++;
      return res.json(user.enters);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}!`);
});

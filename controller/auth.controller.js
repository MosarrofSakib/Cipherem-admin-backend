const mydb = require("../Utils/db.utils");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const secret = process.env.JWT_SECRET;
//console.log(process.env.JWT_SECRET);

const createAdmin = (req, res) => {
  // Save User to Database

  var name = req.body.name;
  var email = req.body.email;
  var password = password;
  console.log("requested to this url");

  var con = mydb();
  con.connect(function (err) {
    if (err) throw err;

    con.query(
      "SELECT * FROM `admin` WHERE `email` = '" + email + "'",
      (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
          res.status(400).send({
            message: "Message user already exist!",
          });
        } else {
          bcrypt.hash(req.body.password, 10).then((pass) => {
            con.query(
              "INSERT INTO `admin`(`name`, `email`, `password`) VALUES ('" +
                name +
                "', '" +
                email +
                "', '" +
                pass +
                "')",
              (errr, results) => {
                if (errr) throw errr;

                res.status(200).send({
                  message: "Admin created successfully!",
                  name: name,
                  email: email,
                  id: result["insertId"],
                });
              }
            );
          });
        }
      }
    );
  });
};

const login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var con = mydb();
  con.connect((err) => {
    if (err) throw err;

    con.query(
      "SELECT * FROM `admin` WHERE `email` = '" + email + "'",
      (error, result) => {
        if (err) throw err;

        if (result.length < 1) {
          res.status(404).send({
            message: "User not found!",
          });
        }

        bcrypt.compare(password, result[0]["password"]).then((pass) => {
          if (pass) {
            var token = jwt.sign({ id: result[0].id }, secret, {
              expiresIn: 86400, // 24 hours
            });

            res.status(200).send({
              message: "Login succeeed!",
              id: result[0].id,
              username: result[0].username,
              email: result[0].email,
              token: token,
            });
          } else {
            res.status(404).send({
              message: "Invalid Password!",
            });
          }
        });
      }
    );
  });
};

module.exports = { login, createAdmin };

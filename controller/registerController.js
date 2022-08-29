const mydb = require("../Utils/db.utils");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, 10).then(function (v) {
    var con = mydb();

    con.connect(function (err) {
      if (err) throw err;

      con.query(
        "SELECT * FROM `user` WHERE `email` = '" + email + "'",
        function (err, result, fields) {
          if (err) throw err;

          if (result.length > 0) {
            res.json({
              status: 0,
            });
            return 0;
          } else {
            con.query(
              "INSERT INTO `user`(`name`, `email`, `password`) VALUES ('" +
                name +
                "', '" +
                email +
                "', '" +
                v +
                "')",
              function (err, result, fields) {
                if (err) throw err;

                res.json({
                  status: 1,
                  name: name,
                  email: email,
                  id: result["insertId"],
                });
              }
            );
          }
        }
      );
    });
  });
};

const registerSocial = (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var img = req.body.img;

  var con = mydb();

  con.connect(function (err) {
    if (err) throw err;

    con.query(
      "SELECT * FROM `user` WHERE `email` = '" + email + "'",
      function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          res.json({
            status: 0,
          });
          return 0;
        } else {
          con.query(
            "INSERT INTO `user`(`name`, `email`, `image`) VALUES ('" +
              name +
              "', '" +
              email +
              "', '" +
              img +
              "')",
            function (err, result, fields) {
              if (err) throw err;

              res.json({
                status: 1,
                name: name,
                email: email,
                id: result["insertId"],
              });
            }
          );
        }
      }
    );
  });
};

module.exports = { register, registerSocial };

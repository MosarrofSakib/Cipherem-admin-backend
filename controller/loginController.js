const bcrypt = require("bcrypt");
const mydb = require("../Utils/db.utils");

const login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var con = mydb();

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM `user` WHERE `email` = '" + email + "'",
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        if (result.length < 1) {
          res.json({
            status: 0,
          });
          return 0;
        }

        bcrypt.compare(password, result[0]["password"]).then(function (v) {
          if (v) {
            if (result[0]["status"] != "1") {
              res.json({
                status: 1,
                data: result[0],
              });
            } else {
              res.json({
                status: 2,
                data: result[0],
              });
            }

            return 0;
          } else {
            res.json({
              status: 0,
            });
            return 0;
          }
        });

        // res.json(result);
      }
    );
  });
};

const loginSocial = (req, res) => {
  var email = req.body.email;

  var con = mydb();
  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM `user` WHERE `email` = '" + email + "'",
      function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          if (result[0]["status"] != "1") {
            res.json({
              status: 1,
              data: result[0],
            });
          } else {
            res.json({
              status: 2,
              data: result[0],
            });
          }

          return 0;
        } else {
          res.json({
            status: 0,
          });
        }
      }
    );
  });
};

module.exports = {
  login,
  loginSocial,
};

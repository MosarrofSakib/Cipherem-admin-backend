const mydb = require("../Utils/db.utils");
const { sendSingleMail } = require("../Utils/mail.utils");

const postEmail = (req, res) => {
  var email = req.body.email;

  var con = mydb();

  con.connect(function (err) {
    if (err) throw err;

    con.query(
      "SELECT * FROM `collected_mails` WHERE `email` = '" + email + "'",
      function (err, result, fields) {
        if (err) throw err;

        if (result.length > 0) {
          res.json({
            status: 0,
          });
          return 0;
        } else {
          con.query(
            "INSERT INTO `collected_mails`(`email`) VALUES ( '" + email + "')",
            function (err, result, fields) {
              if (err) throw err;

              sendSingleMail(email);
              res.json({
                status: 1,
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

module.exports = { postEmail };

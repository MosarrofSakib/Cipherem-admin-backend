const bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const mydb = require("../Utils/db.utils");

const userAll = (req, res) => {
  var con = mydb();

  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM `user`", function (err, result, fields) {
      if (err) throw err;

      res.json({
        status: 1,
        data: result,
      });
    });
  });
};

const userPending = (req, res) => {
  var con = mydb();

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM `user` WHERE `status` = '1'",
      function (err, result, fields) {
        if (err) throw err;

        res.json({
          status: 1,
          data: result,
        });
      }
    );
  });
};

const AprovedUser = (req, res) => {
  var con = mydb();

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "SELECT * FROM `user` WHERE `status` = '2'",
      function (err, result, fields) {
        if (err) throw err;

        res.json({
          status: 1,
          data: result,
        });
      }
    );
  });
};

const userAprove = (req, res) => {
  var id = req.body.id;
  console.log(id);

  var con = mydb();

  con.connect(function (err) {
    if (err) throw err;
    con.query(
      "UPDATE `user` SET `status` = '2' WHERE `id` = '" + id + "'",
      function (err, result, fields) {
        if (err) throw err;

        con.query(
          "SELECT * FROM `user` WHERE `id`  = '" + id + "'",
          async function (err, r, fields) {
            if (err) throw err;

            //send email
            // var email = r[0]['email'];

            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
              },
            });

            let info = await transporter.sendMail({
              from: '"Fred Foo 👻" <foo@example.com>', // sender address
              to: "aabctech@gmail.com", // list of receivers
              subject: "Hello ✔", // Subject line
              text: "Hello world?", // plain text body
              html: "<b>Hello world?</b>", // html body
            });

            console.log("Message sent: %s", info.messageId);

            res.json({
              status: 1,
            });
          }
        );
      }
    );
  });
};

module.exports = {
  userPending,
  AprovedUser,
  userAprove,
  userAll,
};

const mydb = require("../Utils/db.utils");
const changeArray = require("../Utils/object.utils");
const { sendEveryoneMail } = require("../Utils/mail.utils");

const mailAll = (req, res) => {
  const templateId = req.body.templateId;
  console.log(templateId);

  var con = mydb();
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM `collected_mails`", (err, result) => {
      if (err) throw err;

      var results = changeArray(result);
      /* console.log(results); */
      console.log(templateId);
      sendEveryoneMail(results, templateId);

      res.status(200).send({
        status: 1,
        data: results,
        message: "Mail send to all users successfully.",
      });
    });
  });
};

module.exports = { mailAll };

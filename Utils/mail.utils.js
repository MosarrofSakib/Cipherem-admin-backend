var Sib = require("sib-api-v3-sdk");

const sendSingleMail = (receiver) => {
  console.log(process.env.API_KEY);
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.API_KEY;

  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: "press@cipherem.com",
    name: "Cipherem",
  };
  const receivers = [
    {
      email: receiver,
    },
  ];

  tranEmailApi
    .sendTransacEmail({
      sender: sender,
      to: receivers,
      /*  subject: "Welcome", */
      templateId: 9,
      params: {
        name: "Sakib",
        website: "www.cipherem.com",
      },
    })
    .then((data) => {
      console.log("Mail was sent successfully!");
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const sendEveryoneMail = (receivers, tempId) => {
  /* console.log(process.env.API_KEY); */
  const client = Sib.ApiClient.instance;
  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.API_KEY;

  const tranEmailApi = new Sib.TransactionalEmailsApi();

  const sender = {
    email: "press@cipherem.com",
    name: "Cipherem",
  };
  console.log(tempId);
  const templateId = parseInt(tempId);

  tranEmailApi
    .sendTransacEmail({
      sender: sender,
      to: receivers,
      templateId: templateId,
    })
    .then((data) => {
      console.log("Mail was sent successfully!");
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { sendSingleMail, sendEveryoneMail };

const mysql = require("mysql");

module.exports = () =>
  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nftmarketplace",
  });

/* mysql.createConnection({
    host: "localhost",
    user: "ciphsfhy_node",
    password: "!P3eqDfx)Ny+",
    database: "ciphsfhy_node"
   }); */

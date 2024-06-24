require("dotenv").config();

const config = {
  PORT: process.env.PORT || 8000,
  DB_CONN: `mongodb+srv://organicUser:${process.env.DB_CONN}@cluster0.tibcl.mongodb.net/HasanShop`, // ==> text
  //DB_CONN: `mongodb+srv://roni9843:${process.env.DB_CONN}@cluster0.utd8f8o.mongodb.net/HasanShop`, // ==> text
  // DB_CONN: `mongodb+srv://roni9843:roni9843@cluster0.utd8f8o.mongodb.net/HasanShop`, // Prodction
};

module.exports = config;

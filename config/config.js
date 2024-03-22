require("dotenv").config();

const config = {
  PORT: process.env.PORT || 8000,
  DB_CONN: `mongodb+srv://organicUser:${process.env.DB_CONN}@cluster0.tibcl.mongodb.net/HasanShop`,
};

module.exports = config;

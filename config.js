/** Common config for bookstore. */
require("dotenv").config();

let DB_URI = `postgresql://`;

if (process.env.NODE_ENV === "test") {
  DB_URI = `books-test`;
} else {
  DB_URI = `books`;
}


module.exports = { DB_URI };
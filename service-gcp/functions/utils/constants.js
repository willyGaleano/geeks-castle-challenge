const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

module.exports = {
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || "",
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
  USER_DOCUMENT_NAME: "users",
  CUSTOMER_DOCUMENT_NAME: "customers",
  SALT_OR_ROUNDS_BYCRYPT_DEFAULT: 10,
};

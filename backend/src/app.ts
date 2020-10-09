import express from "express";
import * as EmailValidator from "email-validator";
import saltHash from "password-salt-and-hash";

var cors = require("cors");

var passwordValidator = require("password-validator");

var bodyParser = require("body-parser");

var mysql = require("mysql");

// Create connection to mysql
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Vision_craft1",
  database: "users",
});

// TODO: Get these configs from env


connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();

app.use(cors()); // Use this after the variable declaration

app.use(bodyParser.json());

// Schema for password and validations
let schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blocklist these value

interface SaltedPassword {
  password: string;
  salt: string;
}

app.get("/", (req, res) => res.send("Express + TypeScript Server"));

app.put("/signup", (req, res) => {
  const hasNumbers = /^[0-9]+$/; // TODO: check for special characters as well in names

  // Hash password before storing
  let saltedPassword: SaltedPassword = saltHash.generateSaltHash(
    req.body.password
  );

  // Validate fields and query to mysql
  if (
    !EmailValidator.validate(req.body.email) ||
    !schema.validate(req.body.password) ||
    req.body.firstName.match(hasNumbers) ||
    req.body.lastName.match(hasNumbers)
  ) {
    return res.json({
      type: "error",
      message: "Error! Please check and enter acceptable values.",
    });
  } else {
    const query = `INSERT INTO users (firstName, lastName, email, saltedPassword, salt) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${saltedPassword.password}', '${saltedPassword.salt}');`;
    const checkIfEmailExistsQuery = `SELECT * FROM users WHERE email='${req.body.email}';`;

    connection.query(checkIfEmailExistsQuery, (err, result) => {
      if (err) return res.json({ type: "error", message: err });
      if (result.length > 0)
        return res.json({ type: "error", meesage: "Email already exists!" });

      connection.query(query, (err) => {
        if (err) return res.json({ type: "error", message: err });
        return res.json({ type: "success", message: "Registered!" });
      });
    });
  }
});

app.post("/signin", (req, res) => {
  let saltedPasswordFromDB: string;
  let saltFromDB: string;

  // Query from mysql for the given email
  const query = `SELECT * FROM users WHERE email='${req.body.email}';`;

  connection.query(query, (err, result) => {
    if (err) return res.json({ type: "error", message: err });

    // If email exists, query for its saltedPassword and salt
    if (result.length > 0) {
      saltedPasswordFromDB = result[0].saltedPassword;
      saltFromDB = result[0].salt;

      // Verify if password matches
      const isPasswordMatch: boolean = saltHash.verifySaltHash(
        saltFromDB,
        saltedPasswordFromDB,
        req.body.password
      );

      return isPasswordMatch
        ? res.json({ type: "success", message: "Successfully signed in!" })
        : res.json({ type: "error", message: "Incorrect email or password." }); // Wrong password
    } else {
      return res.json({
        type: "error",
        message: "Incorrect email or password.",
      }); // Email not found
    }
  });
});

// TODO: Create models for request and response

export default app;

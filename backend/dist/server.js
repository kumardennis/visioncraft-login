"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmailValidator = __importStar(require("email-validator"));
var passwordValidator = require("password-validator");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Vision_craft1",
    database: "users",
});
connection.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
    connection.query("SHOW databases", (err, result) => {
        if (err)
            throw err;
        console.log("Results", result);
    });
});
// Schema for password
var schema = new passwordValidator();
// Properties to it
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
const app = express_1.default();
app.use(bodyParser.json());
const PORT = 8000;
app.get("/", (req, res) => res.send("Express + TypeScript Server"));
app.put("/signup", (req, res) => {
    const hasNumbers = /^[0-9]+$/;
    // Hash password before storing
    // Validate fields and query
    if (!EmailValidator.validate(req.body.email) ||
        !schema.validate(req.body.saltedPassword) ||
        req.body.firstName.match(hasNumbers) ||
        req.body.lastName.match(hasNumbers)) {
        return res.send("Error! Please check and enter acceptable values.");
    }
    else {
        connection.query(`INSERT INTO users (firstName, lastName, email, saltedPassword)
    VALUES (${req.body.firstName}, ${req.body.lastName}, ${req.body.email}, ${req.body.saltedPassword})`, (err, result) => {
            if (err)
                throw err;
            return res.send("added");
        });
    }
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
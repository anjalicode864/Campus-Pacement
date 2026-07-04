console.log("MY SERVER FILE IS RUNNING");

const express = require("express");

const app = express();

const connection = require("./db");

let students = [];

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT =3000;

app.get("/test", (req, res) => {
    console.log("Browser connected.");
    res.send("Campus Placement Backend is Running....");
});

app.post("/register", (req, res) => {

    console.log(req.body);

    const {
        name,
        mobile,
        email,
        password,
        course,
        academic_type,
        academic_score,
        skills,
    } = req.body;
    
    const checkSql = "SELECT * FROM students WHERE email = ?";
    
    connection.query(checkSql, [email], (err, result) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }
        
        if (result.length > 0) {
            return res.send("Email already registered");
        
        }
        
        const sql = `
        INSERT INTO students
        (name,mobile,email,password,course,academic_type,academic_score,skills)
        VALUES (?,?,?,?,?,?,?,?)
        `;
        
        connection.query(
            sql,
            [
                name,
                mobile,
                email,
                password,
                course,
                academic_type,
                academic_score,
                skills
            ],
            (err, result) => {
                
                if (err) {
                    console.log(err);
                    return res.send("Registration Failed");
                }
                res.send("Student Registered successfully");
            }
        );
    });
});

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM students WHERE email = ? AND password = ?";

    connection.query(sql, [email, password],(err, result) => {
        if (err) {
            console.log(err);
            return res.send("Login Failed");
        }
        
        if (result.length > 0) {
            res.redirect("http://127.0.0.1:5500/s_dashboard.html?email=" + email);
        } else {
            res.send("Invalid Email or Password");
        }
    });
});

app.get("/student", (req, res) => {

    const email = req.query.email;

    const sql = "SELECT * FROM students WHERE email = ?";

    connection.query(sql, [email], (err, result) => {

        if (err) {
            return res.send("Database Error");
        }

        res.json(result[0]);

    });

});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
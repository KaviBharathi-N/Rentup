const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql2 = require('mysql2')


const app = express();
const PORT = 3001;

var connection = mysql2.createConnection({
  port:'3306',
  host:"sql12.freesqldatabase.com",
  password:"3XwKrACFyy",
  user:"sql12706858",
  database:"sql12706858"
})

connection.connect(function(err) {
  if (err) {
      console.error('error connecting: ' + err.stack);
      return;
  }
  else{
    console.error("connected")
  }
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Sign-in endpoint
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  

  connection.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    await [email, password],
    (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length === 0) {
        console.log("Invalid email or password");
        return res.status(401).json({ error: "Invalid email or password" });
      }

      console.log("Login success");
      return res.status(200).json({ message: "Login successful" });
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on  http:localhost:${PORT}`);
});
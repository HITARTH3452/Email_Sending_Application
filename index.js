const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

// require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "localhost", // Replace with your provider's SMTP server
  port: 1025, // Port may vary depending on your provider
  secure: false, // Use true for TLS, false for non-TLS (consult your provider)
});

app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Form</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f0f0f0;
        margin: 0;
      }
      .container {
        background: white;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      form {
        display: flex;
        flex-direction: column;
      }
      label {
        margin-top: 10px;
        font-weight: bold;
      }
      input, textarea {
        margin-top: 5px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      button {
        margin-top: 20px;
        padding: 10px;
        font-size: 16px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #218838;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Send Email</h2>
      <form action="/send-email" method="post">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="subject">Subject:</label>
        <input type="text" id="subject" name="subject" required>
        
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>
        
        <button type="submit">Send Email</button>
      </form>
    </div>
  </body>
  </html>
 `);
});


app.post("/send-email" ,(req, res) => {
    console.log(req.body);
    const { email , subject , message} = req.body;
    
    const mailOptions = {
        from : "hitarth@gmail.com",
        to : email,
        subject : subject,
        html : message
    }


    transporter.sendMail(mailOptions , (error , info) => {
        if (error) {
            console.log(error);
            res.setHeader('Content-Type', 'text/html');
            res.end(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Error</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    margin: 0;
                  }
                  .container {
                    background: white;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    text-align: center;
                  }
                  button {
                    margin-top: 20px;
                    padding: 10px;
                    font-size: 16px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                  }
                  button:hover {
                    background-color: #218838;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h2>Error Sending Email</h2>
                  <p>There was an error sending your email: ${error.message}</p>
                  <button onclick="window.location.href='/'">Try Again</button>
                </div>
              </body>
              </html>
            `);
          } else {
            console.log('Email sent: ' + info.response);
            res.setHeader('Content-Type', 'text/html');
            res.end(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Sent</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    margin: 0;
                  }
                  .container {
                    background: white;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                    text-align: center;
                  }
                  button {
                    margin-top: 20px;
                    padding: 10px;
                    font-size: 16px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                  }
                  button:hover {
                    background-color: #218838;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h2>Email Sent Successfully</h2>
                  <p>Your email has been sent successfully!</p>
                  <button onclick="window.location.href='/'">Send Another Email</button>
                </div>
              </body>
              </html>
            `);
                }
    })

})



app.listen(8080, () => console.log("Server is up and running at port 8080"));

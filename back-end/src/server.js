const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
env.config();
// app.use(bodyParser());

app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
const mongo = require('./connection.js');

mongo.connectToServer( function( err) {
    if (err) console.log(err);
      app.use(cors());
  // auth routes
      app.use('/api',require('./routes/admin/auth'));
      app.use('/api',require('./routes/admin/admin'));
      app.use('/api',require('./routes/admin/clients'));
      app.use('/api',require('./routes/admin/employees'));
      app.use('/api',require('./routes/admin/leads'));
    
})

app.listen(process.env.PORT,() =>{
  console.log(`server is running on ${process.env.PORT}`);
});
app.use(express.json());

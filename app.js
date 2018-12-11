let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql');

let app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
global.app = app;

require('./vendor');
require('./admin');
let server = require('http').createServer(app);
let PORT = 3000 || process.env.PORT

server.listen(PORT,()=>{
    global.con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database :"payment_gateway"
      });
      
      con.connect(function(err) {
        if (err){ throw err};
      
        console.log("Connected!");
      });
console.log("the server is listening on .......",PORT);
})
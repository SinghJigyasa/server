
var mongoClient = require('mongodb').MongoClient;
var express = require('express')
var cors = require('cors');
const { MongoConnection } = require('./mongodb');
var ConnectionString = 'mongodb://localhost:27017';
var app = express()
app.use(cors())
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

  //Register User
  app.post('/register', (req, res) => {
    let dataItem = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.email,
        password: req.body.pass
    };

    if (!dataItem.firstName || !dataItem.lastName || !dataItem.emailId || !dataItem.password) {
        return res.status(400).json({ msg: 'Invalid parameters', result: [] });
    }

    MongoConnection.then(collection => {
        return collection.insertOne(dataItem);
    })
    .then(result => {
        if (result.acknowledged === true) {
            return res.status(200).json({ msg: 'Data Inserted Successfully', result: [] });
        } else {
            console.log(result);
            return res.status(500).json({ msg: 'Error inserting data', result: [] });
        }
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ msg: 'Internal Server Error', result: [] });
    });
});


  //Login User
  app.post('/login', (req, res) => {
    const { email, pass } = req.body; 

    if (!email || !pass) {
        return res.status(400).json({ msg: 'Invalid parameters', result: [] });
    }
    MongoConnection.then(collection => {
        return collection.findOne({ $and: [{ emailId: email }, { password: pass }] });
    })
    .then(response => {
        if (!response) {
            return res.status(401).json({ msg: 'Invalid email or password', result: [] });
        } else {
            return res.status(200).json({
                msg: 'Login Successfully',
                result: [{ firstName: response.firstName, lastName: response.lastName, EmailId: response.emailId }],
                token: ''
            });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

app.listen(8080,()=>{
    console.log("Server Started");
})

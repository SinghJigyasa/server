
var mongoClient = require("mongodb").MongoClient;
var express = require('express');
var cors = require('cors')
var ConnectionString = 'mongodb://localhost:27017'
var app = express()

app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send('<h1>All API</h1> <br> <a href=http://localhost:8080/readAllData>Read</a>')
})

//Read all Data
app.get('/readAllData', (req,res)=>{
    mongoClient.connect(ConnectionString)
    .then(response=>{
        var dataBase = response.db('firstDataBase')
        return dataBase.collection('tbl1').find({}).toArray()
    })
    .then(document=>{
        res.send(document)
    })
    .catch(err=>{
        console.log(err);
    })
})


//Read all the data by using path params
app.get('/student/:id/:Name',(req,res)=>{
    var id = Number(req.params.id);
    var Name = req.params.Name
    mongoClient.connect(ConnectionString)
    .then(response=>{
        var dataBase = response.db('firstDataBase')
        console.log(id);
        return dataBase.collection('tbl1').find({$and:[{'id':id},{'Name':Name}]}).toArray()
    }).then(document=>{
        res.send(document)
    }).catch(err=>{
        console.log(err);
    })
})


//Create the data 
app.post('/createData',(req,res)=>{
    var data = {
        'branch': req.body.branch,
        'id': req.body.id,
        'Name': req.body.Name
    }
    console.log(data);
    mongoClient.connect(ConnectionString)
    .then(clientObj=>{
        var dataBase = clientObj.db("firstDataBase")
        return dataBase.collection('tbl1').insertOne(data)
    })
    .then(document=>{
        res.send("Inserted Succesfully")
    })
    .catch(err=>{
        console.log(err);
    })
})


 
app.listen(8080,()=>{
   console.log("Server Started")
})
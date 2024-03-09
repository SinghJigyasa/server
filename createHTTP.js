
//Creating HTTP Server
const { error } = require('console')
var http = require('http')

var app= http.createServer((request,response)=>{
    response.writeHead(200,{
        'Content-Type':'text/html'
    })
    response.write("<h1>Welcome!!!</h1>")
    response.end()
})
app.listen(8080)

//Connect to MongoDB DataBase
var MongoClient = require('mongodb').MongoClient;
var ConnectionString = "mongodb://localhost:27017";

MongoClient.connect(ConnectionString)
.then((response)=>{
    var dataBase= response.db("firstDataBase")
    dataBase.collection('tbl1').find({}).toArray()
    .then(data=>{
        console.log(data);
    }).catch(err=>console.log(err))
}).catch(error=>{console.log(error)})
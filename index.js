

//connect MongoClient With DataBase
var mongoClient = require("mongodb").MongoClient;
var ConnectionString = "mongodb://localhost:27017";
var http = require("http");

var app = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    mongoClient.connect(ConnectionString)
        .then(client => {
            var database = client.db("firstDataBase");
            return database.collection("tbl1").findOne({'name':'Jigyasa'})
        })
        .then(data => {
            res.write(JSON.stringify(data));
            res.end();
        })
        .catch(error => {
            console.error("Error:", error);
            res.end();
        })
       
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

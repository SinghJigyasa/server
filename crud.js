var mongoClient= require('mongodb').MongoClient;
var ConnectionString="mongodb://localhost:27017"

mongoClient.connect(ConnectionString)

   // Read the Data
.then((res)=>{
    var DataBase = res.db("firstDataBase");
    return DataBase.collection('tbl1').find({}).toArray()
})
.then(data=>{
    console.log(data);
})

   //Create the Data
.then((res)=>{
    var newData={'branch':'IT','id':7,'Name':'Roy'}
    var dataBase = res.db("firstDataBase")
   return dataBase.collection('tbl1').insertOne(newData)
})
.then(data=>{
    if(data){
        console.log("Inserted Successful");
    }
})

    //Update the Data
.then(res=>{
    var dataBase = res.db('firstDataBase')
    return dataBase.collection('tbl1').updateOne({'name':'Jigyasa'},{$set:{'branch':"Computer science"}})
})
.then(data=>{
    console.log("Update Successful");
})

    //Delete The Data
.then(res=>{
    var dataBase= res.db('firstDataBase')
    return dataBase.collection('tbl1').deleteOne({'id':7})
})
.then(data=>{
    console.log("Deleted Successfully");
})
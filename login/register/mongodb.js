
const MongoClient = require('mongodb').MongoClient;
const ConnectionString = 'mongodb://localhost:27017';

const MongoConnection = MongoClient.connect(ConnectionString)
  .then(client => {
    const db = client.db('firstDataBase');
    const collection = db.collection('registerUser');
    return collection;
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
 module.exports = {MongoConnection}
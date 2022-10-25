
// EXPRESS SERVER
const express = require('express');
const app = express();
app.use(express.json());
const PORT = 80;


// CORS
const cors = require('cors');
app.use(cors({origin: '*'}));



// MONGODB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://RankProject:yVTkclkkmsyf4moh@cluster0.vbatj02.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

const database = client.db('RankBank');
const collection = database.collection('ranks');



app.get('/entries', async (req, res) => {
    // console.log(req.body)
    const entries = await collection.find().toArray()
    res.send(entries)
});

// app.get('/:id', (req, res) => {
//    
// });

app.post('/entry', async (req, res) => {
    // console.log(req.body)
    await collection.insertOne(req.body)
    // console.log(req.body)
    res.send(req.body)
});

// app.delete('/:id', (req, res) => {
//   
// });

client.connect().then(() => {
    console.log('Connected to mondoDb')
    app.listen(PORT, () => {
        console.log(`App is listening at http://localhost:${PORT}`);
    })
});

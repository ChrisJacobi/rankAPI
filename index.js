
// EXPRESS SERVER
const express = require('express');
const app = express();
app.use(express.json());
const PORT = 80;


// CORS
const cors = require('cors');
app.use(cors({origin: '*'}));



// MONGODB
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://RankProject:yVTkclkkmsyf4moh@cluster0.vbatj02.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const database = client.db('RankBank');
const collection = database.collection('ranks');



app.get('/ranks', async (req, res) => {
	const ranks = await collection.find().sort({_id:-1}).toArray()
	res.send(ranks)
});

app.get('/rank/:_id', async (req, res) => {
	const _id = ObjectId(req.params._id)
	const rank = await collection.find(_id).toArray()
	res.send(rank)
})

app.post('/post/rank', async (req, res) => {
	await collection.insertOne(req.body)
	res.send(req.body)  
});

app.delete('/rank/:_id', async (req, res) => { 
  const _id = ObjectId(req.params._id)
  await collection.deleteOne({_id})
  res.status(200).send({_id})
});   

client.connect().then(() => {
	console.log('Connected to mongoDb')  
	app.listen(PORT, () => {
		console.log(`App is listening at http://localhost:${PORT}`);
	})
});

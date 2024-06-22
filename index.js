const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://multigym:<Kx2DYq0BG7gJYo1M--->@cluster0.9ahgmx8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(uri);


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
    
    const Newscollection = client.db('gym').collection('news');
    const Trainercollection = client.db('gym').collection('trainer');
  const userCollection = client.db('gym').collection('User');

  //news collection

  app.get('/news/get-id/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    try {const result = await Newscollection.findOne(filter);
      res.send(result);} catch (err) {res.status(500).send({ error: err.message });}
  });

  app.get('/news/get-all', async (req, res) => {
    try {const cursor = Newscollection.find();
      const user = await cursor.toArray();
      res.send(user);} 
    catch (error) {
      console.error("Error fetching all contests:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  app.get('/trainer/get-id/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    try {const result = await Trainercollection.findOne(filter);
      res.send(result);} catch (err) {res.status(500).send({ error: err.message });}
  });

  app.get('/trainer/get-all', async (req, res) => {
    try {const cursor = Trainercollection.find();
      const user = await cursor.toArray();
      res.send(user);} 
    catch (error) {
      console.error("Error fetching all trainer:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get('/trainer/get-name/:name', async (req, res) => {
    const name = req.params.name;
    const filter = { short_name:name };
    try {const result = await Trainercollection.findOne(filter);
      res.send(result);} catch (err) {res.status(500).send({ error: err.message });}
  });
        

// Send a ping to confirm a successful connection
 await client.db("admin").command({ ping: 1 });
 console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Welcome to our server')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
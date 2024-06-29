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
    
    const News_collection = client.db('Gymweb').collection('blogs');
    const Team_collection = client.db('Gymweb').collection('Teams');
    const Testimonial_collection = client.db('Gymweb').collection('testimonial');

  //news collection 
  //get method 

  app.get('/news/get-all', async (req, res) => {
    try {const cursor = News_collection.find();
      const user = await cursor.toArray();
      res.send(user);} 
    catch (error) {
      console.error("Error fetching all contests:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.get('/news/get-id/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    try {const result = await News_collection.findOne(filter);
      res.send(result);} catch (err) {res.status(500).send({ error: err.message });}
  });

  app.get('/news/get-category/:category', async (req, res) => {
    const category = req.params.category;
    const filter = { category: category };
    try {
      const result = await News_collection.find(filter).toArray();
      res.send(result);
    } catch (err) {res.status(500).send({ error: err.message });}
  });

  //post method

  app.post('/news/post', async (req, res) => {
    try {
      const news = req.body;
      console.log(news); 
      const result = await News_collection.insertOne(news);
      res.send(result);
    } catch (error) {
      console.error('Error posting news:', error);
      res.status(500).send({ message: 'Server error. News not posted.', error: error.message });
    }
  });

  //delete method
  app.delete('/news/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await News_collection.deleteOne(filter);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'news deleted successfully' });
        } else {
            res.status(404).json({ message: 'news not found' });
        }
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT method
app.put('/news/put/:id', async (req, res) => {
  const id = req.params.id;
  const newsData = req.body; 
  try {
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true }; 
    const updateDoc = {
      $set: newsData,
    };
    const result = await News_collection.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


  app.get('/trainer/get-id/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    try {const result = await Team_collection.findOne(filter);
      res.send(result);} catch (err) {res.status(500).send({ error: err.message });}
  });

  app.get('/trainer/get-all', async (req, res) => {
    try {const cursor = Team_collection.find();
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
    try {const result = await Team_collection.findOne(filter);
      res.send(result);} catch (err) {res.status(500).send({ error: err.message });}
  });

  app.get('/trainer/get-role/:role', async (req, res) => {
    const role = req.params.role;
    const filter = { role: role };
    try {
      const result = await Team_collection.find(filter).toArray();
      res.send(result);
    } catch (err) {res.status(500).send({ error: err.message });}
  });

  app.post('/trainer/post', async (req, res) => {
    try {
      const trainer = req.body;
      console.log(trainer);
      const result = await Team_collection.insertOne(trainer);
      res.send(result);
    } catch (error) {
      console.error('Error posting trainer:', error);
      res.status(500).send({ message: 'Server error. Trainer not posted.', error: error.message });
    }
  });

  //delete method
  app.delete('/trainer/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await Team_collection.deleteOne(filter);
        if (result.deletedCount === 1) {
            res.status(200).json({ message: 'trainer deleted successfully' });
        } else {
            res.status(404).json({ message: 'trainer not found' });
        }
    } catch (error) {
        console.error('Error deleting trainer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT method
app.put('/trainer/put/:id', async (req, res) => {
  const id = req.params.id;
  const newsData = req.body; 
  try {
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true }; 
    const updateDoc = {
      $set: newsData,
    };
    const result = await Team_collection.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});  

//Testimonial 
app.get('/testimonial/get-all', async (req, res) => {
  try {const cursor = Testimonial_collection.find();
    const test = await cursor.toArray();
    res.send(test);} 
  catch (error) {
    console.error("Error fetching all trainer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/testimonial/get-id/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  try {const result = await Testimonial_collection.findOne(filter);
    res.send(result);} catch (err) {res.status(500).send({ error: err.message });}
});

app.post('/testimonial/post', async (req, res) => {
  try {
    const testimonial = req.body;
    console.log(testimonial);
    const result = await Testimonial_collection.insertOne(testimonial);
    res.send(result);
  } catch (error) {
    console.error('Error posting testimonial:', error);
    res.status(500).send({ message: 'Server error. Testimonial not posted.', error: error.message });
  }
});

//delete method
app.delete('/testimonial/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const filter = { _id: new ObjectId(id) };
      const result = await Testimonial_collection.deleteOne(filter);
      if (result.deletedCount === 1) {
          res.status(200).json({ message: 'testimonial deleted successfully' });
      } else {
          res.status(404).json({ message: 'testimonial not found' });
      }
  } catch (error) {
      console.error('Error deleting testimonial:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
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

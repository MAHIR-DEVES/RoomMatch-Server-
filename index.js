const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.Db_PASS}@cluster0.csfnsag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const postsCollections = client.db('RoomMatchDB').collection('posts');

    app.post('/posts', async (req, res) => {
      const newPost = req.body;
      console.log(newPost);
      const result = await postsCollections.insertOne(newPost);
      res.send(result);
    });

    //
    app.get('/posts', async (req, res) => {
      const result = await postsCollections.find().limit(6).toArray();
      res.send(result);
    });

    //
    app.get('/AllPosts', async (req, res) => {
      const result = await postsCollections.find().toArray();
      res.send(result);
    });

    //
    app.get('/posts/:id', async (req, res) => {
      const id = req.params.id;
      try {
        const post = await postsCollections.findOne({ _id: new ObjectId(id) });
        if (!post) {
          return res.status(404).send({ message: 'Post not found' });
        }
        res.send(post);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching post', error });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('assigment server running');
});

app.listen(port, () => {
  console.log(`assigment server in running on port${port}`);
});

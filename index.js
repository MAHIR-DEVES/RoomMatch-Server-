const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.csfnsag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const postsCollections = client.db('RoomMatchDB').collection('posts');

    app.post('/posts', async (req, res) => {
      const newPost = req.body;
      console.log(newPost);
      const result = await postsCollections.insertOne(newPost);
      res.send(result);
    });

    //
    app.get('/posts', async (req, res) => {
      const result = await postsCollections
        .find({
          availability: 'available',
        })
        .limit(6)
        .toArray();
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

    // get email data
    app.get('/my-posts/:email', async (req, res) => {
      const email = req.params.email;
      try {
        const result = await postsCollections.find({ email: email }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error fetching posts', error });
      }
    });

    // Update a post
    app.put('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;

      try {
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: updatedData,
        };
        const result = await postsCollections.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: 'Error updating post', error });
      }
    });

    // Add Like

    app.patch('/posts/like/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $inc: { likeCount: 1 },
        };
        const result = await postsCollections.updateOne(filter, updateDoc);
        console.log(result, id);

        const updatedPost = await postsCollections.findOne(filter);
        res.send({
          success: true,
          likeCount: updatedPost.likeCount,
        });
      } catch (error) {
        res.status(500).send({
          success: false,
          message: 'Error updating like count',
          error: error.message,
        });
      }
    });

    //
    app.delete('/posts/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postsCollections.deleteOne(query);
      res.send(result);
    });

    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('assignment server running');
});

app.listen(port, () => {
  console.log(`assignment server in running on port${port}`);
});

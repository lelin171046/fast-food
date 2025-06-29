const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const corsOption = {

    origin: [
      'http://localhost:5173',
    //   'https://builder-bd.web.app',
  
    ],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOption));
  app.use(express.json());

// const uri = `mongodb://localhost:27017/`



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0f5vnoo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


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
      await client.connect();

      const menuCollection = client.db('fastFoodDB').collection('menu');
      const reviewCollection = client.db('fastFoodDB').collection('reviews');
      const usersCollection = client.db('fastFoodDB').collection('users');
      const cartCollection = client.db('fastFoodDB').collection('cart');

      //menu api
      app.get('/menu', async (req, res)=>{
        const result = await menuCollection.find().toArray()
        res.send(result)
      })

      //user Api....................
      //all users
      app.get('/users', async (req, res)=>{
        const result = await usersCollection.find().toArray();
        res.send(result)
      })
      app.post('/users',  async(req, res)=>{
        const user = req.body;
        //checking user 
        const query = {email : user.email}
        const existingUser = await usersCollection.findOne(query);
        if(existingUser){
          return res.send({message: 'user already Exist', insertedId: null})
        }


        const result = await usersCollection.insertOne(user);
        res.send(result);

      })

      //Delete Userr
      app.delete('/users/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await usersCollection.deleteOne(query);
        res.send(result)
      })
     
     //reviews api
      app.get('/reviews', async (req, res)=>{
        const result = await reviewCollection.find().toArray()
        res.send(result)
      })

      //cart Collection user
      app.get('/carts', async (req, res)=>{
        const email = req.query.email;
        const query = { email : email};
        const result = await cartCollection.find(query).toArray();
        res.send(result)
      })
      //add cart 
      app.post('/cart', async (req, res)=>{
        const cartItem = req.body;
        const result = await cartCollection.insertOne(cartItem);
        res.send(result)

      })
      //Delete cart Item
      app.delete('/carts/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await cartCollection.deleteOne(query)
        res.send(result)
      })
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);



//user list
// app.get()

// Routes that don't need to be inside `run`
app.get('/', (req, res) => {
    res.send('server running ok');
  });
// Start the server
app.listen(port, () => console.log(`Server running on port: ${port}`))
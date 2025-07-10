const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const express = require('express');
const app = express();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.Payment_Secret_Key)
const port = process.env.PORT || 5000;
const corsOption = {

    origin: [
      'http://localhost:5173',
    //   'https://builder-bd.web.app',
  
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH',
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
      const paymentCollection = client.db('fastFoodDB').collection('payment');

   
      //Making MiddleWire
      const verifyToken = (req, res, next) =>{
        // console.log('inside', req.headers.authorization);
        if(!req.headers.authorization){
          return res.status(401).send({message: 'unauthorized access'})
        }
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded)=>{
          if(err){
            return res.status(401).send({message: 'unauthorized access'})
          }
          req.decoded =decoded

          next()
        })

        
      }
  //JWT token
      app.post('/jwt', async(req, res)=>{
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '1h'});

        res.send({token})

      })
       //verify Admin
      const verifyAdmin = async (req, res, next) =>{
        const email = req.decoded.email;
        const query = {email: email}
        const user = await usersCollection.findOne(query);
        const isAdmin = user?.role ==='admin';
        if(!isAdmin){
          return res.status(403).send({message: 'forbidden access'});
        }
        next()
      }
      
     
    
     

  ///Admin api
      app.get('/users/admin/:email', verifyToken,  async(req, res)=>{
        const email = req.params.email;
        if(email !== req.decoded.email){
          return res.status(403).send({message: 'Unauthorized access'})

        }
        const query = {email: email}
        const user = await usersCollection.findOne(query);
        let admin = false;
        if(user){
          admin = user?.role === 'admin'
        }
        res.send({admin})
      })
    

      //user Api....................
      //all users
      app.get('/users', verifyToken, verifyAdmin, async (req, res)=>{
        
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

      //Delete User
      app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await usersCollection.deleteOne(query);
        res.send(result)
      })
     //Role Making api
     app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res)=>{
      const id = req.params.id;
        const filter = {_id : new ObjectId(id)};
        const updatedDoc = {
          $set:{
            role : 'admin'
          }
        }
        const result = await usersCollection.updateOne(filter, updatedDoc);
         res.send(result)
     })


      //menu api
      app.get('/menu', async (req, res)=>{
        const result = await menuCollection.find().toArray()
        res.send(result)
      })
      //
        app.get('/menu/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await menuCollection.findOne(query);
      res.send(result);
    })

      //men post
      app.post('/menu', verifyToken, verifyAdmin,  async (req, res)=>{
        const item = req.body;
        const result = await menuCollection.insertOne(item);
        res.send(result)
      })

      //delete Menu Item
      app.delete('/menu/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)}
        const result = await menuCollection.deleteOne(query);
        res.send(result)
      })

      //update menu
        app.patch('/menu/:id', async (req, res) => {
      const item = req.body;
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const updatedDoc = {
        $set: {
          name: item.name,
          category: item.category,
          price: item.price,
          recipe: item.recipe,
          image: item.image
        }
      }

      const result = await menuCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })
    
      //menu by id

      app.get('.menu/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result = await menuCollection.findOne(query);
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

      //Payment------------------------------------payment

      app.post('/create-checkout-session', async (req, res) =>{
        const { price } = req.body;
        const amount = parseInt(price * 100);
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'usd',
          payment_method_types: ['card']
        })
        res.send({
          clientSecret: paymentIntent.client_secret
        })
      })
      //store user payment info
      app.post('/payment', async (req, res)=>{
        const payment = req.body;
        const paymentResult = await paymentCollection.insertOne(payment);
        //know delete cart items
        const query = { _id: {
          $in: payment.cartIds.map(id=> new ObjectId(id))
        }

        }

        const deleteResult = await cartCollection.deleteMany(query)
        // console.log('pay info', payment)
        res.send({paymentResult, deleteResult})
      })

      //payment history get
      app.get('/payments/:email', verifyToken, async (req,res)=>{
        const query = {email : req.params.email};
        if(req.params.email !== req.decoded.email){
          return res.status(403).send({message: 'forbidden'})
        }
        const result = await paymentCollection.find(query).toArray();
        res.send(result)
      })

      //Admin Data analysis 
      app.get('/admin-stats', verifyToken, verifyAdmin, async (req, res)=>{
        const users = await usersCollection.estimatedDocumentCount();
        const menuItems = await menuCollection.estimatedDocumentCount();
        const orders = await paymentCollection.estimatedDocumentCount();
        const result = await paymentCollection.aggregate([
        {
            $group : {
            _id: null,
            totalRevenue: { $sum : '$price'}
          }
        }
        ]).toArray()
        const revenue = result.length > 0 ? result[0].totalRevenue : 0;
        res.send({users, menuItems,orders, revenue})

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
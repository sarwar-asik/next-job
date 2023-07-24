const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(" successfully connected to MongoDB!");
    const newsCollection = client.db("news-portal").collection("news");

    if (req.method === "GET") {
      const news = await newsCollection.find({}).toArray();
      res.send({ message: "success", status: 200, data: news });
      // res.send({data:"aaaaaaaaaaa"})
    }

    if (req.method = "POST") {
      const news = req.body;
      console.log(news,"from backend");

      // const lastData =await newsCollection.find({}).toArray()

      const lastData = await newsCollection.find({}).sort({ id: -1 }).limit(1).toArray()


      if(lastData){
        const lastId = lastData[0].id
      const newId = parseInt(lastId) + 1

      console.log("🚀 ~ file: news.js:39 ~ run ~ newId:", newId)
      news.id = newId
      console.log(news,"newssssssss");
      }

      

      const result = newsCollection.insertOne(news)
      res.json(result)
    }

    


  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// run().catch(console.dir);

export default run;

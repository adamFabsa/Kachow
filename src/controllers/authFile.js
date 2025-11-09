const {MongoClient} = require('mongodb');
const uri = process.env.MONGO_API_KEY;
let monServer;

async function connectMongo()
{
    if(!monServer)
    {
        monServer = new MongoClient(uri);
        await monServer.connect();
    }
    return monServer;
}

exports.createUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(email);
    try{
        const client = await connectMongo();
        const userDataBase = await client.db('Cluster0').collection('accountInfo');
        if(!email||!password)
        {
            console.log("No Data Found");
        }
        else
        {
            await userDataBase.insertOne({email, password});
        }
        console.log("Hello Wolrd");
        res.status(200).send("User created successfully");
    }
    catch(err)
    {
        console.error(err);
        res.status(500).send("Sign Up Error");
    }
}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log(email+" "+password);
    try{
        const client = await connectMongo();
        const userDataBase = await client.db('userDetails').collection('accountInfo');
        const user = await userDataBase.findOne({email, password});
        const user2 = await userDataBase.findOne({email:"tharunsevvel@gmail.com"});
       // console.log(user2.json());
        if(user)
        {
            req.session.user = user;
            res.status(200).json({message:"Login Successful"});
           // console.log("Logged in Succesfully");
        }
        else
        {
            res.status(401).json({message:"Invalid Credentials"});
        }
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({message: "Login Error"});
    }
}
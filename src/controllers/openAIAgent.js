const { MongoClient } = require('mongodb');
const OpenAI = require('openai');
const uri = process.env.MONGO_API_KEY;
let monServer;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function connectMongo() {
  if (!monServer) {
    monServer = new MongoClient(uri);
    await monServer.connect();
  }
  return monServer;
}

async function calculate(carType)
{
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that calculates long term car ownership costs." },
      { role: "user", content: "Calculate the 5 year cost of owning a " + carType+ " including gas, maintenance, insurance and depreciation. Only return the range of prices" }
    ],
  });
  return response.choices[0].message.content;
}


exports.chat = async (req, res) => {
  const { text } = req.query;
  console.log(text);
  try {

    let userInfo = {};
    let messages= [
      { role: "system", content: 
        "You are helping the user buy a car." +
        "Step 1. Please access the user information. You may get information on the user function in the following way get_user_info():NAME_PLACEHOLDER. (Assume the user name is Tharun and use the exact same format)"+
        "Step 2. (Skip this step for now) Based on user info recommend a car to buy. You may search for a car using the search_car():MODEL_PLACEHOLDER, BUDGET_PLACEHOLDER, PREFERENCES_PLACEHOLDER function."+
        "Step 3. (Skip this step for now) Based on the car you recommended please give a price range for the next five years and include long term costs like gas,repairs and more. Use the function calculate():CAR_MODEL"+
        "Step 4. Output DONE when you are finished with this process"
      },
      { role: "user", content: text }
      
    ]
    while(true)
    {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
      });
      console.log(response.choices[0].message.content);
      console.log(response.choices[0].message.content.split(":")[0]);

      if(response.choices[0].message.content.includes("DONE"))
      {
        break;
      }

      else if(response.choices[0].message.content.split(":")[0] === "get_user_info()")
      {
        try{
          const client = await connectMongo();
          const financeDetails = await client.db('userDetails').collection('accountInfo');
          const details = await financeDetails.find({name: response.choices[0].message.content.split(":")[1]}).toArray();
          userInfo = details;
          messages.push({ role: "assistant", content: `User Info: ${JSON.stringify(details)}` });
        }
        catch(err)
        {
          console.error('Error fetching finance details:', err);
          res.status(500).json({error: 'Internal Server Error'});
        }
      }

      else if(response.choices[0].message.content.split(":")[0] === "search_car()")
      {

      }

      else if(response.choices[0].message.content.split(":")[0] === "calculate()")
      {
        const calculation = await calculate(response.choices[0].message.content.split(":")[1]);
        messages.push({ role: "assistant", content: `Calculation Result: ${JSON.stringify(calculation)}` });
      }
    }
   
  } catch (err) {
    console.error(err);
    res.status(500).send("Error chatting with AI");
  }
};





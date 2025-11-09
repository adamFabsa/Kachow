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
      { role: "user", content: "Calculate the 5 year cost of owning a " + carType+ " including gas, maintenance, insurance and depreciation. Only return the range of prices. The output should be given as NUM_1-NUM_2" }
    ],
  });
  return response.choices[0].message.content;
}


exports.chat = async (req, res) => {
  const { text } = req.query;
  console.log(text);
  try {

    let userInfo = {};
    let carInfo = {};
    let messages= [
      { role: "system", content: 
       "You are an AI assistant that helps a user buy a car. Follow these rules strictly:"+

       "1. Only output function calls: get_user_info(), search_car(), calculate(), DONE()."+
       "2. To get user info, output: get_user_info():NAME"+
       "3. To search for cars within budget, output: search_car():MONTHLY_BUDGET (Store just the number and no $ or ,)"+
       "4. To calculate 5-year ownership cost, output: calculate():CAR_MODEL"+
      "5. When finished, output final recommendation as: DONE:(Final recommendation here, including car model and price range)"+
        "6. Never output explanations, apologies, extra text, or the word SUCCESS except inside the final DONE() message."+
        "7. After receiving data from function calls, continue to the next step until DONE()."
      },
      { role: "user", content: text }
      
    ]
    while(true)
    {
      const response = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: messages,
      });
      console.log(response.choices[0].message.content);
      //console.log(response.choices[0].message.content.split(":")[0]);

      if(response.choices[0].message.content.includes("DONE"))
      {
        res.status(200).json({
          userInfo: userInfo,
          carInfo: carInfo,
          finalAnswer: response.choices[0].message.content.split(":")[1]
        });
        //console.log(response.choices[0].message.content.split(":")[1]);
        break;
      }

      else if(response.choices[0].message.content.split(":")[0] === "get_user_info()")
      {
        try{
          const client = await connectMongo();
          const financeDetails = await client.db('userDetails').collection('accountInfo');
          const details = await financeDetails.find({name: response.choices[0].message.content.split(":")[1]}).toArray();
          userInfo = details;
          messages.push({ role: "assistant", content: `get_user_info():SUCCESS:${JSON.stringify(details)}` });
        }
        catch(err)
        {
          console.error('Error fetching finance details:', err);
          res.status(500).json({error: 'Internal Server Error'});
        }
      }

      else if(response.choices[0].message.content.split(":")[0] === "search_car()")
      {
        try{
          const client = await connectMongo();
          const carDetails = await client.db('userDetails').collection('carInfo');
          const details = await carDetails.find({monthly_payment_usd: {$lte: parseInt(response.choices[0].message.content.split(":")[1])}}).toArray();
          carInfo = details;
          messages.push({ role: "assistant", content: `search_car():SUCCESS:${JSON.stringify(details)}` });
        }
        catch(err)
        {
          res.status(500).json({error: 'Internal Server Error'});
        }
      }
      else if(response.choices[0].message.content.split(":")[0] === "calculate()")
      {
        const calculation = await calculate(response.choices[0].message.content.split(":")[1]);
        messages.push({ role: "assistant", content: `calculate():SUCCESS:${JSON.stringify(calculation)}` });
      }
    }
   
  } catch (err) {
    console.error(err);
    res.status(500).send("Error chatting with AI");
  }
};



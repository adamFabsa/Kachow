require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const session = require('express-session');

// ======================= CONTROLLERS ======================= //
//const AuthController = require('./controllers/AuthFile');
//const CalController = require('./controllers/CalendarFile');


const openAIAgent = require('./controllers/openAIAgent');
const app = express();
const PORT = 3000;
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave :false,
  saveUninitialized : true,
  cookie: {secure:false}
}))

// ======================= MIDDLEWARE ======================= //
app.use(express.json());
app.use(cors());
app.use(express.static("src"));

// ============================ START ======================= //
app.get('/', (req, res) => {
    res.send('Backend is running');
  });

// ======================= NEMOTRON TEST ======================= //
app.get('/chat', openAIAgent.chat);




// ======================= MONGODB CONNECTION ======================= //
mongoose.connect(process.env.MONGO_API_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// ======================= SERVER LISTENING ======================= //
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
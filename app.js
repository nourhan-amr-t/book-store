const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const  connectToDb  = require('./db');
const cors = require('cors');
const router = express.Router();
const bodyparser = require("body-parser")
const authRoutes = require('./routes/authRoutes');

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const cartRoutes = require('./routes/cartRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');


dotenv.config();



const app = express();
app.use(express.json());
const secretKey = require('crypto').randomBytes(32).toString('hex');

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}));



connectToDb(); // Invoke the connectToDb function

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use(express.json());          // accept data in json format
app.use(express.urlencoded());   //decode data from html form
app.use(express.static('front'));

app.get('/form',(req,res)=>{
 
    res.sendFile(__dirname + '/front/index.html')  

})


app.post('/form', (req,res)=>{

   console.log(req.body); // the data we get is in the body of request

      
})



// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/cart', cartRoutes);
app.use('/feedback', feedbackRoutes);

module.exports = app;

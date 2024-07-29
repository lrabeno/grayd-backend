import dotenv from 'dotenv';
import express from 'express';
import corsOptions from './config/corsOptions.js';
import cors from 'cors';
import router from './routes/api/routes.js';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials.js';
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3500;

// Connect to MongoDb using mongoose
connectDB();

app.get('/', (req, res) => {
  res.send('hello world');
});

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// handles urlencoded data, typically for forms.
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use('/api', router);

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message);
});

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB!');
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

//app.listen(PORT, () => console.log(`server running on port ${PORT}`));

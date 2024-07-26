import dotenv from 'dotenv';
import express from 'express';
import corsOptions from './config/corsOptions.js';
import cors from 'cors';
import employeeRouter from './routes/api/employees.js';
import registerRouter from './routes/api/register.js';
import authRouter from './routes/api/auth.js';
import refreshRouter from './routes/api/refresh.js';
import logOutRouter from './routes/api/logout.js';
import verifyJWT from './middleware/verifyJWT.js';
import cookieParser from 'cookie-parser';
import credentials from './middleware/credentials.js';
import mongoose from 'mongoose';
import connectDB from './config/dbConn.js';

dotenv.config();

// Connect to MongoDb using mongoose
connectDB();

const app = express();

const PORT = process.env.PORT || 3500;

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
app.use(cookieParser);

app.use('/register', registerRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logOutRouter);

//putting this line here will ensure the employees route needs a JWT to access
app.use(verifyJWT);
app.use('/employees', employeeRouter);
// app.get('/', (req, res) => {
//   res.send('hello world');
// });

/* 
Mongo stuff

mongodb+srv://lrabeno:r7WwrbrBJ6Sq7G3k@cluster0.u6k3g3d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
*/

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message);
});

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB!');
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

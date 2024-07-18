import express from 'express';
import corsOptions from './config/corsOptions.js';
import cors from 'cors';
import employeeRouter from './routes/api/employees.js';
import registerRouter from './routes/api/register.js';
import authRouter from './routes/api/auth.js';

const app = express();

const PORT = process.env.PORT || 3500;

app.use(cors(corsOptions));

// handles urlencoded data, typically for forms.
app.use(express.urlencoded({ extended: false }));

// built in middlewear for json
app.use(express.json());

app.use('/employees', employeeRouter);
app.use('/register', registerRouter);
app.use('/auth', authRouter);

// app.get('/', (req, res) => {
//   res.send('hello world');
// });

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

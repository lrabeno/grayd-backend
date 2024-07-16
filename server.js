import express from 'express';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3500;

// allows only requests from google and localhost.
const domainList = ['https://www.google.com', 'http://localhost:3500'];

const corsOptions = {
  origin: (origin, callback) => {
    if (domainList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Cors'));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// handles urlencoded data, typically for forms.
app.use(express.urlencoded({ extended: false }));

// built in middlewear for json
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

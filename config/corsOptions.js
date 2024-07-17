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

export default corsOptions;

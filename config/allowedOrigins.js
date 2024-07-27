// allows only requests from google and localhost.
const allowedOrigins = [
  'https://www.google.com',
  'http://localhost:3500',
  'http://localhost:3500/api/register',
  'http://localhost:8080',
  'http://localhost:3500/register',
  'http://localhost:3500/employees',
];

export default allowedOrigins;

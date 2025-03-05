const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://carslegitdemo.vercel.app',
    'https://carslegit-api-production.up.railway.app'
  ],
  credentials: true
}));

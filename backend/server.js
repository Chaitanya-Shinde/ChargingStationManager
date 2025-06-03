const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const stationRoutes = require('./routes/stations');
const authenticate = require('./middleware/authenticate');
const dbConnect = require('./utils/dbConnect.js')


dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your frontend port
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('server is running');
});

// Routes
app.use('/auth', authRoutes);
app.use('/stations', authenticate, stationRoutes);

(async () => {
  await dbConnect();
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
})();

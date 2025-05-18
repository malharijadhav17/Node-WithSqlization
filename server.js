const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');              // Import cors
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));  // Enable CORS for your frontend origin
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

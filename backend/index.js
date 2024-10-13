const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const linksRoutes = require('./routes/linksRoute');

// DB connection
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// root route
app.get('/', (_, res) => res.send('devlinks is live'));

// routes
app.use('/api', authRoutes);
app.use('/api', linksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening on port ' + PORT));

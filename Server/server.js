const express = require('express');
const db = require('./Config/db');
const cors = require('cors');
const blogRoutes = require('./Routes/blogRoutes');
const app = express();

// Middleware
app.use(cors());


app.use(express.json());
app.use('/api', blogRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
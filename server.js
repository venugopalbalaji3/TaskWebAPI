const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const config = require('./config/db')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();

mongoose.connect(config.mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
app.use(morgan('combined'))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:5173"]; 

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/user",require("./src/routes/authRoutes"))
app.use("/task",require("./src/routes/taskRoutes"))

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
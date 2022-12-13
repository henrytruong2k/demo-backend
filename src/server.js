const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const limiter = require("./config/rateLimit");
const speciesRoutes = require("./routes/species.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const corsConfig = require("./config/cors");
const morgan = require("morgan");
const redisClient = require('./config/redis');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// app.use(limiter);
app.use(cors(corsConfig));
app.use(morgan("dev"));
dotenv.config();
connectDB();

app.use("/api/fish", speciesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/", async (req, res) => {
  const value = await redisClient.get('key');
  return res.json({msg: value});
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const limiter = require("./config/rateLimit");
const speciesRoutes = require("./routes/species.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const corsConfig = require("./config/cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
// app.use(limiter);
app.use(cors(corsConfig));

dotenv.config();
connectDB();

app.use("/api/fish", speciesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

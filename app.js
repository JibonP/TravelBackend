const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const authController = require("./controllers/authControllers");
const destinationController = require("./controllers/destinationsController");
const reviewController = require("./controllers/reviewsController");
const userController = require("./controllers/userController");

app.use("/auth", authController);
app.use("/destinations", destinationController);
app.use("/reviews", reviewController);
app.use("/users", userController);
app.use(
  cors({
    origin: "https://comfy-pika-aaa273.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the Travel App");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found!");
});
app.get("/added-destinations", async (req, res) => {
  try {
    const addedDestinations = await fetchAddedDestinations();
    res.json(addedDestinations);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = app;

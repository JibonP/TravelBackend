const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../db/dbConfig");

const fetchAddedDestinations = async () => {
  try {
    // Replace this with your actual logic to fetch added destinations
    const addedDestinations = await db.any("SELECT * FROM added_destinations");
    return addedDestinations;
  } catch (error) {
    throw error;
  }
};

router.get("/", async (req, res) => {
  try {
    const destinations = await db.any("SELECT * FROM destinations");
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/added-destinations", async (req, res) => {
  try {
    const addedDestinations = await fetchAddedDestinations();
    res.json(addedDestinations);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add", async (req, res) => {
  const { name, location } = req.body;

  try {
    const unsplashApiKey = "wbltEtrsA8cyP3sF3qQO99ljKG-Imm1aaCkqUTxJl7U";
    const response = await axios.get(`https://api.unsplash.com/photos/random`, {
      params: {
        query: location,
        client_id: unsplashApiKey,
        orientation: "landscape",
      },
    });

    const imageUrl = response.data.urls.regular;

    const newDestination = await db.one(
      "INSERT INTO destinations (name, location, image_url) VALUES ($1, $2, $3) RETURNING *",
      [name, location, imageUrl]
    );

    res.json(newDestination);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:destinationId/edit", async (req, res) => {
  const destinationId = req.params.destinationId;
  const { name, location } = req.body;

  try {
    const updatedDestination = await db.one(
      "UPDATE destinations SET name = $1, location = $2 WHERE id = $3 RETURNING *",
      [name, location, destinationId]
    );

    res.json(updatedDestination);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:destinationId/delete", async (req, res) => {
  const destinationId = req.params.destinationId;

  try {
    await db.none("DELETE FROM destinations WHERE id = $1", [destinationId]);

    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

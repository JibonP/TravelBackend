const db = require("../db/dbConfig");

const Destination = {};

Destination.getAllDestinations = async () => {
  try {
    const destinations = await db.any("SELECT * FROM destinations");
    return destinations;
  } catch (error) {
    return error;
  }
};

Destination.addDestination = async (name, location, imageUrl) => {
  try {
    const newDestination = await db.one(
      "INSERT INTO destinations (name, location, image_url) VALUES ($1, $2, $3) RETURNING *",
      [name, location, imageUrl]
    );
    return newDestination;
  } catch (error) {
    return error;
  }
};

Destination.getDestinationById = async (id) => {
  try {
    const destination = await db.one(
      "SELECT * FROM destinations WHERE id = $1",
      id
    );
    return destination;
  } catch (error) {
    return error;
  }
};

Destination.fetchAddedDestinations = async () => {
  try {
    const addedDestinations = await db.any("SELECT * FROM added_destinations");
    return addedDestinations;
  } catch (error) {
    return error;
  }
};

Destination.updateDestination = async (id, name, location, imageUrl) => {
  try {
    const updatedDestination = await db.one(
      "UPDATE destinations SET name = $1, location = $2, image_url = $3 WHERE id = $4 RETURNING *",
      [name, location, imageUrl, id]
    );
    return updatedDestination;
  } catch (error) {
    return error;
  }
};

Destination.deleteDestination = async (id) => {
  try {
    const deletedDestination = await db.one(
      "DELETE FROM destinations WHERE id = $1 RETURNING *",
      id
    );
    return deletedDestination;
  } catch (error) {
    return error;
  }
};

module.exports = Destination;

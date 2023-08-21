DROP DATABASE IF EXISTS travel_dev;

CREATE DATABASE travel_dev;

\c travel_dev;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  reset_token VARCHAR(255),
  reset_token_expiration TIMESTAMP
);

CREATE TABLE destinations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  image_url TEXT
);

CREATE TABLE added_destinations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  image_url TEXT
);


CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  destination_id INTEGER REFERENCES destinations(id) ON DELETE CASCADE,
  content TEXT,
  rating INT
);

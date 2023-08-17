\c travel_dev;


INSERT INTO users (email, password, reset_token, reset_token_expiration) VALUES
  ('user@example.com', 'hashed_password_here', NULL, NULL);


INSERT INTO destinations (name, location) VALUES
  ('Paris', 'France'),
  ('Tokyo', 'Japan'),
  ('New York City', 'USA');


INSERT INTO reviews (user_id, destination_id, content, rating) VALUES
  (1, 1, 'Paris is a beautiful city with amazing architecture.', 5),
  (1, 2, 'Tokyo is a vibrant city with rich culture.', 4),
  (1, 3, 'New York City is the city that never sleeps.', 5);

\c travel_dev;


INSERT INTO users (email, password, reset_token, reset_token_expiration) VALUES
  ('user@example.com', 'hashed_password_here', NULL, NULL);


INSERT INTO destinations (name, location, image_url) VALUES
  ('Paris', 'France', 'https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900'),
  ('Tokyo', 'Japan', 'https://media.zenfs.com/en/huffpost_life_308/df35d2f4ee058bd6c5c4d71bdfdf991f'),
  ('New York City', 'USA', 'https://lp-cms-production.imgix.net/2020-09/500pxRF_100424161.jpg');


INSERT INTO reviews (user_id, destination_id, content, rating) VALUES
  (1, 1, 'Paris is a beautiful city with amazing architecture.', 5),
  (1, 2, 'Tokyo is a vibrant city with rich culture.', 4),
  (1, 3, 'New York City is the city that never sleeps.', 5);

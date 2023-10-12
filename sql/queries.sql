-- Select all users
SELECT * FROM shoe_catalog.users

-- Select all shoes
SELECT * FROM shoe_catalog.shoes

-- Select all shoe variants
SELECT * FROM shoe_catalog.stock st
JOIN shoe_catalog.shoes s ON s.shoe_id = st.shoe_id

-- Select all shoes with photos
SELECT * FROM shoe_catalog.shoes s
JOIN shoe_catalog.photos p ON p.shoe_id = s.shoe_id

-- Select all shoe variants with photos
SELECT * FROM shoe_catalog.stock st
JOIN shoe_catalog.shoes s ON s.shoe_id = st.shoe_id
JOIN shoe_catalog.photos p ON p.shoe_id = st.shoe_id AND p.color = st.color
ORDER BY item_id

-- Select colors
SELECT color FROM shoe_catalog.stock
GROUP BY color

-- Select sizes
SELECT size FROM shoe_catalog.stock
GROUP BY size

-- Decrement stock for a shoe variant
UPDATE shoe_catalog.stock
SET stock_count = stock_count - 1
WHERE item_id = ${item_id}
AND stock_count > 0

-- Add a shoe model
INSERT INTO shoe_catalog.shoes (brand, model, price) VALUES ('Adidas', 'Breaknet 2.0', 1099);

-- Add a shoe variant
INSERT INTO shoe_catalog.stock (shoe_id, color, size, stock_count) VALUES (1000, 'Black', 9, 10);

-- Add a shoe photo
INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url) VALUES (1000, 'Black', 'https://i.ibb.co/3S1WwKj/adidas-breaknet2-blackwhite.webp');
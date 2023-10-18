DROP TABLE IF EXISTS shoe_catalog.cart_items;
DROP TABLE IF EXISTS shoe_catalog.carts;
DROP TABLE IF EXISTS shoe_catalog.users;
DROP TABLE IF EXISTS shoe_catalog.photos;
DROP TABLE IF EXISTS shoe_catalog.stock;
DROP TABLE IF EXISTS shoe_catalog.shoes;

CREATE TABLE shoe_catalog.shoes (
    shoe_id SERIAL PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    price INT NOT NULL,
	sold INT NOT NULL DEFAULT 0,
	CONSTRAINT shoe_name UNIQUE (brand, model)
);

CREATE TABLE shoe_catalog.stock (
	item_id SERIAL PRIMARY KEY,
	shoe_id INT REFERENCES shoe_catalog.shoes(shoe_id) ON DELETE CASCADE,
	color VARCHAR(255) NOT NULL,
	size INT NOT NULL,
	stock_count INT NOT NULL,
	CONSTRAINT shoe_variant UNIQUE (shoe_id, color, size)
);

CREATE TABLE shoe_catalog.photos (
	shoe_id INT REFERENCES shoe_catalog.shoes(shoe_id) ON DELETE CASCADE,
    color VARCHAR(255) NOT NULL,
	photo_url TEXT UNIQUE NOT NULL,
	CONSTRAINT shoe_color UNIQUE (shoe_id, color)
);

CREATE TABLE shoe_catalog.users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL UNIQUE,
	full_name VARCHAR(255) NOT NULL,
	password VARCHAR(60) NOT NULL
);

CREATE TABLE shoe_catalog.carts (
	cart_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES shoe_catalog.users(user_id) ON DELETE CASCADE,
	paid BOOLEAN DEFAULT false,
	CONSTRAINT current_cart UNIQUE (user_id, paid)
);

CREATE TABLE shoe_catalog.cart_items (
	cart_id INT NOT NULL REFERENCES shoe_catalog.carts(cart_id) ON DELETE CASCADE,
	item_id INT NOT NULL REFERENCES shoe_catalog.stock(item_id) ON DELETE CASCADE,
	item_count INT NOT NULL DEFAULT 0
);

ALTER SEQUENCE shoe_catalog.shoes_shoe_id_seq RESTART WITH 1000;
ALTER SEQUENCE shoe_catalog.stock_item_id_seq RESTART WITH 1000;
ALTER SEQUENCE shoe_catalog.carts_cart_id_seq RESTART WITH 1000;
ALTER SEQUENCE shoe_catalog.users_user_id_seq RESTART WITH 1000;

-- ADD SHOES
-- Step 1: Add a shoe brand and model name
INSERT INTO shoe_catalog.shoes (brand, model, price) VALUES ('Adidas', 'Breaknet 2.0', 1099); -- returns shoe_id (1000)
-- Step 2: Add size color variants
INSERT INTO shoe_catalog.stock (shoe_id, color, size, stock_count)
VALUES
	(1000, 'Black', 6, 11), -- use returned shoe_id (1000)
	(1000, 'Black', 7, 12),
	(1000, 'Black', 8, 9);
-- Step 3: Add photo url for first color variant
-- INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url) VALUES (1000, 'Black', 'https://i.ibb.co/3S1WwKj/adidas-breaknet2-blackwhite.webp'); -- use returned shoe_id (1000)
INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url) VALUES (1000, 'Black', '/assets/images/shoes/adidas-breaknet2-blackwhite.png'); -- use returned shoe_id (1000)
-- Repeat Steps 2-3 for different color variants
INSERT INTO shoe_catalog.stock (shoe_id, color, size, stock_count)
VALUES
	(1000, 'White', 6, 5),
	(1000, 'White', 7, 11),
	(1000, 'White', 8, 4),
	(1000, 'White', 9, 2);
-- INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url) VALUES (1000, 'White', 'https://i.ibb.co/JnxgLWL/adidas-breaknet2-whitebluered.webp');
INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url) VALUES (1000, 'White', '/assets/images/shoes/adidas-breaknet2-whitebluered.png');

-- Repeat Steps 1-3 for different shoes
INSERT INTO shoe_catalog.shoes (brand, model, price) VALUES ('Nike', 'Air Max 90', 2499);
INSERT INTO shoe_catalog.stock (shoe_id, color, size, stock_count)
VALUES
	(1001, 'Black', 4, 3),
	(1001, 'Black', 5, 5),
	(1001, 'Black', 6, 4),
	(1001, 'Black', 7, 7),
	(1001, 'Black', 8, 5),
	(1001, 'Black', 9, 2),
	(1001, 'Black', 10, 4),
	(1001, 'Black', 11, 2);
-- INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url) VALUES (1001, 'Black', 'https://i.ibb.co/hBkjfd7/nike-airmax90-black.webp');
INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url) VALUES (1001, 'Black', '/assets/images/shoes/nike-airmax90-black.png');

-- ADD USERS AND CARTS
-- Step 1: Create user account
INSERT INTO shoe_catalog.users (username, full_name, password) VALUES ('ntruter42', 'Nicholas Truter', '$2b$10$cxK.emL.AHc7XzMf5fVaTe5gFjNblOowr71YC.qFN4UJvZ902VKzG'); -- pw = 'codex123123'
-- Step 2: Create cart (after user clicks add to cart, if non-paid cart for user_id doesn't exist)
INSERT INTO shoe_catalog.carts (user_id, paid) VALUES (1000, false);
-- Step 3: Add items to cart
INSERT INTO shoe_catalog.cart_items (cart_id, item_id, item_count) VALUES (1000, 1006, 1); -- use returned cart_id (1000), use inserted item_id (1000)
INSERT INTO shoe_catalog.cart_items (cart_id, item_id, item_count) VALUES (1000, 1012, 1);
-- Step 4: Pay for cart
UPDATE shoe_catalog.carts SET paid = true WHERE user_id = 1000;
-- Repeat Steps 2-4 after user pays for cart
INSERT INTO shoe_catalog.carts (user_id, paid) VALUES (1000, false);

-- Repeat Steps 1-4 for different user
INSERT INTO shoe_catalog.users (username, full_name, password) VALUES ('emusk69', 'Elon Musk', '$2b$10$aTEFSH3iQnefKPT9L3cOFuiEYyzcaKqh9JsiQElcjB2d.Uyrdhu96'); -- pw = 'tesla123'
INSERT INTO shoe_catalog.carts (user_id, paid) VALUES (1001, false);
INSERT INTO shoe_catalog.cart_items (cart_id, item_id, item_count) VALUES (1002, 1014, 1);




-- https://ibb.co/Mcb4612 - https://i.ibb.co/hBkjfd7/nike-airmax90-black.webp
-- https://ibb.co/WBnFQCM - https://i.ibb.co/3S1WwKj/adidas-breaknet2-blackwhite.webp
-- https://ibb.co/rkbNPKP - https://i.ibb.co/JnxgLWL/adidas-breaknet2-whitebluered.webp
-- https://ibb.co/8zJphJP - https://i.ibb.co/DGNyqNw/ua-mircogvalsetz-black.webp
-- https://ibb.co/BnVdv39 - https://i.ibb.co/g4MHQ9x/ua-mircogvalsetz-gold.webp
-- https://ibb.co/yXTVgVM - https://i.ibb.co/JKLCrCb/ua-assert9-blackwhite.webp
-- https://ibb.co/88cDVCz - https://i.ibb.co/SvrXpjQ/nike-gripknit-phantom-gx-blackred.webp
-- https://ibb.co/Bfj5SLC - https://i.ibb.co/2FP1fqk/nike-gripknit-phantom-gx-blackwhite.webp
-- https://ibb.co/wsRfJMD - https://i.ibb.co/ySXrhWL/nike-gripknit-phantom-gx-G/Orangeorange.webp
-- https://ibb.co/y896F6T - https://i.ibb.co/D7J9f9X/nb-650-whiteblack.webp
-- https://ibb.co/CJgcpMX - https://i.ibb.co/Gsy6ft1/nb-650-whiteblue.webp
-- https://ibb.co/X7Vctyy - https://i.ibb.co/QPXyM88/nb-650-whitered.webp

-- https://ibb.co/LZy8m42 - https://i.ibb.co/jrYTm71/nb-650v2-blackred.webp
-- https://ibb.co/Vjzn98n - https://i.ibb.co/4mXvtxv/nb-650v2-whiteblack.webp
-- https://ibb.co/mcyXqVq - https://i.ibb.co/yQkYycy/nb-650v2-whiteblue.webp
-- https://ibb.co/ZVxbsMd - https://i.ibb.co/W6fR92n/nb-650v2-whiteyellow.webp

INSERT INTO shoe_catalog.shoes (brand, model, price)
VALUES
	('Under Armour', 'Micro G Valsetz', 2899),
	('Under Armour', 'Assert 9', 999),
	('Nike', 'Gripknit Phantom GX', 5799),
	('New Balance', '650', 2899),
	('New Balance', '650 v2', 2799);

INSERT INTO shoe_catalog.stock (shoe_id, color, size, stock_count)
VALUES
	(1002, 'Black', 9, 2),
	(1002, 'Black', 10, 3),
	(1002, 'Black', 11, 1),
	(1002, 'Gold', 9, 2),
	(1002, 'Gold', 11, 1),

	(1003, 'Black', 6, 13),
	(1003, 'Black', 7, 9),
	(1003, 'Black', 8, 7),
	(1003, 'Black', 9, 10),

	(1004, 'Black', 6, 1),
	(1004, 'Black', 7, 1),
	(1004, 'Black', 8, 1),
	(1004, 'Black', 9, 1),
	(1004, 'Red', 6, 1),
	(1004, 'Red', 7, 2),
	(1004, 'Red', 8, 2),
	(1004, 'Green-Orange', 6, 1),
	(1004, 'Green-Orange', 8, 2),
	(1004, 'Green-Orange', 9, 1),

	(1005, 'Black-White', 7, 8),
	(1005, 'Black-White', 10, 2),
	(1005, 'Blue', 7, 7),
	(1005, 'Blue', 8, 2),
	(1005, 'Blue', 9, 4),
	(1005, 'Blue', 10, 2),
	(1005, 'Red', 7, 1),
	(1005, 'Red', 8, 3),

	(1006, 'White-Black', 5, 2),
	(1006, 'White-Black', 6, 5),
	(1006, 'White-Black', 8, 2),
	(1006, 'White-Black', 9, 7),
	(1006, 'White-Blue', 5, 2),
	(1006, 'White-Blue', 6, 6),
	(1006, 'White-Blue', 7, 2),
	(1006, 'White-Blue', 8, 3),
	(1006, 'White-Yellow', 6, 7),
	(1006, 'White-Yellow', 8, 5),
	(1006, 'Black-Red', 5, 3),
	(1006, 'Black-Red', 6, 3),
	(1006, 'Black-Red', 7, 3),
	(1006, 'Black-Red', 8, 2),
	(1006, 'Black-Red', 9, 6);

INSERT INTO shoe_catalog.photos (shoe_id, color, photo_url)
VALUES
	(1002, 'Black', 'https://i.ibb.co/DGNyqNw/ua-mircogvalsetz-black.webp'),
	(1002, 'Gold', 'https://i.ibb.co/g4MHQ9x/ua-mircogvalsetz-gold.webp'),

	(1003, 'Black', 'https://i.ibb.co/JKLCrCb/ua-assert9-blackwhite.webp'),

	(1004, 'Black', 'https://i.ibb.co/2FP1fqk/nike-gripknit-phantom-gx-blackwhite.webp'),
	(1004, 'Red', 'https://i.ibb.co/SvrXpjQ/nike-gripknit-phantom-gx-blackred.webp'),
	(1004, 'Green-Orange', 'https://i.ibb.co/ySXrhWL/nike-gripknit-phantom-gx-orange.webp'),

	(1005, 'Black-White', 'https://i.ibb.co/D7J9f9X/nb-650-whiteblack.webp'),
	(1005, 'Blue', 'https://i.ibb.co/Gsy6ft1/nb-650-whiteblue.webp'),
	(1005, 'Red', 'https://i.ibb.co/QPXyM88/nb-650-whitered.webp'),

	(1006, 'White-Black', 'https://i.ibb.co/4mXvtxv/nb-650v2-whiteblack.webp'),
	(1006, 'White-Blue', 'https://i.ibb.co/yQkYycy/nb-650v2-whiteblue.webp'),
	(1006, 'White-Yellow', 'https://i.ibb.co/W6fR92n/nb-650v2-whiteyellow.webp'),
	(1006, 'Black-Red', 'https://i.ibb.co/jrYTm71/nb-650v2-blackred.webp');

	-- (1002, 'Black', '/assets/images/shoes/ua-mircogvalsetz-black.png'),
	-- (1002, 'Gold', '/assets/images/shoes/ua-mircogvalsetz-gold.png'),

	-- (1003, 'Black', '/assets/images/shoes/ua-assert9-blackwhite.png'),

	-- (1004, 'Black', '/assets/images/shoes/nike-gripknit-phantom-gx-blackwhite.png'),
	-- (1004, 'Red', '/assets/images/shoes/nike-gripknit-phantom-gx-blackred.png'),
	-- (1004, 'Green-Orange', '/assets/images/shoes/nike-gripknit-phantom-gx-greenorange.png'),

	-- (1005, 'Black-White', '/assets/images/shoes/nb-650-whiteblack.png'),
	-- (1005, 'Blue', '/assets/images/shoes/nb-650-whiteblue.png'),
	-- (1005, 'Red', '/assets/images/shoes/nb-650-whitered.png'),

	-- (1006, 'White-Black', '/assets/images/shoes/nb-650v2-whiteblack.png'),
	-- (1006, 'White-Blue', '/assets/images/shoes/nb-650v2-whiteblue.png'),
	-- (1006, 'White-Yellow', '/assets/images/shoes/nb-650v2-whiteyellow.png'),
	-- (1006, 'Black-Red', '/assets/images/shoes/nb-650v2-blackred.png');

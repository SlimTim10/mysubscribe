DROP DATABASE IF EXISTS mysubscribedb;
CREATE DATABASE mysubscribedb;

\connect mysubscribedb;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	user_name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE subscriptions (
	subscription_id SERIAL PRIMARY KEY,
	url VARCHAR UNIQUE NOT NULL
);

CREATE TABLE directory (
	user_id SERIAL REFERENCES users (user_id),
	subscription_id SERIAL REFERENCES subscriptions (subscription_id),
	PRIMARY KEY (user_id, subscription_id)
);

INSERT INTO users (user_id, user_name)
VALUES (DEFAULT, 'Test');

INSERT INTO subscriptions (subscription_id, url)
VALUES (DEFAULT, 'http://www.google.ca');

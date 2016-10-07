DROP DATABASE IF EXISTS mysubscribedb;
CREATE DATABASE mysubscribedb;

\connect mysubscribedb;

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE subscriptions (
	subscription_id SERIAL PRIMARY KEY,
	name VARCHAR UNIQUE NOT NULL,
	url VARCHAR UNIQUE NOT NULL
);

CREATE TABLE directories (
	user_id SERIAL REFERENCES users (user_id),
	subscription_id SERIAL REFERENCES subscriptions (subscription_id),
	PRIMARY KEY (user_id, subscription_id)
);

INSERT INTO users (user_id, name)
VALUES (DEFAULT, 'Test');

INSERT INTO subscriptions (subscription_id, name, url)
VALUES (DEFAULT, 'Google', 'http://www.google.ca');

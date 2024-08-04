CREATE TABLE all_users (
	id SERIAL PRIMARY KEY,
	name TEXT,
	color TEXT,
);

CREATE TABLE all_users_visited_countries (
	id SERIAL PRIMARY KEY,
	country_code CHAR (2),
	user_id INTEGER REFERENCES all_users (id)
);

INSERT INTO all_users (name, color)
VALUES ('Sagnik', 'teal'), ('Bipasha', 'violet');

INSERT INTO all_users_visited_countries (country_code, user_id)
VALUES 
    ('CA', 2),
    ('ES', 1),
    ('IN', 2),
    ('AU', 2),
    ('US', 1),
    ('EG', 1),
    ('GB', 2);


SELECT id, country_code FROM all_users_visited_countries
WHERE user_id = 1;

INSERT INTO all_users (name, color)
VALUES ('Adrita', 'yellow')
RETURNING id;

INSERT INTO all_users_visited_countries (country_code, user_id)
VALUES ('CA', 2)
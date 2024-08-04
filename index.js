import bodyParser from "body-parser";
import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client ({
    user: 'postgres',
    database: 'World',
    host: 'localhost',
    password: 'Kingas@123',
    port: '5432'
});

db.connect();

app.use (express.static ('public'));
app.use (bodyParser.urlencoded ({ extended: true }));

// let countries = ['ES', 'US', 'EG'];  
// let users = [];
let currentUser = 1;

const getUsers = async () => {
    const usersResult = await db.query ('SELECT * FROM all_users');
    // console.log (usersResult.rows);

    return usersResult.rows;
}

const getCountries = async (userId) => {
    const countriesResult = await db.query ('SELECT id, country_code FROM all_users_visited_countries WHERE user_id = $1;', [userId]);

    let countries = [];
    countriesResult.rows.forEach ((country) => {
        countries.push (country.country_code)
    });

    return countries;
}


app.get ('/', async (req, res) => {
    const users = await getUsers();
    // console.log (users);

    const userId = currentUser;
    const user = users.find ((user) => user.id == userId);
    // console.log (user);

    const countries = await getCountries (userId);
    // console.log (countries);

    const error = req.query.error;
    let errorMessage;
    if (error == 'country_exists') {
        errorMessage = "Country already exists! Try Again!";
    }
    else if (error == 'no_such_country') {
        errorMessage = "Invalid Input! No such country exists! Try Again!"
    }

    res.render ('index.ejs', {
        users: users,
        countries: countries,
        total: countries.length,
        color: user.color,
        error: errorMessage
    });
})

app.post ('/user', async (req, res) => {
    const users = await getUsers();
    // console.log (users);

    if (req.body.add) {
        // console.log (req.body.add);
        res.redirect ('/new-user');
    }
    else {
        const userId = req.body.user;
        currentUser = userId;
        // console.log (req.body);
        const user = users.find ((user) => user.id == userId);
        // console.log (userId);
    
        const countries = await getCountries (userId);
        // console.log (countries);
    
        res.render ('index.ejs', {
            users: users,
            countries: countries,
            total: countries.length,
            color: user.color
        });
    }
})

app.get ('/new-user', (req, res) => {
    res.render ('new.ejs');
})

app.post ('/new', async (req, res) => {
    // console.log (req.body);

    const userName = req.body.name;
    let userColor;
    if (req.body.color) {
        userColor = req.body.color;
    }
    else {
        userColor = "pink";
    }

    // console.log (userName);
    // console.log (userColor);

    const response = await db.query ('INSERT INTO all_users (name, color) VALUES ($1, $2) RETURNING id;', [userName, userColor]);
    console.log (response.rows);

    currentUser = response.rows[0].id;

    res.redirect ('/');
})

app.post ('/add', async (req, res) => {
    // console.log (req.body);
    // console.log (currentUser);

    const input = req.body.country;

    console.log (input, currentUser);   

    const response = await db.query ('SELECT * FROM countries_list WHERE LOWER(country_name) LIKE $1', [input.toLowerCase()]);
    // console.log (response.rows);

    if (response.rows.length !== 0) {
        const code = response.rows[0].country_code;

        try {
            const result = await db.query ('INSERT INTO all_users_visited_countries (country_code, user_id) VALUES ($1, $2) RETURNING *', [code, currentUser]);
    
            console.log (result.rows);
            res.redirect ('/');
        }
        catch (err) {
            res.redirect ('/?error=country_exists');
        }
    }
    else {
        res.redirect ('/?error=no_such_country');
    }

})

app.listen (port, () => {
    console.log (`Server running successfully on port ${port}`);
})
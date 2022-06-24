require('dotenv').config();

const express = require('express');
const session = require('express-session');
const api = require('./routers');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Возможность получать реквесты с фронта
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET'],
    credentials: true
}));

const {Client} = require('pg');
const conObject = {
    user: 'esoft_project',
    database: 'esoft_project',
    password: 'esoft'
};

const client = new Client(conObject);
client.connect();

// Создаю стору
const PgStore = new (require('connect-pg-simple')(session))({
    conObject,
});

// Создаю сессию
app.use(session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: true,
    store: PgStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

require('./configs/passport');

app.use('/api', api);
app.get('/login', (req, res) => {
    res.render('login');
});
app.post('/login', passport.authenticate('local', {successRedirect: '/api/users'}));

app.get('/', (req, res) => {
    res.sendStatus(200);
})

// app.post('/login', passport.authenticate('local', {successRedirect: 'http://localhost:3000/profile'}))

app.listen(8080);
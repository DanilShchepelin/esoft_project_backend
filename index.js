require('dotenv').config();

const express = require('express');
const session = require('express-session');
const api = require('./routers');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Возможность получать реквесты с фронта
app.use(cors({
    origin: 'http://localhost:9000',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
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
    unset: 'destroy',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use('/api', api);
// app.get('/login', (req, res) => {
//     res.render('login');
// });

app.get('/', (req, res) => {
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log('user connected ', socket.id);

    socket.on('send message', (data) => {
        socket.emit('receive message', data)
        console.log(data);
    })
})

server.listen(8081);


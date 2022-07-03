const knex = require('knex');
const config = require('../configs');
const session = require('express-session');

module.exports = {
    getUser: async (req, res) => {
        const {email, password} = req.body;
        const db = knex(config.development.database);

        if (email == null && password == null) {
            return console.log('enter email and password');
        }

        const user = await db
            .first({
                id: 'users.id',
                name: 'users.name',
                lastName: 'users.last_name',
                status: 'users.status',
                role: 'users.role',
                email: 'usersData.email',
                password: 'usersData.password'
            })
            .from({users: 'users'})
            .leftJoin({usersData : 'users_data'}, {'users.id': 'usersData.user_id'})
            .where({email: email});

        const userPassword = user.password;
        if (userPassword !== password) {
            return console.log('incorrect password');
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            status: user.status,
            role: user.role
        };

        // res.status(200);
        // return res.json({user: req.session.user});
        if (req.sessionID && req.session.user) {
            res.status(200);
            const sessionID = req.sessionID;
            return res.json({sessionID, sessionID});
            // return req.sessionID;
        }
        return res.sendStatus(400);
    },
    addUser: async (req, res) => {
        const {name, lastName, dateOfBirth, email, password} = req.body;
        const db = knex(config.development.database);

        if (
            name.length === 0 || 
            lastName.length === 0 || 
            dateOfBirth.length === 0 || 
            email.length === 0 || 
            password.length === 0
        ) {
            res.sendStatus(400);
            return;
        }

        const [{id: userId}] = await db
            .into('users')
            .insert({
                name,
                last_name: lastName,
                date_of_birth: dateOfBirth,
            })
            .returning('id');

        await db
            .insert({
                user_id: userId,
                email,
                password
            })
            .into('users_data')

        res.sendStatus(200);
    },
    logoutUser: async (req, res) => {
        await req.session.destroy();
        console.log('logout');
        return res.sendStatus(200);
    },
    currentUser: async (req, res) => {
        if (req.sessionID && req.session.user) {
            res.status(200);
            return res.json({user: req.session.user.id})
            // return req.session.user;
        }
        return res.sendStatus(400);
    }
}
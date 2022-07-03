const knex = require('knex');
const config = require('../configs');
const session = require('express-session');

module.exports = {
    getUsers: async (req, res) => {
        const db = knex(config.development.database);

        const users = await db
            .select({
                id: 'users.id',
                name: 'users.name',
                lastName: 'users.last_name',
                dateOfBirth: 'users.date_of_birth',
                status: 'users.status',
                role: 'users.role',
                email: 'usersData.email',
                password: 'usersData.password'
            })
            .from({users: 'users'})
            .leftJoin({usersData : 'users_data'}, {'users.id': 'usersData.user_id'})
            .orderBy('id');

        res.json(users);
    },
    getUser: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;

        const user = await db
            .select({
                id: 'id',
                name: 'name',
                lastName: 'last_name',
                dateOfBirth: 'date_of_birth'
            })
            .from('users')
            .where({id: userId});

        res.json(user);
    }
}
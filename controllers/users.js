const knex = require('knex');
const config = require('../configs');
const session = require('express-session');

module.exports = {
    getUsers: async (req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;

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
            .where({'users.status': 'active'})
            .andWhere(function(){
                this
                    .where('users.id', '!=', userId)
            })
            .orderBy('id');

        res.json({users: users});
    },
    getUser: async(req, res) => {
        const db = knex(config.development.database);
        const userId= req.session.user.id;

        const user = await db
            .first({
                id: 'id',
                name: 'name',
                lastName: 'last_name',
                dateOfBirth: 'date_of_birth',
                role: 'role'
            })
            .from('users')
            .where({id: userId});

        res.json({user, user});
    },
    updateUser: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;
        const {name, lastName} = req.body;

        await db
            .update({
                'name': name,
                'last_name': lastName
            })
            .from('users')
            .where({'id': userId});

        res.sendStatus(200);
    },
    deleteUser: async(req, res) => {
        const db = knex(config.development.database);
        const {userId} = req.params;

        await db
            .update({
                status: 'blocked',
            })
            .from('users')
            .where({'id': userId});

        res.sendStatus(200);
    }
}
const knex = require('knex');
const config = require('../configs');

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

        res.json(users)
    },
}
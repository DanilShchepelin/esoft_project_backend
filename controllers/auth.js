const knex = require('knex');
const config = require('../configs');

module.exports = {


    getUser: async (req, res) => {
        // const {email} = req.body;
        const db = knex(config.development.database);

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
        .where({'email': req.body.email});

        res.json(user);
    }
}
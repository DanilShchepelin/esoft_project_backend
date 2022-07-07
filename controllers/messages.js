const knex = require('knex');
const config = require('../configs');
const session = require('express-session');

module.exports = {
    getDialogs: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;
        const userTwoId = req.param;

        const dialogs = await db
            .select({
                id: 'chats.id',
                name: 'chats.name'
            })
            .from({chats: 'chats'})
            .leftJoin({groups: 'groups'}, {'chats.id': 'groups.chat_id'})
            .where({'groups.user_id': userTwoId});

        res.json(dialogs);
    },
    getMessages: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;

        const messages = await db
            .select({
                id: 'id',
                userId: 'user_id',
                text: 'text',
                createdAt: 'created_at',
                status: 'status',
                chatId: 'chat_id'
            })
            .from('messages')
     }
}
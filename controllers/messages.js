const knex = require('knex');
const config = require('../configs');
const session = require('express-session');

module.exports = {
    getDialogs: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;

        const dialogs = await db
            .select({
                id: 'chats.id',
                userTwoName: 'user2.name',
                userTwoId: 'user2.id'
            })
            .from({chats: 'chats'})
            .join({user2: 'users'}, function() {
                this
                    .on('user2.id', '=', 'chats.user_one')
                    .andOn('chats.user_one', '!=', userId)
                    .orOn('user2.id', '=', 'chats.user_two')
                    .andOn('chats.user_two', '!=', userId)
                    
            })
            .where({'chats.user_one': userId},)
            .orWhere({'chats.user_two': userId});

        res.json({dialogs: dialogs});
    },
    getDialog: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;
        const {userTwoId} = req.params;

        const dialog = await db
            .first({
                id: 'chats.id'
                // userOne: 'user_one',
                // userTwo: 'user_two'
            })
            .from('chats')
            .where(function(){
                this
                    .where('user_one', '=', userId)
                    .andWhere('user_two', '=', userTwoId)
            })
            .orWhere(function() {
                this
                    .where('user_one', '=', userTwoId)
                    .andWhere('user_two', '=', userId)
            });

        res.json({dialog: dialog});
    },
    getMessages: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;
        const {userTwoId} = req.params;

        const [{chatId}] = await db
            .select({
                chatId: 'id'
            })
            .from('chats')
            .where({
                'user_one': userId,
                'user_two': userTwoId
            })
            .orWhere({
                'user_one': userTwoId,
                'user_two': userId
            });

        const messages = await db
            .select({
                id: 'messages.id',
                text: 'messages.text',
                userName: 'users.name',
                createdAt: 'messages.created_at',
                status: 'messages.status',
            })
            .from({messages: 'messages'})
            .leftJoin({users: 'users'}, {'users.id': 'messages.user_id'})
            .where({'messages.chat_id': chatId});

        res.json({messages: messages});
    },
    createChat: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;
        const {userTwoId} = req.params;

        await db
            .insert({
                'user_one': userId,
                'user_two': userTwoId
            })
            .into('chats');

        res.sendStatus(200);
    },
    addMessage: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;
        const {text} = req.body;
        const {userTwoId} = req.params;

        const [{chatId}] = await db
            .select({
                chatId: 'id'
            })
            .from('chats')
            .where({
                'user_one': userId
            })
            .andWhere({
                'user_two': userTwoId
            })
            .orWhere({
                'user_one': userTwoId
            })
            .andWhere({
                'user_two': userId
            });
        
        await db
            .insert({
                user_id: userId,
                text,
                chat_id: chatId
            })
            .into('messages');

        res.sendStatus(200);
    }
}
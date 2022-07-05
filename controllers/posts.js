const knex = require('knex');
const config = require('../configs');
const session = require('express-session');

module.exports = {
    getPosts: async (req, res) => {
        const db = knex(config.development.database);

        const posts = await db
            .select({
                id: 'posts.id',
                name: 'users.name',
                lastName: 'users.last_name',
                text: 'posts.text',
                createdAt: 'posts.created_at',
                status: 'posts.status'
            })
            .from({posts: 'posts'})
            .leftJoin({users: 'users'}, {'posts.user_id': 'users.id'})
            .orderBy('createdAt', 'desc')
            .where({status: 'active'});
        
        res.json(posts);
    },
    getPost: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;

        const post = await db
            .select({
                id: 'posts.id',
                name: 'users.name',
                lastName: 'users.last_name',
                text: 'posts.text',
                createdAt: 'posts.created_at',
            })
            .from({posts: 'posts'})
            .leftJoin({users: 'users'}, {'posts.user_id': 'users.id'})
            .orderBy('createdAt', 'desc')
            .where({'posts.user_id': userId});

        res.json({post: post});
    },
    deletePost: async(req, res) => {
        const db = knex(config.development.database);
        const {postID} = req.params;

        await db
            .update({
                status: 'deleted',
                updated_at: new Date().toISOString() 
            })
            .from('posts')
            .where({id: postID});

        res.sendStatus(200);
    },
    createPost: async(req, res) => {
        const db = knex(config.development.database);
        const userId = req.session.user.id;
        const {text} = req.body;

        if (text.length == 0){
            res.sendStatus(400);
            return;
        }

        await db
            .insert({
                text,
                user_id: userId,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
            .into('posts');

        res.json(text);
    }
}
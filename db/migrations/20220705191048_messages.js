/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
    await knex.schema.createTable('chats', (table) => {
        table
            .increments('id')
            .primary()
            .comment('Идентификатор');
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .comment('Идентификатор пользователя создавшего чат');
        table
            .string('name', 64)
            .comment('Название чата');
        table.comment('Чаты');
    });
    await knex.schema.createTable('messages', (table) => {
        table
            .increments('id')
            .primary()
            .comment('Идентификатор');
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .comment('Идентификатор пользователя');
        table
            .string('text')
            .notNullable()
            .comment('Текст сообщения');
        table
            .timestamp('created_at', {useTz: false})
            .notNullable()
            .defaultTo(knex.fn.now())
            .comment('Дата создания сообщения');
        table
            .string('status', 64)
            .notNullable()
            .defaultTo('active')
            .comment('Статус сообщения');
        table
            .integer('chat_id')
            .notNullable()
            .references('id')
            .inTable('chats')
            .comment('Идентификатор чата');
        table.comment('Сообщения');
    });
    await knex.schema.createTable('groups', (table) => {
        table
            .integer('chat_id')
            .notNullable()
            .references('id')
            .inTable('chats')
            .comment('Идентификатор чата');
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .comment('Идентификатор пользователя');
        table.comment('Группы');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
    await knex.schema.dropTable('messages');
    await knex.schema.dropTable('chats');
    await knex.schema.dropTable('groups');
};

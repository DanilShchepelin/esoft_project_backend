/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
    await knex.schema.createTable('posts', (table) => {
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
            .comment('Текст поста');
        table
            .string('status', 64)
            .notNullable()
            .defaultTo('active')
            .comment('Статус');
        table
            .timestamp('created_at', {useTz: false})
            .notNullable()
            .defaultTo(knex.fn.now())
            .comment('Дата создания');
        table
            .timestamp('updated_at', {useTz: false})
            .nullable()
            .comment('Дата обновления');
        table.comment('Посты');
    });
    await knex.schema.createTable('posts_photos', (table) => {
        table
            .integer('post_id')
            .notNullable()
            .references('id')
            .inTable('posts')
            .comment('Идентификатор поста');
        table
            .string('photo_url')
            .comment('Путь к фото');
        table.comment('Фото к постам');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
    await knex.schema.dropTable('posts');
    await knex.schema.dropTable('posts_photos');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async(knex) => {
  await knex.schema.createTable('users', (table) => {
    table
        .increments('id')
        .primary()
        .comment('Идентификатор');
    table
        .string('name', 256)
        .notNullable()
        .comment('Имя');
    table
        .string('last_name', 256)
        .notNullable()
        .comment('Фамилия');
    table
        .date('date_of_birth')
        .nullable()
        .comment('Дата рождения');
    table
        .string('status', 64)
        .notNullable()
        .defaultTo('active')
        .comment('Статус');
    table
        .string('role', 64)
        .notNullable()
        .defaultTo('user');
    table
        .string('avatar_url')
        .nullable()
        .comment('Аватар');
    table.comment('Пользователи');
  });
  await knex.schema.createTable('users_data', (table) => {
    table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .comment('Идетификатор пользователя');
    table
        .string('email', 256)
        .notNullable()
        .unique()
        .comment('Почта');
    table
        .string('password')
        .notNullable()
        .comment('Пароль');
    table.comment('Данные пользователей');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async(knex) => {
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('users_data');
};

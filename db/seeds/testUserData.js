/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users_data').del()
  await knex('users_data').insert([
    {
      user_id: 1,
      email: 'test@gmail.com',
      password: 'password'
    },
    {
      user_id: 2,
      email: 'test2@gmail.com',
      password: 'password2'
    },
    {
      user_id: 3,
      email: 'test3@gmail.com',
      password: 'password3'
    },
  ]);
};

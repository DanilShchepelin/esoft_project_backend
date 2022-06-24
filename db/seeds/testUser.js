/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Test',
      last_name: 'User',
      date_of_birth: '1999-02-27',
      status: 'active',
      role: 'admin',
      avatar_url: null
    },
    {
      name: 'Test',
      last_name: 'User2',
      date_of_birth: '2000-03-25',
      status: 'active',
      role: 'user',
      avatar_url: null
    },
    {
      name: 'Test',
      last_name: 'User',
      date_of_birth: '1998-07-30',
      status: 'active',
      role: 'user',
      avatar_url: null
    },
  ]);
};

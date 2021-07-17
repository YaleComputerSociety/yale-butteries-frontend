'use strict'

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          netid: 'jd1234',
          position_id: 1,
          college_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Jane Smith',
          netid: 'js1234',
          position_id: 1,
          college_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'First Last',
          netid: 'fl1823',
          position_id: 1,
          college_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Tom Cruise',
          netid: 'tc1023',
          position_id: 1,
          college_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Robert Cup',
          netid: 'rc2104',
          position_id: 1,
          college_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Enrique De La Cruz',
          netid: 'dc1922',
          position_id: 2,
          college_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  },
}

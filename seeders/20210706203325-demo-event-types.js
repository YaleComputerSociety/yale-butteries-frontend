'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('event_types', [
      {
        type: 'Regular',
        created_at: new Date(),
        updated_at: new Date(),
        position_id: 1,
      },
      {
        type: 'Regular',
        created_at: new Date(),
        updated_at: new Date(),
        position_id: 2,
      },
      {
        type: 'Regular',
        created_at: new Date(),
        updated_at: new Date(),
        position_id: 3,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('event_types', null, {})
  },
}

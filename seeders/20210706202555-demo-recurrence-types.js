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

    await queryInterface.bulkInsert('recurrence_types', [
      {
        type: 'Daily',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: 'Weekly',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: 'Monthly',
        created_at: new Date(),
        updated_at: new Date(),
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

    await queryInterface.bulkDelete('recurrence_types', null, {})
  },
}

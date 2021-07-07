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

    await queryInterface.bulkInsert('attendance_statuses', [
      {
        status: 'Going',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 'Maybe',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 'Not Going',
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

    await queryInterface.bulkDelete('attendance_statuses', null, {})
  },
}

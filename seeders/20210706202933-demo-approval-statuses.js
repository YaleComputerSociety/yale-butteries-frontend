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

    await queryInterface.bulkInsert('approval_statuses', [
      {
        status: 'Accepted',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 'Rejected',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        status: 'Pending',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('approval_statuses', null, {})
  },
}

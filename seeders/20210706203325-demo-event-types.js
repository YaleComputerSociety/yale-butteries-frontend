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

    await queryInterface.bulkInsert('event_types', [
      {
        type: 'Event',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: 'Job Opportunity',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        type: 'Study Group',
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

    await queryInterface.bulkDelete('event_types', null, {})
  },
}

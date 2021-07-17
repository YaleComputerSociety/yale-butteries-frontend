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
    await queryInterface.bulkInsert('positions_event_types', [
      {
        position_id: 1,
        event_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        position_id: 1,
        event_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        position_id: 2,
        event_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        position_id: 2,
        event_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        position_id: 3,
        event_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        position_id: 3,
        event_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        position_id: 3,
        event_type_id: 3,
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
    await queryInterface.bulkDelete('positions_event_types', null, {})
  }
}

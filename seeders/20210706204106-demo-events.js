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

    await queryInterface.bulkInsert('events', [
      {
        name: 'Event 1',
        description: 'Event 1',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 1,
        event_type_id: 1,
        recurrence_type_id: 2,
        room_id: 1,
        approval_status_id: 3,
      },
      {
        name: 'Event 2',
        description: 'Event 2',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 2,
        event_type_id: 1,
        recurrence_type_id: 1,
        room_id: 2,
        approval_status_id: 3,
      },
      {
        name: 'Event 3',
        description: 'Event 3',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 3,
        event_type_id: 1,
        recurrence_type_id: 1,
        room_id: 3,
        approval_status_id: 3,
      },
      {
        name: 'Event 4',
        description: 'Event 4',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 4,
        event_type_id: 1,
        recurrence_type_id: 2,
        room_id: 7,
        approval_status_id: 3,
      },
      {
        name: 'Event 5',
        description: 'Event 5',
        created_at: new Date(),
        updated_at: new Date(),
        user_id: 5,
        event_type_id: 1,
        recurrence_type_id: 3,
        room_id: 9,
        approval_status_id: 3,
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

    await queryInterface.bulkDelete('events', null, {})
  },
}

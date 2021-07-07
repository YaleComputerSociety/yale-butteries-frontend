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

    await queryInterface.bulkInsert('events', [
      {
        name: 'Event 1',
        description: 'Event 1',
        start_time: '2021-07-04T16:00:00.000Z',
        end_time: '2021-07-04T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_type_id: 1,
        recurrence_type_id: 2,
        room_id: 1,
        approval_status_id: 3,
      },
      {
        name: 'Event 2',
        description: 'Event 2',
        start_time: '2021-07-05T16:00:00.000Z',
        end_time: '2021-07-05T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_type_id: 1,
        recurrence_type_id: 2,
        room_id: 2,
        approval_status_id: 3,
      },
      {
        name: 'Event 3',
        description: 'Event 3',
        start_time: '2021-07-06T16:00:00.000Z',
        end_time: '2021-07-06T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_type_id: 1,
        recurrence_type_id: 1,
        room_id: 3,
        approval_status_id: 3,
      },
      {
        name: 'Event 4',
        description: 'Event 4',
        start_time: '2021-07-07T16:00:00.000Z',
        end_time: '2021-07-07T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_type_id: 1,
        recurrence_type_id: 2,
        room_id: 1,
        approval_status_id: 3,
      },
      {
        name: 'Event 5',
        description: 'Event 5',
        start_time: '2021-07-08T16:00:00.000Z',
        end_time: '2021-07-08T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_type_id: 1,
        recurrence_type_id: 3,
        room_id: 2,
        approval_status_id: 3,
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

    await queryInterface.bulkDelete('events', null, {})
  },
}

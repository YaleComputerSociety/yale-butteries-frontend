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

    await queryInterface.bulkInsert('event_occurrences', [
      {
        start_time: '2021-07-04T16:00:00.000Z',
        end_time: '2021-07-04T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 1,
      },
      {
        start_time: '2021-07-11T16:00:00.000Z',
        end_time: '2021-07-11T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 1,
      },
      {
        start_time: '2021-07-18T16:00:00.000Z',
        end_time: '2021-07-18T16:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 1,
      },
      {
        start_time: '2021-07-05T14:00:00.000Z',
        end_time: '2021-07-05T14:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 2,
      },
      {
        start_time: '2021-07-12T14:00:00.000Z',
        end_time: '2021-07-12T14:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 2,
      },
      {
        start_time: '2021-07-19T14:00:00.000Z',
        end_time: '2021-07-19T14:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 2,
      },
      {
        start_time: '2021-07-06T18:00:00.000Z',
        end_time: '2021-07-06T18:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 3,
      },
      {
        start_time: '2021-07-07T18:00:00.000Z',
        end_time: '2021-07-07T18:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 3,
      },
      {
        start_time: '2021-07-08T18:00:00.000Z',
        end_time: '2021-07-08T18:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 3,
      },
      {
        start_time: '2021-08-07T12:00:00.000Z',
        end_time: '2021-08-07T12:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 4,
      },
      {
        start_time: '2021-08-14T12:00:00.000Z',
        end_time: '2021-08-14T12:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 4,
      },
      {
        start_time: '2021-08-21T12:00:00.000Z',
        end_time: '2021-08-21T12:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 4,
      },
      {
        start_time: '2021-07-25T15:00:00.000Z',
        end_time: '2021-07-25T15:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 5,
      },
      {
        start_time: '2021-08-25T15:00:00.000Z',
        end_time: '2021-08-25T15:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 5,
      },
      {
        start_time: '2021-09-25T15:00:00.000Z',
        end_time: '2021-09-25T15:01:00.000Z',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 5,
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
    await queryInterface.bulkDelete('event_occurrences', null, {})
  },
}

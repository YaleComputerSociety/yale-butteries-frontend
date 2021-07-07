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

    await queryInterface.bulkInsert('event_occurrences', [
      {
        date: '2021-07-04',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 1,
      },
      {
        date: '2021-07-11',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 1,
      },
      {
        date: '2021-07-18',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 1,
      },
      {
        date: '2021-07-05',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 2,
      },
      {
        date: '2021-07-12',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 2,
      },
      {
        date: '2021-07-19',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 2,
      },
      {
        date: '2021-07-06',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 3,
      },
      {
        date: '2021-07-07',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 3,
      },
      {
        date: '2021-07-08',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 3,
      },
      {
        date: '2021-07-07',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 4,
      },
      {
        date: '2021-07-14',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 4,
      },
      {
        date: '2021-07-21',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 4,
      },
      {
        date: '2021-07-08',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 5,
      },
      {
        date: '2021-08-05',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 5,
      },
      {
        date: '2021-09-02',
        created_at: new Date(),
        updated_at: new Date(),
        event_id: 5,
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
    await queryInterface.bulkDelete('event_occurrences', null, {})
  },
}

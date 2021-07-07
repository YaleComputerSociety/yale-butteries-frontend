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

    await queryInterface.bulkInsert('users_events', [
      {
        user_id: 1,
        event_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 2,
      },
      {
        user_id: 2,
        event_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 1,
      },
      {
        user_id: 3,
        event_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 2,
      },
      {
        user_id: 4,
        event_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 1,
      },
      {
        user_id: 5,
        event_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 2,
      },
      {
        user_id: 1,
        event_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 2,
        relationship_id: 2,
      },
      {
        user_id: 2,
        event_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 1,
      },
      {
        user_id: 3,
        event_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 3,
        relationship_id: 2,
      },
      {
        user_id: 4,
        event_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 2,
      },
      {
        user_id: 5,
        event_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 1,
      },
      {
        user_id: 1,
        event_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 2,
      },
      {
        user_id: 2,
        event_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 2,
      },
      {
        user_id: 3,
        event_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
        attendance_status_id: 1,
        relationship_id: 1,
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

    await queryInterface.bulkDelete('users_events', null, {})
  },
}

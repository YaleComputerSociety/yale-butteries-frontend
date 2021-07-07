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

    await queryInterface.bulkInsert('rooms', [
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 1,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 2,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 3,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 4,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 5,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 6,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 7,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 8,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 9,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 10,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 11,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 12,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 13,
      },
      {
        room_name: 'Common Room',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        recurrence_type_id: 2,
        college_id: 14,
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

    await queryInterface.bulkDelete('rooms', null, {})
  },
}

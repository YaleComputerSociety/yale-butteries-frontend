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

    await queryInterface.bulkInsert('rooms', [
      {
        room_name: 'Room 1',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 2',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 3',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 4',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 5',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 6',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 7',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 8',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 9',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
      },
      {
        room_name: 'Room 10',
        needs_approval: true,
        created_at: new Date(),
        updated_at: new Date(),
        college_id: 3,
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

    await queryInterface.bulkDelete('rooms', null, {})
  },
}

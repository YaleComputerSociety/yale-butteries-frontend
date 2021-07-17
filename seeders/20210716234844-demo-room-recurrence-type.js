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
    await queryInterface.bulkInsert('rooms_recurrence_types', [
      {
        room_id: 1,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 1,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 1,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 2,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 2,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 3,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 4,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 4,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 4,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 5,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 5,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 5,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 6,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 6,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 6,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 7,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 7,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 7,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 8,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 8,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 8,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 9,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 9,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 9,
        recurrence_type_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 10,
        recurrence_type_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 10,
        recurrence_type_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        room_id: 10,
        recurrence_type_id: 3,
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

    await queryInterface.bulkDelete('rooms_recurrence_types', null, {})
  }
}

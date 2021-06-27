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

    await queryInterface.bulkInsert(
      'stats',
      [
        {
          points: 4,
          rebounds: 16,
          assists: 7,
          imgame_id: 1,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 4,
          rebounds: 11,
          assists: 2,
          imgame_id: 1,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 14,
          rebounds: 17,
          assists: 13,
          imgame_id: 2,
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 8,
          rebounds: 12,
          assists: 7,
          imgame_id: 2,
          user_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 2,
          rebounds: 14,
          assists: 17,
          imgame_id: 3,
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 10,
          rebounds: 20,
          assists: 15,
          imgame_id: 3,
          user_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 9,
          rebounds: 16,
          assists: 6,
          imgame_id: 4,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 2,
          rebounds: 3,
          assists: 4,
          imgame_id: 4,
          user_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 6,
          rebounds: 1,
          assists: 5,
          imgame_id: 5,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          points: 7,
          rebounds: 11,
          assists: 15,
          imgame_id: 5,
          user_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('stats', null, {})
  },
}

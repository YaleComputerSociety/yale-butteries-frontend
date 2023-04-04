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

    await queryInterface.bulkInsert('im_games', [
      {
        sport_id: 1,
        team_1_score: 68,
        team_2_score: 53,
        date: '2021-09-10',
        team_1_key: 3,
        team_2_key: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sport_id: 1,
        team_1_score: 67,
        team_2_score: 53,
        date: '2021-12-01',
        team_1_key: 3,
        team_2_key: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sport_id: 2,
        team_1_score: 66,
        team_2_score: 3,
        date: '2021-9-15',
        team_1_key: 3,
        team_2_key: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sport_id: 2,
        team_1_score: 27,
        team_2_score: 91,
        date: '2021-10-15',
        team_1_key: 3,
        team_2_key: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        sport_id: 2,
        team_1_score: 79,
        team_2_score: 13,
        date: '2021-11-07',
        team_1_key: 3,
        team_2_key: 10,
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

    await queryInterface.bulkDelete('im_games', null, {})
  },
}
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { // eslint-disable-line @typescript-eslint/no-unused-vars
    await queryInterface.bulkInsert('person', [
      {
        id: "c32d8b45-92fe-44f6-8b61-42c2107dfe87",
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('note', [
      {
        id: "c32d8b45-92fe-44f6-8b61-42c2107dfe88",
        personId: "c32d8b45-92fe-44f6-8b61-42c2107dfe87",
        content: 'This is a sample note for John Doe.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) { // eslint-disable-line @typescript-eslint/no-unused-vars
    await queryInterface.bulkDelete('Note', null, {});
    await queryInterface.bulkDelete('Person', null, {});
  }
};

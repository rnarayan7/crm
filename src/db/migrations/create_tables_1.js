module.exports = {
  up: (queryInterface, Sequelize) => {  // eslint-disable-line no-unused-vars
    return Promise.all([
      queryInterface.createTable('person', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        name: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
          unique: true,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
      }),
      queryInterface.createTable('note', {
        id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          defaultValue: Sequelize.DataTypes.UUIDV4,
          allowNull: false,
        },
        personId: {
          type: Sequelize.DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'person',
            key: 'id',
          },
        },
        content: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: false,
        },
      }),
    ]);
  },
  down: (queryInterface, Sequelize) => {  // eslint-disable-line @typescript-eslint/no-unused-vars
    return Promise.all([
      queryInterface.dropTable('note'),
      queryInterface.dropTable('person'),
    ]);
  },
};

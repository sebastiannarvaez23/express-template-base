module.exports.createTableServices = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('services', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        code: {
            type: Sequelize.STRING(4),
            allowNull: false,
            unique: true,
        },
        name: {
            type: Sequelize.STRING(70),
            allowNull: false,
        },
        created_by: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        updated_by: {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.fn('NOW'),
        },
        deleted_at: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    });
}
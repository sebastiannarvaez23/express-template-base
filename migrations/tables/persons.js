module.exports.createTablePersons = async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('persons', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING(10),
            unique: true,
            allowNull: false,
        },
        birth_date: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            unique: true,
        },
        role_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
                model: 'roles',
                key: 'id',
            },
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
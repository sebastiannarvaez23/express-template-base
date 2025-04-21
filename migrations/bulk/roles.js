module.exports.bulkInsertRoles = async (queryInterface) => {
    return await queryInterface.bulkInsert('roles', [
        {
            id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
            name: 'root',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: null,
        },
    ]);
}
module.exports.bulkInsertPersons = async (queryInterface) => {
    return await queryInterface.bulkInsert('persons', [
        {
            id: '8899d542-3a35-4494-b6de-d2421d5ca5da',
            first_name: 'administrador',
            last_name: 'administrador',
            email: 'admin@email.com',
            phone: '1111111111',
            birth_date: new Date(),
            user_id: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            role_id: '3ba6c285-e5f6-4e3f-9d7d-a64519105593',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: null,
        },
    ]);
}
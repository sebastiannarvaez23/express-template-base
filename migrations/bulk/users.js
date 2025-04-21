module.exports.bulkInsertUsers = async (queryInterface, encryptionService) => {

    const encryptedPassword = encryptionService.encrypt('admin');

    return await queryInterface.bulkInsert('users', [
        {
            id: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            nickname: 'admin',
            password: encryptedPassword,
            created_at: new Date(),
            updated_at: null,
        },
    ]);
}
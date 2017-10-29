import Helper from './Helper.js';

export default UserHandler = {
        getExistingUserByEmail : function getExistingUserByEmail (email) {
            var existingUser = Accounts.findUserByEmail(email);
            return existingUser;
        },
        createNewUser : function createNewUser (email, userName, password) {
            var userInfo = {
                "username": userName,
                "email": email,
                "password": password
            };
            var response = Accounts.createUser (userInfo);
            return response;
        }
};

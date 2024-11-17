const UserModel = require('../../Models/User');
const UserJoinedFunction = async (req, res) => {
    try {
       
        const users = await UserModel.find({});
        console.log("user:",users.joinedDate)
        const userJoinDates = users.map(user => ({
            UserJoinedDate: user.joinedDate
        }));

        res.status(200).json(userJoinDates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    UserJoinedFunction,
};

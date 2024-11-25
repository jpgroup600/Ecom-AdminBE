const UserModel = require('../../Models/User');

const GetAllUsersFunction = async (req, res) => {
    try {
        const page = parseInt(req.params.pagenumber) || 1; 
        const limit = parseInt(req.params.limit) || 10; 
        const skip = (page - 1) * limit;
        const users = await UserModel.find({})
            .sort({ joinedDate: -1 })
            .skip(skip)
            .limit(limit);
        const totalUsers = await UserModel.countDocuments();
        res.status(200).json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            users,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    GetAllUsersFunction,
};


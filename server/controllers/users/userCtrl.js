const bcrypt = require('bcryptjs');
const User = require("../../model/User");
const AppErr = require('../../utils/appErr');
const generateToken = require('../../utils/generateToken');

const registerCtrl = async(req, res, next) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const userFound = await User.findOne({email});
        if (userFound) {
            return next(new AppErr("User already exist", 400));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.json({
            status: "success",
            username: user.username,
            email: user.email,
            id: user._id
        });
    } catch (error) {
        next(new AppErr(error));
    }
};

const loginCtrl = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const userFound = await User.findOne({email});
        if (!userFound) {
            return next(new AppErr("Invalid credentials", 400));
        }

        const isValid = await bcrypt.compare(password, userFound.password);
        if (!isValid) {
            return next(new AppErr("Invalid credentials", 400));
        }
        
        res.json({
            status:"success",
            fullname: userFound.fullname,
            id: userFound._id,
            token: generateToken(userFound._id)
        });
    } catch (error) {
        next(new AppErr(error));
    }
};

const profileCtrl = async(req, res, next) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return next(new AppErr("User not found", 404));
        }
        res.json(user);
    } catch (error) {
        next(new AppErr(error));
    }
};

const changePasswordCtrl = async(req, res, next) => {
    const { newPassword } = req.body;
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return next(new AppErr("User not found", 404));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save({
            validateBeforeSave: false
        });

        res.json({
            status: "success",
            message: "Password changed successfully"
        });
    } catch (error) {
        next(new AppErr(error));
    }
}

const updateProfileCtrl = async(req, res, next) => {
    const { email, username } = req.body;
    try {
        if (!email || !username) {
            return next(new AppErr("Please provide all fields", 400));
        }

        const emailTaken = await User.findOne({email});
        if (emailTaken) {
            return next(new AppErr("Email already taken", 400));
        }

        const user = await User.findByIdAndUpdate(req.user, {email, username}, {new: true});

        res.json({
            status: "success",
            message: "User profile updated successfully",
            email: user.email,
            username: user.username
        });
    } catch (error) {
        next(new AppErr(error));
    }
}

module.exports = {registerCtrl, loginCtrl, profileCtrl, changePasswordCtrl, updateProfileCtrl};


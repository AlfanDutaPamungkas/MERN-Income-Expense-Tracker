const AppErr = require("../utils/appErr");
const getToken = require("../utils/getToken");
const verifyToken = require("../utils/verifyToken");

const isLogin = (req, res, next) => {
    const token = getToken(req);
    const decodedUser = verifyToken(token);
    if (!decodedUser) {
        return next(new AppErr("Invalid/Expired Token, please login again", 404));
    }
    
    req.user = decodedUser.id;
    next();
};

module.exports = isLogin;


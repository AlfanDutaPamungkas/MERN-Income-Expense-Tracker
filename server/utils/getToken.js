const getToken = (req) => {
    const headerObj = req.headers;
    const token = req.headers.authorization? req.headers.authorization.split(" ")[1] : null;
    
    if (token) {
        return token;
    } else {
        return {
            status: "failed",
            message: "There is no token attached to the header"
        };
    }
};

module.exports = getToken;


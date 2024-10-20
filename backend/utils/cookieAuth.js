const { validateToken } = require("./auth");

const cookieAuthentication = (cookieName) => {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
            return next();
        }
        try {
            req.user = validateToken(tokenCookieValue);
            return next();
        } catch(err) {
            return next(err);
        }
    };
}

module.exports = { cookieAuthentication };
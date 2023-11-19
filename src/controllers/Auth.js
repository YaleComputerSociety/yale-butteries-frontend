"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.environment = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_cas_1 = require("passport-cas");
const port = process.env.PORT || 3000;
exports.environment = process.env.NODE_ENV || 'development';
exports.url = exports.environment === 'production' ? `https://yale-butteries.herokuapp.com` : `http://localhost:${port}`;
passport_1.default.use(new passport_cas_1.Strategy({
    ssoBaseURL: 'https://secure.its.yale.edu/cas',
    serverBaseURL: exports.url,
}, function (login, done) {
    return done(null, {
        netId: login,
    });
}));
passport_1.default.serializeUser(function (user, done) {
    done(null, user.netId);
});
passport_1.default.deserializeUser(function (netId, done) {
    done(null, {
        netId,
    });
});
exports.default = (app) => {
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.get('/cas', function (req, res, next) {
        passport_1.default.authenticate('cas', function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/');
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send(JSON.stringify(user));
            });
        })(req, res, next);
    });
};
//# sourceMappingURL=Auth.js.map
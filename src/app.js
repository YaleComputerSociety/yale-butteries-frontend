"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.environment = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const CollegeApi_1 = __importDefault(require("./routes/CollegeApi"));
const MenuItemApi_1 = __importDefault(require("./routes/MenuItemApi"));
const UserApi_1 = __importDefault(require("./routes/UserApi"));
const OrderApi_1 = __importDefault(require("./routes/OrderApi"));
const PaymentApi_1 = __importDefault(require("./routes/PaymentApi"));
const PushNotificationsApi_1 = __importDefault(require("./routes/PushNotificationsApi"));
const Auth_1 = __importDefault(require("./controllers/Auth"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const port = process.env.PORT || 3000;
exports.environment = process.env.NODE_ENV || 'development';
exports.url = exports.environment === 'production' ? `https://yale-butteries.herokuapp.com` : `http://localhost:${port}`;
const app = (0, express_1.default)()
    // .use('/stripe', express.raw({ type: '*/*' }))
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }))
    .use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}))
    .use((0, cors_1.default)()); // need to change this
// API Routes
app.use('/api/colleges', CollegeApi_1.default);
app.use('/api/menu-items', MenuItemApi_1.default);
app.use('/api/orders', OrderApi_1.default);
app.use('/api/users', UserApi_1.default);
app.use('/api/payments', PaymentApi_1.default);
app.use('/api/notifs', PushNotificationsApi_1.default);
app.use(errorHandler_1.default);
(0, Auth_1.default)(app);
app.listen(port, () => {
    console.log(`Deployed at ${exports.url}`);
});
//# sourceMappingURL=app.js.map
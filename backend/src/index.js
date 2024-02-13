"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// dotenv.config(); // Load environment variables from .env file
if (process.env.NODE_ENV === "e2e") {
    dotenv_1.default.config({ path: ".env.e2e" });
}
else {
    dotenv_1.default.config(); // This will load .env by default
}
// const uri = process.env.MONGODB_CONNECTION_STRING;
// if (!uri) {
//   throw new Error(
//     "Please define the MONGODB_CONNECTION_STRING environment variable"
//   );
// }
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.listen(7000, () => {
    console.log("Server is listening on localhost:7000");
});

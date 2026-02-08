"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const medicine_route_1 = __importDefault(require("./routes/medicine.route"));
const mongodb_1 = __importDefault(require("./lib/mongodb"));
const feedback_route_1 = __importDefault(require("./routes/feedback.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(express_1.default.json());
// Register routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/medicines", medicine_route_1.default);
app.use("/api/feedback", feedback_route_1.default);
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
const PORT = env_1.env.PORT || 5000;
// ✅ Ensure server only listens AFTER DB is connected
async function startServer() {
    try {
        await (0, mongodb_1.default)();
        console.log("✅ MongoDB Connected Successfully");
        app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    }
}
startServer();

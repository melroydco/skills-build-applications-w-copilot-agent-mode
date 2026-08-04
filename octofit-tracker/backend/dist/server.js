"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = require("./config/api");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit backend is running' });
});
app.get('/api/users', (_req, res) => {
    res.json({
        baseUrl: (0, api_1.buildApiBaseUrl)(),
        users: [
            { id: 1, name: 'Ada', role: 'admin' },
            { id: 2, name: 'Grace', role: 'member' }
        ]
    });
});
app.get('/api/activities', (_req, res) => {
    res.json({
        baseUrl: (0, api_1.buildApiBaseUrl)(),
        activities: [
            { id: 1, type: 'run', durationMinutes: 30 },
            { id: 2, type: 'strength', durationMinutes: 45 }
        ]
    });
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${(0, api_1.buildApiBaseUrl)()}`);
});

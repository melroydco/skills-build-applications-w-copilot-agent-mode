"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'OctoFit backend is running' });
});
function registerResourceRoute(path, key, items) {
    const payload = { baseUrl, [key]: items };
    app.get(path, (_req, res) => {
        res.json(payload);
    });
    app.get(`${path}/`, (_req, res) => {
        res.json(payload);
    });
}
registerResourceRoute('/api/users', 'users', [
    { id: 1, name: 'Ada', role: 'admin' },
    { id: 2, name: 'Grace', role: 'member' }
]);
registerResourceRoute('/api/activities', 'activities', [
    { id: 1, type: 'run', durationMinutes: 30, note: 'Morning jog around the park' },
    { id: 2, type: 'strength', durationMinutes: 45, note: 'Upper body circuit' }
]);
registerResourceRoute('/api/teams', 'teams', [
    { id: 1, name: 'North Stars', members: 6 },
    { id: 2, name: 'River Runners', members: 5 }
]);
registerResourceRoute('/api/leaderboard', 'leaderboard', [
    { id: 1, name: 'Maya', points: 985, team: 'North Stars' },
    { id: 2, name: 'Luis', points: 912, team: 'River Runners' },
    { id: 3, name: 'Jules', points: 887, team: 'North Stars' }
]);
registerResourceRoute('/api/workouts', 'workouts', [
    { id: 1, name: 'Recovery Flow', focus: 'mobility' },
    { id: 2, name: 'Power Circuit', focus: 'strength' }
]);
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});

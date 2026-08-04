"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApiBaseUrl = buildApiBaseUrl;
function buildApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME?.trim();
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
}

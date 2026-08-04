const test = require('node:test');
const assert = require('node:assert/strict');

const { buildApiBaseUrl } = require('../dist/config/api.js');

test('uses a Codespaces URL when CODESPACE_NAME is set', () => {
  process.env.CODESPACE_NAME = 'octofit-demo';
  assert.equal(buildApiBaseUrl(), 'https://octofit-demo-8000.app.github.dev');
});

test('falls back to localhost when CODESPACE_NAME is not set', () => {
  delete process.env.CODESPACE_NAME;
  assert.equal(buildApiBaseUrl(), 'http://localhost:8000');
});

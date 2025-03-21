// Simple server to bypass environment issues
const { execSync } = require('child_process');

try {
  console.log('Starting Vite server...');
  execSync('npx vite --port 3001', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start Vite server:', error);
}

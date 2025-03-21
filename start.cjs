// Simple server to bypass environment issues
const { execSync } = require('child_process');

try {
  console.log('Starting Vite server on port 3001...');
  execSync('npx vite --port 3001 --host', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to start Vite server:', error);
}

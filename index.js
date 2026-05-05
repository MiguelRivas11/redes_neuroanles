const fs = require('fs');
const path = require('path');

// Carga ligera de .env sin dependencias
function loadDotEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

loadDotEnv();

const { connect, close } = require('./db');

(async () => {
  try {
    const db = await connect();
    console.log('Conectado a MongoDB. DB name:', db.databaseName);
  } catch (err) {
    console.error('Error conectando a MongoDB:', err.message);
  } finally {
    await close();
  }
})();

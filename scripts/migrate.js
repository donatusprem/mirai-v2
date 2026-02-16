const { Client } = require('pg');
require('dotenv').config({ path: '.env.development.local' });

async function migrate() {
    const client = new Client({
        connectionString: process.env.POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        await client.connect();
        console.log('Connected to database.');

        await client.query(`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;
    `);

        console.log('Migration successful: Added position column.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await client.end();
    }
}

migrate();

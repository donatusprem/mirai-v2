import { sql } from './src/lib/db';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.development.local') });

async function checkImages() {
    try {
        console.log("Connecting to DB...");
        const { rows } = await sql`SELECT id, name, image, images FROM products ORDER BY id DESC LIMIT 5`;

        console.log(`Found ${rows.length} products.`);

        for (const row of rows) {
            console.log(`\nProduct: ${row.name} (ID: ${row.id})`);

            const urls = [row.image, ...(row.images || [])].filter(Boolean);

            for (const url of urls) {
                try {
                    const res = await fetch(url, { method: 'HEAD' });
                    const size = res.headers.get('content-length');
                    const type = res.headers.get('content-type');
                    console.log(`  - URL: ${url}`);
                    console.log(`    Size: ${size ? (parseInt(size) / 1024).toFixed(2) + ' KB' : 'Unknown'}`);
                    console.log(`    Type: ${type}`);
                } catch (err) {
                    console.log(`  - URL: ${url} (Error fetching headers: ${err.message})`);
                }
            }
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

checkImages();

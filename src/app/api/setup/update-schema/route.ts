import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await sql`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;
        `;
        await sql`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS show_price BOOLEAN DEFAULT false;
    `;
        return NextResponse.json({ message: 'Schema updated successfully: added position column to products table' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

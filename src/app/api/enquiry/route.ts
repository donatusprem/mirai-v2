import { NextRequest, NextResponse } from "next/server";
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, company, message, items } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        const { rows } = await sql`
            INSERT INTO enquiries (name, email, phone, company, message, items, status, created_at)
            VALUES (${name}, ${email}, ${phone || null}, ${company || null}, ${message || null}, ${JSON.stringify(items || [])}::jsonb, 'new', NOW())
            RETURNING id
        `;

        return NextResponse.json({ success: true, id: rows[0].id });
    } catch (error) {
        console.error("Failed to save enquiry:", error);
        return NextResponse.json(
            { error: "Failed to save enquiry" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM enquiries ORDER BY id DESC`;

        const enquiries = rows.map(r => ({
            id: r.id,
            name: r.name,
            email: r.email,
            phone: r.phone,
            company: r.company,
            message: r.message,
            items: r.items,
            status: r.status,
            createdAt: r.created_at
        }));

        return NextResponse.json(enquiries);
    } catch (error) {
        console.error("Failed to fetch enquiries:", error);
        return NextResponse.json(
            { error: "Failed to fetch enquiries" },
            { status: 500 }
        );
    }
}

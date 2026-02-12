import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ENQUIRIES_FILE = path.join(process.cwd(), "src/data/enquiries.json");

export interface EnquiryItem {
    id: number | string;
    name: string;
    category: string;
    quantity: number;
}

export interface Enquiry {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    items: EnquiryItem[];
    status: "new" | "contacted" | "completed";
    createdAt: string;
}

async function getEnquiries(): Promise<Enquiry[]> {
    try {
        const data = await fs.readFile(ENQUIRIES_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveEnquiries(enquiries: Enquiry[]): Promise<void> {
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2));
}

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

        const enquiries = await getEnquiries();
        const newId = enquiries.length > 0
            ? Math.max(...enquiries.map(e => e.id)) + 1
            : 1;

        const newEnquiry: Enquiry = {
            id: newId,
            name,
            email,
            phone: phone || undefined,
            company: company || undefined,
            message: message || undefined,
            items: items || [],
            status: "new",
            createdAt: new Date().toISOString(),
        };

        enquiries.unshift(newEnquiry);
        await saveEnquiries(enquiries);

        return NextResponse.json({ success: true, id: newId });
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
        const enquiries = await getEnquiries();
        return NextResponse.json(enquiries);
    } catch (error) {
        console.error("Failed to fetch enquiries:", error);
        return NextResponse.json(
            { error: "Failed to fetch enquiries" },
            { status: 500 }
        );
    }
}

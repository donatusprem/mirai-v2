import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const ENQUIRIES_FILE = path.join(process.cwd(), "src/data/enquiries.json");

interface Enquiry {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    items: { id: number | string; name: string; category: string; quantity: number }[];
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

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const enquiryId = parseInt(id);
        const body = await request.json();
        const { status } = body;

        if (!status || !["new", "contacted", "completed"].includes(status)) {
            return NextResponse.json(
                { error: "Valid status required" },
                { status: 400 }
            );
        }

        const enquiries = await getEnquiries();
        const index = enquiries.findIndex(e => e.id === enquiryId);

        if (index === -1) {
            return NextResponse.json(
                { error: "Enquiry not found" },
                { status: 404 }
            );
        }

        enquiries[index].status = status;
        await saveEnquiries(enquiries);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update enquiry:", error);
        return NextResponse.json(
            { error: "Failed to update enquiry" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const enquiryId = parseInt(id);

        const enquiries = await getEnquiries();
        const filtered = enquiries.filter(e => e.id !== enquiryId);

        if (filtered.length === enquiries.length) {
            return NextResponse.json(
                { error: "Enquiry not found" },
                { status: 404 }
            );
        }

        await saveEnquiries(filtered);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete enquiry:", error);
        return NextResponse.json(
            { error: "Failed to delete enquiry" },
            { status: 500 }
        );
    }
}

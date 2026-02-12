import EnquiriesClient from './enquiries-client';
import AdminSidebar from '@/components/admin/admin-sidebar';

export const dynamic = 'force-dynamic';

export default function AdminEnquiriesPage() {
    return (
        <div className="min-h-screen bg-neutral-50 flex">
            <AdminSidebar />

            <main className="flex-1 p-8">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold uppercase tracking-tight">Quote Enquiries</h1>
                        <p className="text-black/60 mt-1">Manage customer quote requests</p>
                    </header>

                    <EnquiriesClient />
                </div>
            </main>
        </div>
    );
}

import { getGalleryItems } from '@/lib/data';
import { Image } from 'lucide-react';
import GalleryClient from './gallery-client';
import AdminSidebar from '@/components/admin/admin-sidebar';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
    const items = await getGalleryItems();

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                    <div className="px-8 h-16 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">Gallery</h1>
                            <p className="text-sm text-neutral-500">Manage your project showcase</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg">
                                <Image size={16} className="text-neutral-500" />
                                <span className="text-sm font-medium">{items.length} Projects</span>
                            </div>
                        </div>
                    </div>
                </header>

                <GalleryClient initialItems={items} />
            </main>
        </div>
    );
}

import { getInventory, getProducts } from '@/lib/data';
import { Boxes } from 'lucide-react';
import AdminSidebar from '@/components/admin/admin-sidebar';
import InventoryClient from './inventory-client';

export const dynamic = 'force-dynamic';

export default async function AdminInventoryPage() {
    const inventory = await getInventory();
    const products = await getProducts();

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                    <div className="px-8 h-16 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">Inventory</h1>
                            <p className="text-sm text-neutral-500">Track stock levels and availability</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-lg">
                                <Boxes size={16} className="text-neutral-500" />
                                <span className="text-sm font-medium">{inventory.length} Entries</span>
                            </div>
                        </div>
                    </div>
                </header>

                <InventoryClient initialInventory={inventory} products={products} />
            </main>
        </div>
    );
}

import { getProducts, getInventory } from "@/lib/data";
import Link from "next/link";
import ProductForm from "./product-form";
import { removeProduct } from "./product-actions";
import AdminSidebar from "@/components/admin/admin-sidebar";
import { Package, TrendingUp, Layers } from "lucide-react";

export default async function AdminPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const products = await getProducts();
    const inventory = await getInventory();
    const params = await searchParams;
    const isAdding = params?.add === 'true';
    const editingId = params?.edit ? Number(params.edit) : null;

    // Find product to edit if editingId is present
    const productToEdit = editingId ? products.find(p => p.id === editingId) : undefined;
    const currentStock = productToEdit ? inventory.find(i => i.productId === productToEdit.id)?.quantity : 0;

    // Get category stats
    const categories = [...new Set(products.map(p => p.category))];

    // Calculate total inventory value (Price * Stock)
    const totalValue = products.reduce((sum, product) => {
        const stockItem = inventory.find(i => i.productId === product.id);
        const quantity = stockItem ? stockItem.quantity : 0;
        return sum + (product.price * quantity);
    }, 0);

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
                    <div className="px-8 h-16 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">Products</h1>
                            <p className="text-sm text-neutral-500">Manage your product catalog</p>
                        </div>
                        {!isAdding && !editingId && (
                            <Link
                                href="/admin?add=true"
                                className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                + Add Product
                            </Link>
                        )}
                    </div>
                </header>

                <div className="p-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Package size={24} className="text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{products.length}</p>
                                    <p className="text-sm text-neutral-500">Total Products</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Layers size={24} className="text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{categories.length}</p>
                                    <p className="text-sm text-neutral-500">Categories</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <TrendingUp size={24} className="text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">₹{totalValue.toLocaleString()}</p>
                                    <p className="text-sm text-neutral-500">Catalog Value</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Product List */}
                        <div className="lg:col-span-2 space-y-3">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-bold text-lg">All Products</h2>
                                <span className="text-sm text-neutral-400">{products.length} items</span>
                            </div>

                            {products.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-neutral-300">
                                    <Package size={48} className="mx-auto text-neutral-300 mb-4" />
                                    <p className="text-neutral-400">No products found.</p>
                                    <Link href="/admin?add=true" className="text-blue-500 text-sm mt-2 inline-block hover:underline">
                                        Add your first product
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                                    {products.map((product) => (
                                        <div key={product.id} className={`group bg-white p-4 rounded-xl border transition-all flex items-center gap-4 ${editingId === product.id ? 'border-black shadow-lg' : 'border-neutral-200 hover:border-neutral-300'}`}>
                                            <div className={`w-14 h-14 rounded-lg ${product.color || 'bg-neutral-100'} overflow-hidden relative flex-shrink-0`}>
                                                {product.image && (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                                                )}
                                            </div>

                                            <div className="flex-grow min-w-0">
                                                <h3 className="font-semibold truncate">{product.name}</h3>
                                                <p className="text-xs text-neutral-400">{product.category} — ₹{product.price.toLocaleString()}</p>
                                            </div>

                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin?edit=${product.id}`}
                                                    className="px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <form action={removeProduct.bind(null, product.id)}>
                                                    <button
                                                        className="px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Editor Panel */}
                        <div className="relative">
                            <div className="sticky top-24">
                                {(isAdding || editingId) ? (
                                    <ProductForm product={productToEdit} initialStock={currentStock} />
                                ) : (
                                    <div className="p-8 bg-white rounded-xl border border-dashed border-neutral-300 text-center">
                                        <Package size={32} className="mx-auto text-neutral-300 mb-3" />
                                        <p className="text-neutral-400 text-sm">Select a product to edit<br />or add a new one.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

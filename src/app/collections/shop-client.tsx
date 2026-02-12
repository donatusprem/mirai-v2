"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { useState, useMemo, useEffect } from "react";
import MagnetButton from "@/components/ui/MagnetButton";
import { ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

// Mock Data
import { CATEGORIES } from "@/lib/constants";

// Mock Data
const categories = ["All", ...CATEGORIES];
type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";

interface Product {
    id: number | string;
    name: string;
    category: string;
    color?: string;
    price?: number;
    image?: string;
    description?: string;
}

import ProductModal from "@/components/ui/ProductModal";

// ... existing imports

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const categoryParam = searchParams.get('category');

    const [filter, setFilter] = useState(categoryParam || "All");
    const [sortBy, setSortBy] = useState<SortOption>("default");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Sync filter with URL param
    useEffect(() => {
        if (categoryParam && categoryParam !== filter) {
            setFilter(categoryParam);
        }
    }, [categoryParam]);

    const handleFilterChange = (cat: string) => {
        setFilter(cat);
        if (cat === "All") {
            router.push('/collections', { scroll: false });
        } else {
            router.push(`/collections?category=${encodeURIComponent(cat)}`, { scroll: false });
        }
    };

    const filteredProducts = useMemo(() => {
        let result = filter === "All"
            ? [...initialProducts]
            : initialProducts.filter(p => p.category === filter);

        if (sortBy === "price-asc") {
            result.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (sortBy === "price-desc") {
            result.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (sortBy === "name-asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [filter, sortBy, initialProducts]);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-6 lg:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-text-heading mb-4"
                        >
                            Collections
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-text-main/80"
                        >
                            Premium office essentials available for direct order.
                        </motion.p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* Sidebar: Categories (Desktop Sticky) */}
                    <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-32 self-start">
                        <div className="mb-6 lg:mb-0">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-black/40">Categories</h3>

                            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
                                {categories.map((cat) => {
                                    const count = cat === "All"
                                        ? initialProducts.length
                                        : initialProducts.filter(p => p.category === cat).length;

                                    const isActive = filter === cat;

                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => handleFilterChange(cat)}
                                            className={`text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-lg transition-all border flex items-center justify-between gap-4 w-auto lg:w-full whitespace-nowrap ${isActive
                                                ? "bg-black text-white border-black"
                                                : "bg-transparent text-black/60 border-transparent hover:bg-black/5"
                                                }`}
                                        >
                                            {cat}
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-black/50'}`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content: Sort & Grid */}
                    <div className="flex-1 w-full">

                        {/* Toolbar: Sort */}
                        <div className="flex justify-end mb-8 border-b border-black/5 pb-4">
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 hover:text-olive transition-colors"
                                >
                                    Sort By <ChevronDown size={14} />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg overflow-hidden border border-black/5 z-20">
                                        <button onClick={() => { setSortBy("default"); setIsSortOpen(false); }} className="block w-full text-left px-4 py-3 text-sm hover:bg-neutral-50">Featured</button>
                                        <button onClick={() => { setSortBy("price-asc"); setIsSortOpen(false); }} className="block w-full text-left px-4 py-3 text-sm hover:bg-neutral-50">Price: Low to High</button>
                                        <button onClick={() => { setSortBy("price-desc"); setIsSortOpen(false); }} className="block w-full text-left px-4 py-3 text-sm hover:bg-neutral-50">Price: High to Low</button>
                                        <button onClick={() => { setSortBy("name-asc"); setIsSortOpen(false); }} className="block w-full text-left px-4 py-3 text-sm hover:bg-neutral-50">Name: A-Z</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProducts.map((item, idx) => (
                                <ProductCard
                                    key={item.id}
                                    product={item}
                                    index={idx}
                                    onClick={(p) => {
                                        console.log("ShopClient: Setting selected product:", p.name);
                                        setSelectedProduct(p);
                                    }}
                                />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="py-20 text-center text-black/40">
                                <p>No products found in this category.</p>
                            </div>
                        )}
                    </div>

                </div>

                <ProductModal
                    product={selectedProduct}
                    isOpen={!!selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />

            </div>
        </main>
    );
}

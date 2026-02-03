'use client';

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
    id: number | string;
    name: string;
    category: string;
    price?: number;
    image?: string;
    images?: string[]; // Gallery
    description?: string;
    color?: string;
}

interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const { addItem } = useCart();
    const [activeImage, setActiveImage] = useState<string | null>(null);

    // Initialize active image when product changes
    useEffect(() => {
        if (product) {
            setActiveImage(product.images?.[0] || product.image || null);
        }
    }, [product]);

    if (!product) return null;

    const gallery = product.images && product.images.length > 0
        ? product.images
        : (product.image ? [product.image] : []);

    const handleAddToQuote = () => {
        addItem({
            id: product.id,
            name: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
        });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 p-4 md:p-6"
                    >
                        <div className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 backdrop-blur-sm transition-colors hover:bg-neutral-100"
                            >
                                <X size={20} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Image Section */}
                                <div className={`relative h-64 md:h-auto ${product.color || "bg-neutral-100"} p-8 flex flex-col items-center justify-center gap-4`}>
                                    {/* Main Image */}
                                    <div className="relative w-full aspect-square md:aspect-[4/5] max-h-[50vh]">
                                        {activeImage ? (
                                            <div
                                                className="w-full h-full bg-contain bg-center bg-no-repeat transition-all duration-300"
                                                style={{ backgroundImage: `url(${activeImage})` }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="h-40 w-40 rounded-full bg-white/30 backdrop-blur-md" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Thumbnails */}
                                    {gallery.length > 1 && (
                                        <div className="flex gap-2 overflow-x-auto max-w-full pb-2 scrollbar-hide">
                                            {gallery.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setActiveImage(img)}
                                                    className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-black' : 'border-transparent hover:border-black/20'
                                                        }`}
                                                >
                                                    <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-8 md:p-12">
                                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-olive">
                                        {product.category}
                                    </span>
                                    <h2 className="mb-4 text-3xl font-bold uppercase tracking-tight text-text-heading md:text-4xl">
                                        {product.name}
                                    </h2>

                                    {product.price && (
                                        <div className="mb-6 text-2xl font-medium text-black">
                                            ₹{product.price.toLocaleString('en-IN')}
                                        </div>
                                    )}

                                    <p className="mb-8 text-neutral-600 leading-relaxed">
                                        {product.description || "Designed for the modern workspace, this piece blends functionality with aesthetic excellence. Premium materials ensure durability while the ergonomic design provides maximum comfort."}
                                    </p>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleAddToQuote}
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-olive text-white font-bold uppercase tracking-wide rounded-lg hover:bg-olive/90 transition-colors"
                                        >
                                            <Plus size={18} />
                                            Add to Quote
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

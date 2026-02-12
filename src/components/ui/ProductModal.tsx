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

    console.log("ProductModal render. Product:", product?.name, "IsOpen:", isOpen);

    return (
        <AnimatePresence>
            {isOpen && product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                    />


                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto relative"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/5 rounded-full md:hidden"
                            >
                                <X size={20} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full overflow-y-auto md:overflow-hidden">
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
                                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-neutral-900 text-white font-bold uppercase tracking-wide rounded-2xl shadow-lg hover:bg-black hover:scale-[1.02] transition-all border border-white/10"
                                        >
                                            <Plus size={18} />
                                            Add to Quote
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

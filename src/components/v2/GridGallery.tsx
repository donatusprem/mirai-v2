"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/data";

interface GridGalleryProps {
    products: Product[];
}

export default function GridGallery({ products }: GridGalleryProps) {
    // Take first 6 products for the gallery
    const galleryProducts = products.slice(0, 6);

    return (
        <section className="py-20 lg:py-32">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl"
                    >
                        <span className="block text-xs font-bold uppercase tracking-widest text-black/50 mb-4">The Selection</span>
                        <h2 className="font-serif text-5xl md:text-6xl text-text-heading leading-[0.9]">
                            Curated <br /> <span className="italic text-black/60 font-light">Essentials.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <a href="/collections" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-black/60 transition-colors">
                            View All Objects
                        </a>
                    </motion.div>
                </div>

                {/* Staggered Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                    {galleryProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className={`${idx % 2 === 1 ? 'md:translate-y-12' : ''}`} // Simple stagger effect
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

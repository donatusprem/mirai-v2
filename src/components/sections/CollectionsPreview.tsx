"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const collections = [
    {
        id: 1,
        name: "Sofas",
        category: "Sofas",
        subtitle: "1-5 Seater Options",
        image: "/uploads/1769682926052-91_SPRING_BOARD-_CHENNAI__sofa.png"
    },
    {
        id: 2,
        name: "Chairs",
        category: "Chairs",
        subtitle: "Accent, Dining & More",
        image: "/uploads/1769682926086-ACME_Chennai_Single_seaterLounge_Chair.png"
    },
    {
        id: 3,
        name: "Tables",
        category: "Tables",
        subtitle: "Centre, Side & Work",
        image: "/uploads/1769682926133-91_SPRING_BOARD-_CHENNAI_Centre_table.png"
    },
    {
        id: 4,
        name: "Lounge",
        category: "Lounge",
        subtitle: "Pouffe & Comfort",
        image: "/uploads/1769682926089-btc.png"
    },
    {
        id: 5,
        name: "Outdoor",
        category: "Outdoor",
        subtitle: "Al Fresco Living",
        image: "/uploads/1769682926090-cf.png"
    },
];

export default function CollectionsPreview() {
    const [startIndex, setStartIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right

    const nextSlide = () => {
        setDirection(1);
        setStartIndex((prev) => (prev + 1) % collections.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setStartIndex((prev) => (prev - 1 + collections.length) % collections.length);
    };

    // Calculate visible items (circular)
    const visibleItems = [];
    if (collections.length > 0) {
        for (let i = 0; i < 3; i++) {
            visibleItems.push({
                ...collections[(startIndex + i) % collections.length],
                index: i
            });
        }
    }

    // Slide animation variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0
        })
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white via-neutral-50/50 to-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Text Content */}
                    <div className="lg:col-span-5 space-y-8 pr-8">
                        <span className="block text-sm font-bold uppercase tracking-widest text-olive">Collections</span>
                        <p className="text-lg text-text-main/80 leading-relaxed">
                            <span className="font-bold text-black">MIRAI</span> collection is a thoughtfully curated range of office furniture designed for modern, dynamic workplaces. From executive desks to collaborative workstations, each piece reflects global design sensibilities.
                        </p>
                        <Link
                            href="/collections"
                            className="inline-block px-8 py-3 uppercase text-sm tracking-widest border border-black text-black hover:bg-black hover:text-white transition-colors duration-300"
                        >
                            View All
                        </Link>
                    </div>

                    {/* Product Carousel / Grid */}
                    <div className="lg:col-span-7 relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                            <AnimatePresence mode="popLayout" custom={direction}>
                                {visibleItems.map((item) => (
                                    <motion.div
                                        key={`${startIndex}-${item.id}`}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                            duration: 0.4
                                        }}
                                    >
                                        <Link href={`/collections?category=${encodeURIComponent(item.category)}`}>
                                            <div className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100 shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Always visible label */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                        <h3 className="font-bold uppercase text-sm">{item.name}</h3>
                                                        <p className="text-xs text-black/60">{item.subtitle}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Controls */}
                        <div className="mt-8 flex gap-4 justify-end">
                            <button
                                onClick={prevSlide}
                                className="p-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="p-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

const collections = [
    { id: 1, title: "Chairs", image: "/uploads/ref/chairs.avif", link: "/collections?category=Chairs" },
    { id: 2, title: "Modular Sofas", image: "/uploads/ref/sofas.avif", link: "/collections?category=Sofas" },
    { id: 3, title: "Executive Desks", image: "/uploads/ref/tables.avif", link: "/collections?category=Desks" },
    { id: 4, title: "Lounge Chairs", image: "/uploads/ref/lounge.avif", link: "/collections?category=Lounge" },
    { id: 5, title: "Carpets", image: "/uploads/ref/carpets.avif", link: "/collections?category=Carpets" },
];

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Gentle horizontal drift
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-white text-black">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden py-20">

                {/* Section Header */}
                <div className="container mx-auto px-6 md:px-12 mb-12 flex items-end justify-between">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Collections</h2>
                        <p className="text-neutral-500 max-w-sm">Explore our wide range of premium office solutions.</p>
                    </div>
                </div>

                {/* Glassy Cards Horizontal Scroll */}
                <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 w-max">
                    {collections.map((item) => (
                        <Link
                            href={item.link}
                            key={item.id}
                            className="group relative h-[60vh] w-[400px] rounded-[3rem] overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />

                            {/* Permanent Frosted Glass Label - 'Liquid Glass' UI */}
                            {/* Using bg-white/30 and backdrop-blur-xl for a true 'frost' effect that isn't solid white */}
                            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
                                <div className="backdrop-blur-xl bg-white/30 border border-white/20 shadow-lg px-8 py-4 rounded-full">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-black/80">{item.title}</h3>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* 'View All' Card */}
                    <div className="h-[60vh] w-[300px] flex items-center justify-center">
                        <Link href="/collections" className="glass-button w-40 h-40 rounded-full flex items-center justify-center text-center text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all">
                            View All
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

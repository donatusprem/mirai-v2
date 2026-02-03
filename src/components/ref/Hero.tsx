"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 150]); // Parallax for text
    const yBg = useTransform(scrollY, [0, 500], [0, -50]); // Parallax for BG

    return (
        <section className="relative h-screen w-full overflow-hidden bg-white text-black flex items-center justify-center">

            {/* Background Elements / Parallax Images */}
            {/* Using one of the provided abstract/furniture images as a subtle parallax element */}
            <motion.div
                style={{ y: yBg }}
                className="absolute inset-0 z-0 opacity-80"
            >
                <img
                    src="/uploads/ref/11062b_7134abfded5346d88613bd585c02b810~mv2.avif"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Overlay Gradient to ensure text pop - REMOVED for clarity, using shadow instead if needed */}
            {/* <div className="absolute inset-0 z-0 bg-white/30" /> */}
            <div className="absolute inset-0 z-0 bg-black/20" /> {/* Slight dark tint for text readability */}

            {/* Content */}
            <motion.div
                style={{ y: yText }}
                className="relative z-10 text-center flex flex-col items-center max-w-4xl px-6 text-white"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-lg"
                >
                    Office Furniture, <br /> Simplified.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl font-medium text-white/90 mb-10 max-w-xl drop-shadow-md"
                >
                    Complete office furniture solutions for modern, premium workplaces.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Link
                        href="/collections"
                        className="px-10 py-4 rounded-full border-2 border-white text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </motion.div>
            </motion.div>

            {/* Floating 'Featured' elements similar to video if needed, 
                 but keeping it clean for now based on the main 'Hero' description */}
        </section>
    );
}

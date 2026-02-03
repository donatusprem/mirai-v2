"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowDownRight } from "lucide-react";

export default function HeroV2() {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 50]);
    const yImg = useTransform(scrollY, [0, 500], [0, -50]);

    return (
        <section className="relative min-h-[100svh] w-full bg-[#EAE8E4] flex flex-col lg:flex-row overflow-hidden">

            {/* Left: Typography & Story */}
            <div className="w-full lg:w-5/12 relative z-10 flex flex-col justify-between p-8 lg:p-20 pt-32 lg:pt-40">
                <motion.div style={{ y: yText }} className="flex flex-col gap-8">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-xs font-bold uppercase tracking-widest text-black/40"
                    >
                        Edition 02 — 2024
                    </motion.span>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-black tracking-tight">
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                Pure
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="block italic font-light text-black/60"
                            >
                                Form
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="block"
                            >
                                Function
                            </motion.span>
                        </span>
                    </h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="max-w-xs mt-8"
                    >
                        <p className="text-sm font-medium leading-relaxed text-black/70">
                            We believe in spaces that inspire clarity. Our new collection reduces noise to amplify focus.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 lg:mt-0"
                >
                    <MagneticButton>
                        <Link
                            href="/collections"
                            className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-black/60 transition-colors"
                        >
                            <span className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                                <ArrowDownRight size={18} />
                            </span>
                            View Catalog
                        </Link>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Right: Immersive Image */}
            <div className="w-full lg:w-7/12 h-[60vh] lg:h-auto relative overflow-hidden">
                <motion.div style={{ y: yImg }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                    <img
                        src="/uploads/hero_bg.png"
                        alt="Minimalist Workspace"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Floating Product Tag or refined overlay */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-12 right-12 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-lg hidden md:block"
                >
                    <p className="text-xs text-white/80 font-mono mb-1">Featured</p>
                    <p className="text-sm text-white font-bold">The Lounge Chair 01</p>
                </motion.div>
            </div>

        </section>
    );
}

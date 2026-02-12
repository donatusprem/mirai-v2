"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]); // Parallax for text

    return (
        <section className="relative h-[80svh] md:min-h-screen w-full overflow-hidden bg-sand">

            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full z-0">
                <img
                    src="/uploads/hero_bg.png"
                    alt="Mirai Office Aesthetics"
                    className="w-full h-full object-cover object-[75%_center] md:object-center"
                />
                {/* Optional subtle gradient to ensure text readability if needed, though the image looks clean */}
                <div className="absolute inset-0 bg-gradient-to-r from-sand/50 via-transparent to-transparent opacity-50" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 h-full flex items-center relative z-10 pt-20">
                {/* Left: Typography (Editorial Style) */}
                <motion.div
                    style={{ y: y1 }}
                    className="max-w-3xl flex flex-col justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative"
                    >
                        <span className="block text-sm font-bold uppercase tracking-[0.2em] text-olive mb-4">
                            Est. 2024 — Mirai
                        </span>
                        <h1 className="font-serif text-4xl md:text-8xl lg:text-9xl leading-[1.1] lg:leading-[0.9] text-text-heading tracking-tight">
                            Design <br />
                            <span className="italic font-light text-olive">That</span> <br />
                            <span>Breathes.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 max-w-md"
                    >
                        <p className="text-lg text-text-main/80 leading-relaxed font-light">
                            Premium office furniture that blends organic aesthetics with ergonomic precision. Create a workspace that feels like a sanctuary.
                        </p>

                        <div className="mt-8 flex items-center gap-6">
                            <MagneticButton>
                                <Link
                                    href="/collections"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background rounded-full text-sm font-bold uppercase tracking-widest hover:bg-olive transition-colors duration-300 shadow-xl"
                                >
                                    Explore Collection
                                </Link>
                            </MagneticButton>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

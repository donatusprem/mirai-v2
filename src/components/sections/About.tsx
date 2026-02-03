"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax effect: Moving the background image vertically as we scroll
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center">

            {/* Parallax Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
            >
                <img
                    src="/uploads/vision_parallax.png"
                    alt="Our Vision Background"
                    className="w-full h-full object-cover object-center"
                />
            </motion.div>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent z-10" />

            {/* Content Container */}
            <div className="relative container mx-auto px-6 lg:px-12 z-20">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl space-y-6"
                >
                    <span className="block text-sm font-bold uppercase tracking-widest text-olive">About Us</span>
                    <h2 className="text-4xl md:text-5xl font-bold uppercase text-text-heading">Our Vision</h2>
                    <div className="space-y-6 text-lg text-text-main/90 leading-relaxed font-medium">
                        <p>
                            <span className="font-bold text-black">MIRAI</span> is a global furniture brand redefining modern workspaces with world-class office furniture.
                        </p>
                        <p>
                            Rooted in innovation and inspired by international design excellence, Mirai blends aesthetics, comfort, and functionality to create environments where people work better and smarter.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

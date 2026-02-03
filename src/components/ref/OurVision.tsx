"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function OurVision() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax background
    const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section ref={sectionRef} className="relative py-40 min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#fafafa]">

            {/* Background Elements */}
            <div className="absolute inset-0 bg-neutral-100/50" />
            <motion.div
                style={{ y: yParallax }}
                className="absolute right-0 top-1/4 w-[50vw] opacity-10 blur-3xl"
            >
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-full" />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Liquid Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mx-auto glass-panel p-12 md:p-20 rounded-[3rem] text-center"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-12 text-neutral-400">Our Vision</h2>

                    <p className="text-3xl md:text-5xl font-light leading-tight text-neutral-800 tracking-tight">
                        "We believe that the workspace is not just a physical location, but a <strong className="font-semibold text-black">state of mind</strong>.
                        Our mission is to create environments that foster creativity and well-being through <strong className="font-semibold text-black">impeccable craftsmanship</strong>."
                    </p>

                </motion.div>
            </div>
        </section>
    );
}

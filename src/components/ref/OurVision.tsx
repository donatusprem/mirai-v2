"use client";

import { motion } from "framer-motion";

export default function OurVision() {
    return (
        <section className="py-32 bg-neutral-900 text-white flex items-center justify-center relative overflow-hidden">
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-neutral-400">Our Vision</h2>
                    <p className="text-3xl md:text-5xl font-light leading-tight mb-12">
                        "We believe that the workspace is not just a physical location, but a <span className="text-white font-bold">state of mind</span>. Our mission is to create environments that foster creativity, collaboration, and well-being through <span className="text-white font-bold">thoughtful design</span> and <span className="text-white font-bold">impeccable craftsmanship</span>."
                    </p>
                    <div className="w-24 h-1 bg-white mx-auto opacity-20" />
                </motion.div>
            </div>
        </section>
    );
}

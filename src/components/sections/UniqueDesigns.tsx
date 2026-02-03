"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

function MagneticImage({
    src,
    alt,
    className
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.08;
        const deltaY = (e.clientY - centerY) * 0.08;

        x.set(deltaX);
        y.set(deltaY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain rounded-xl"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))" }}
            />
        </motion.div>
    );
}

export default function UniqueDesigns() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 2500], [0, -100]);

    return (
        <section className="py-24 bg-gradient-to-b from-white via-white to-neutral-50/30 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Chair with magnetic effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[300px] md:h-[500px] w-full flex items-center justify-center order-2 lg:order-1"
                    >
                        <motion.div style={{ y: y1 }} className="relative z-10">
                            <MagneticImage
                                src="/uploads/accent-lounge-chair/sch.webp"
                                alt="Designer Chair"
                                className="max-h-[250px] md:max-h-[420px] w-auto cursor-pointer"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 order-1 lg:order-2"
                    >
                        <h3 className="text-3xl font-bold uppercase text-text-heading">Unique Designs</h3>
                        <p className="text-lg text-text-main/80 leading-relaxed">
                            <span className="font-bold text-black">MIRAI</span> stands apart through exclusive designs created by world-famous designers. Our design philosophy blends innovation, elegance, and functionality—resulting in pieces that make a statement while enhancing everyday work experiences.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

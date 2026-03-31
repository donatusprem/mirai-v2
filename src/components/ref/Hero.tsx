"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

// Aurora Background Component
function AuroraBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <motion.div
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-pink-100/40 rounded-full blur-[100px] opacity-70 mix-blend-multiply"
            />
            <motion.div
                animate={{
                    rotate: [360, 0],
                    x: [-50, 50, -50],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-gradient-to-tr from-emerald-50/40 via-teal-50/40 to-blue-50/40 rounded-full blur-[80px] opacity-60 mix-blend-multiply"
            />
        </div>
    );
}

// 3D Tilt Card Component
function TiltCard({ children, className, parallaxY }: { children: React.ReactNode, className?: string, parallaxY?: any }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
    const sheenX = useTransform(mouseX, [-0.5, 0.5], ["0%", "200%"]);

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                y: parallaxY || 0
            }}
            className={`relative perspective-1000 ${className}`}
        >
            {/* Sheen Effect */}
            <motion.div
                style={{ left: sheenX }}
                className="absolute top-0 -inset-full w-1/2 h-full z-20 block bg-gradient-to-r from-transparent to-white/20 -skew-x-12 pointer-events-none"
            />
            {children}
        </motion.div>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const rightImageY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section ref={containerRef} className="relative min-h-[120vh] bg-white pt-32 pb-20 overflow-hidden">

            <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 min-h-[85vh]">

                {/* 1. Headline & CTA */}
                <motion.div
                    style={{ y: textY }}
                    className="relative z-10 w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pt-10"
                >
                    <div className="overflow-hidden mb-6">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl md:text-7xl lg:text-[7rem] leading-[0.9] font-black uppercase tracking-tighter text-neutral-900"
                        >
                            The Art Of <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-400">Work</span>
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden mb-12">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl md:text-7xl lg:text-[7rem] leading-[0.9] font-black uppercase tracking-tighter text-neutral-900"
                        >
                            Elevated.
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col xl:flex-row items-center xl:items-start gap-10 border-t border-black/5 pt-10 w-full"
                    >
                        <Link
                            href="/collections"
                            className="group relative px-10 py-5 bg-black text-white hover:bg-neutral-800 transition-colors flex items-center justify-center whitespace-nowrap"
                        >
                            <span className="relative z-10 font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                                Explore <span>→</span>
                            </span>
                        </Link>

                        <p className="text-xl text-neutral-500 max-w-md font-medium leading-relaxed text-center xl:text-left">
                            We believe a workspace should be more than functional. Our design philosophy bridges the gap between raw ambition and structural serenity, crafting objects that respect your focus.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 2. Furniture Imagery - Large Right-Side 3D Tilt */}
                <div className="flex w-full lg:w-1/2 items-center justify-center perspective-1000 mt-10 lg:mt-0">
                    <TiltCard className="w-full flex justify-center">
                        <img
                            src="/uploads/ref/hero 1.jpg"
                            alt="Modern Office Setup"
                            className="w-full max-w-3xl h-auto object-contain scale-110 lg:scale-125 lg:translate-x-12"
                        />
                    </TiltCard>
                </div>

            </div>
        </section>
    );
}

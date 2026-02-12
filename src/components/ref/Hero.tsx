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

            <AuroraBackground />

            <div className="container mx-auto px-6 lg:px-12 flex flex-col gap-24">

                {/* 1. Headline & CTA */}
                <motion.div
                    style={{ y: textY }}
                    className="relative z-10 max-w-6xl mx-auto text-center md:text-left md:mx-0"
                >
                    <div className="overflow-hidden mb-8">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] font-black uppercase tracking-tighter text-neutral-900"
                        >
                            Office <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-800 to-neutral-400">Furniture</span>
                        </motion.h1>
                    </div>

                    <div className="overflow-hidden mb-12">
                        <motion.h1
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] font-black uppercase tracking-tighter text-neutral-900"
                        >
                            Simplified.
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col md:flex-row items-center gap-10 border-t border-black/5 pt-10"
                    >
                        <Link
                            href="/collections"
                            className="group relative px-10 py-5 bg-black text-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <div className="absolute inset-0 bg-neutral-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 font-bold uppercase tracking-widest text-sm flex items-center gap-3">
                                Shop Now <span>→</span>
                            </span>
                        </Link>

                        <p className="text-xl text-neutral-500 max-w-md font-medium leading-relaxed">
                            Redefining modern workspaces with world-class craftsmanship and liquid design.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 2. Furniture Imagery Grid - Parallax + 3D Tilt */}
                <div className="flex-1 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start perspective-1000">

                    {/* Left: Quality Sofas - Stationary with 3D Tilt */}
                    <TiltCard className="w-full aspect-[4/3] rounded-[3rem] overflow-hidden">
                        <img
                            src="/uploads/ref/hero 1.jpg"
                            alt="Modern Office Setup"
                            className="w-full h-full object-cover scale-110"
                        />

                    </TiltCard>

                    {/* Right: Chairs - Moving Up (Parallax) with 3D Tilt */}
                    <TiltCard
                        parallaxY={rightImageY}
                        className="w-full aspect-[4/3] rounded-[3rem] overflow-hidden mt-0 lg:mt-32"
                    >
                        <img
                            src="/uploads/ref/hero 2.avif"
                            alt="Executive Workspace"
                            className="w-full h-full object-cover scale-110"
                        />

                    </TiltCard>
                </div>

            </div>
        </section>
    );
}

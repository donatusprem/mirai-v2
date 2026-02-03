"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const { items } = useCart();
    const [isHidden, setIsHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setIsHidden(true);
        } else {
            setIsHidden(false);
        }
    });

    // Determine if we are on a dark background (Hero) or light (Scroll). 
    // To keep it simple and robust, we'll use a glass effect or just black/white depending on scroll
    // But since the hero is image-based, we needed mix-blend-difference. 
    // If it's misbehaving, let's switch to a fixed style that works everywhere (e.g. glassmorphism or just white on hero, black elsewhere).
    // The user said "misbehaving", possibly flickering. Let's effectively remove the 'hidden' logic if it feels buggy, 
    // OR just ensure z-index is high enough. z-50 is fine.
    // Let's try to keep it always visible but change background.

    return (
        <motion.header
            variants={{
                visible: { y: 0, backgroundColor: "rgba(255,255,255,0)" },
                hidden: { y: "-100%", backgroundColor: "rgba(255,255,255,0)" },
            }}
            animate={isHidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 flex justify-between items-center text-white mix-blend-difference"
        >
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tighter uppercase">
                Mirai India
            </Link>

            <div className="flex items-center gap-4">
                <Link
                    href="/collections"
                    className="px-6 py-2 rounded-full border border-white/30 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                    Shop Collab
                </Link>
                <Link href="/collections" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <span>Cart ({items.length})</span>
                </Link>
            </div>
        </motion.header>
    );
}

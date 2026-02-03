"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { openCart, totalItems } = useCart();

    // Hide Header on Admin pages
    if (pathname.startsWith("/admin")) return null;

    // Transform background opacity based on scroll
    const headerBackground = useTransform(
        scrollY,
        [0, 50],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
    );

    const headerBorder = useTransform(
        scrollY,
        [0, 50],
        ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.1)"]
    );

    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsScrolled(latest > 50);
        });
    }, [scrollY]);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: "HOME", href: "/" },
        { name: "COLLECTIONS", href: "/collections" },
        { name: "GALLERY", href: "/gallery" },
    ];

    return (
        <>
            <motion.header
                style={{ backgroundColor: headerBackground, borderBottomColor: headerBorder }}
                className="fixed top-0 left-0 right-0 z-40 border-b backdrop-blur-md transition-all duration-300"
            >
                <div className="container mx-auto flex h-20 items-center px-6 lg:px-12">
                    {/* Logo - Left */}
                    <Link href="/" className="relative z-50">
                        <span className="text-2xl font-bold uppercase tracking-[0.2em] text-black">Mirai</span>
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <nav className="hidden md:flex items-center justify-center gap-8 flex-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                data-cursor="hover"
                                className="text-xs font-medium uppercase tracking-widest text-text-main hover:text-black transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Cart Icon - Right */}
                    <button
                        onClick={openCart}
                        className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
                        aria-label="Open cart"
                    >
                        <ShoppingBag size={22} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-olive text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {totalItems > 9 ? "9+" : totalItems}
                            </span>
                        )}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden group relative z-50 h-4 w-8 flex flex-col justify-between focus:outline-none ml-4"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="h-[2px] w-full bg-black block origin-center transition-all"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="h-[2px] w-full bg-black block transition-all"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="h-[2px] w-full bg-black block origin-center transition-all"
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-bold uppercase tracking-widest hover:text-olive transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Liquid Glass Header Effect
    const headerBackground = useTransform(
        scrollY,
        [0, 50],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.7)"]
    );

    const headerBackdropBlur = useTransform(
        scrollY,
        [0, 50],
        ["blur(0px)", "blur(16px)"]
    );

    const headerBorder = useTransform(
        scrollY,
        [0, 50],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.3)"]
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
                style={{
                    backgroundColor: headerBackground,
                    borderBottomColor: headerBorder,
                    backdropFilter: headerBackdropBlur
                }}
                className="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300"
            >
                <div className="container mx-auto flex h-24 items-center justify-between px-6 lg:px-12">
                    {/* Logo */}
                    <Link href="/" className="relative z-50 group">
                        <span className="text-2xl font-black uppercase tracking-[0.2em] text-neutral-900 group-hover:text-neutral-600 transition-colors">Mirai</span>
                    </Link>

                    {/* Desktop Navigation - Centered to match collections page style */}
                    <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Cart/Contact or Empty Right Side - Keeping empty/minimal for now or adding Contact if needed. 
                        User said 'keep what was there from the collections page' which showed links. 
                        I'll leave the mobile menu button on the right. */}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden group relative z-50 h-4 w-8 flex flex-col justify-between focus:outline-none ml-auto"
                    >
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            className="h-[2px] w-full bg-black block origin-center transition-all duration-300"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="h-[2px] w-full bg-black block transition-all duration-300"
                        />
                        <motion.span
                            animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            className="h-[2px] w-full bg-black block origin-center transition-all duration-300"
                        />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-40 bg-white/80 flex flex-col items-center justify-center space-y-8 md:hidden"
                    >
                        {navLinks.map((link, idx) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + idx * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-3xl font-black uppercase tracking-widest text-neutral-900 hover:text-neutral-500 transition-colors"
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

"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();

    // Hide Footer on Admin pages
    if (pathname.startsWith("/admin")) return null;

    return (
        <footer className="bg-neutral-light/50 pt-20 pb-8 border-t border-black/5">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand & Address */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="text-lg font-bold uppercase tracking-widest">Mirai India</h4>
                        <address className="not-italic text-sm leading-relaxed text-text-main/80 space-y-2">
                            <p>#107B, 2nd Floor, 11th Main Road,</p>
                            <p>Appareddipalaya, Indiranagar.</p>
                            <p>Bangalore, Karnataka, 560008.</p>
                        </address>
                        <div className="text-sm space-y-1">
                            <p>+91 9446366222</p>
                            <p>info@themiraiindia.com</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="md:col-span-4 flex justify-between md:justify-around">
                        <div className="space-y-4">
                            <h5 className="text-xs font-bold uppercase tracking-widest text-black/40">Menu</h5>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/collections" className="hover:text-olive transition-colors">Collections</Link></li>
                                <li><Link href="/gallery" className="hover:text-olive transition-colors">Gallery</Link></li>
                                <li><Link href="/about" className="hover:text-olive transition-colors">About</Link></li>
                                <li><Link href="/contact" className="hover:text-olive transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h5 className="text-xs font-bold uppercase tracking-widest text-black/40">Legal</h5>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="/legal/privacy-policy" className="hover:text-olive transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/legal/accessibility" className="hover:text-olive transition-colors">Accessibility</Link></li>
                                <li><Link href="/legal/shipping-policy" className="hover:text-olive transition-colors">Shipping Policy</Link></li>
                                <li><Link href="/legal/terms-conditions" className="hover:text-olive transition-colors">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="md:col-span-4 md:flex md:flex-col md:items-end">
                        <div className="flex gap-4">
                            <Link href="#" className="p-2 border border-black/10 rounded-full hover:bg-olive hover:border-olive hover:text-white transition-all"><Linkedin size={18} /></Link>
                            <Link href="#" className="p-2 border border-black/10 rounded-full hover:bg-olive hover:border-olive hover:text-white transition-all"><Instagram size={18} /></Link>
                            <Link href="#" className="p-2 border border-black/10 rounded-full hover:bg-olive hover:border-olive hover:text-white transition-all"><Facebook size={18} /></Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-main/50 space-y-4 md:space-y-0">
                    <p>&copy; {new Date().getFullYear()} The Mirai India. All rights reserved.</p>
                    <p>www.themiraiindia.com</p>
                </div>
            </div>
        </footer>
    );
}

"use client";

import Link from "next/link";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white pt-24 pb-12">
            <div className="container mx-auto px-6 md:px-12">

                {/* Top Section: Brand & Links */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

                    {/* Brand Section (Col 1-4) */}
                    <div className="md:col-span-4 space-y-6">
                        <Link href="/" className="block">
                            <span className="text-3xl font-black uppercase tracking-[0.2em]">Mirai</span>
                        </Link>
                        <p className="text-neutral-500 max-w-sm leading-relaxed text-sm">
                            Redefining modern workspaces with world-class office furniture.
                        </p>
                    </div>

                    {/* Visit Us (Col 5-8) */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-black">Visit Us</h4>
                        <address className="text-neutral-500 not-italic space-y-2 text-sm leading-loose">
                            <p>#107B, 2nd Floor, 11th Main Road,</p>
                            <p>Appareddipalaya, Indiranagar.</p>
                            <p>Bangalore, Karnataka, 560008.</p>
                        </address>
                    </div>

                    {/* Contact (Col 9-10) */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-black">Contact</h4>
                        <div className="space-y-2 text-neutral-500 text-sm leading-loose">
                            <p>
                                <a href="tel:+919446366222" className="hover:text-black transition-colors">+91 9446366222</a>
                            </p>
                            <p>
                                <a href="mailto:info@themiraiindia.com" className="hover:text-black transition-colors">info@themiraiindia.com</a>
                            </p>
                        </div>
                    </div>

                    {/* Menu (Col 11-12) */}
                    <div className="md:col-span-2">
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-black">Menu</h4>
                        <ul className="space-y-3 text-sm text-neutral-500 font-medium">
                            <li><Link href="/collections" className="hover:text-black transition-colors">Shop</Link></li>
                            <li><Link href="/gallery" className="hover:text-black transition-colors">Gallery</Link></li>
                            <li><Link href="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="border-t border-neutral-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                        &copy; {new Date().getFullYear()} Mirai India. All rights reserved.
                    </p>

                    <div className="flex items-center gap-8">
                        <div className="flex gap-6 text-[10px] text-neutral-400 uppercase tracking-widest font-medium">
                            <Link href="/privacy-policy" className="hover:text-black transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4 text-neutral-400">
                            <a href="#" className="hover:text-black transition-colors"><FaLinkedinIn size={14} /></a>
                            <a href="#" className="hover:text-black transition-colors"><FaInstagram size={14} /></a>
                            <a href="#" className="hover:text-black transition-colors"><FaFacebookF size={14} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

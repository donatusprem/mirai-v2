import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-10">
            <div className="container mx-auto px-6 lg:px-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 border-b border-white/20 pb-20">

                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h2 className="text-2xl font-bold uppercase tracking-tighter mb-6">Mirai India</h2>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Creating workspaces that inspire.<br />
                            Bengaluru, India.
                        </p>
                    </div>

                    {/* Menu */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-50">Menu</h3>
                        <div className="flex flex-col gap-4">
                            <Link href="/collections" className="text-sm hover:text-white/70 transition-colors">Shop</Link>
                            <Link href="/gallery" className="text-sm hover:text-white/70 transition-colors">Gallery</Link>
                            <Link href="/about" className="text-sm hover:text-white/70 transition-colors">About</Link>
                            <Link href="/contact" className="text-sm hover:text-white/70 transition-colors">Contact</Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-50">Legal</h3>
                        <div className="flex flex-col gap-4">
                            <Link href="/legal/privacy-policy" className="text-sm hover:text-white/70 transition-colors">Privacy Policy</Link>
                            <Link href="/legal/shipping-policy" className="text-sm hover:text-white/70 transition-colors">Shipping Policy</Link>
                            <Link href="/legal/terms-conditions" className="text-sm hover:text-white/70 transition-colors">Terms & Conditions</Link>
                            <Link href="/legal/accessibility" className="text-sm hover:text-white/70 transition-colors">Accessibility</Link>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-50">Follow Us</h3>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-white/70 transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-white/70 transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white/70 transition-colors"><Facebook size={20} /></a>
                        </div>
                        <div className="mt-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-50">Contact</h3>
                            <p className="text-sm text-white/80">+91 98765 43210</p>
                            <p className="text-sm text-white/80">hello@miraiindia.com</p>
                        </div>
                    </div>

                </div>

                <div className="text-center">
                    <h1 className="text-[12vw] font-black uppercase tracking-tighter leading-none opacity-20 select-none">
                        Mirai India
                    </h1>
                    <p className="mt-8 text-xs text-white/40">© 2024 Mirai India. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}

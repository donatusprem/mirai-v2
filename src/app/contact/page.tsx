"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, items: [] })
            });

            if (!response.ok) throw new Error("Failed to submit");

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <main className="min-h-screen bg-[#f3f3f3] text-black selection:bg-black selection:text-white overflow-hidden relative">

            {/* Background Magnetic Shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <MagneticShape
                    className="absolute top-[20%] left-[10%] w-64 h-64 bg-[#E6E6FA] rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                    strength={0.2}
                />
                <MagneticShape
                    className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[#FFDAB9] rounded-full mix-blend-multiply filter blur-3xl opacity-70"
                    strength={0.3}
                />
                <MagneticShape
                    className="absolute top-[40%] right-[30%] w-48 h-48 bg-[#E0FFFF] rounded-full mix-blend-multiply filter blur-3xl opacity-60"
                    strength={0.15}
                />
            </div>


            <section className="relative z-10 pt-40 pb-20 px-6 container mx-auto min-h-screen flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

                    {/* Contact Info */}
                    <div className="flex flex-col justify-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.9]"
                        >
                            Get in <br /><span className="text-neutral-400">Touch</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-10 text-lg"
                        >
                            <div className="group">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2">Visit</h3>
                                <p className="font-medium leading-relaxed group-hover:translate-x-2 transition-transform duration-300">
                                    #107B, 2nd Floor, 11th Main Road,<br />
                                    Appareddipalaya, Indiranagar,<br />
                                    Bangalore, Karnataka, 560008.
                                </p>
                            </div>

                            <div className="group">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-2">Contact</h3>
                                <p className="font-medium hover:text-neutral-600 transition-colors">
                                    <a href="mailto:info@themiraiindia.com">info@themiraiindia.com</a>
                                </p>
                                <p className="font-medium hover:text-neutral-600 transition-colors">
                                    <a href="tel:+919446366222">+91 9446366222</a>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/50 backdrop-blur-sm p-10 md:p-16 rounded-[3rem] shadow-sm border border-white/50 relative overflow-hidden"
                    >
                        {/* Subtle form tint */}
                        <div className="absolute inset-0 bg-white/20 z-0" />

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-black focus:outline-none transition-colors text-xl placeholder:text-neutral-300"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-black focus:outline-none transition-colors text-xl placeholder:text-neutral-300"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-black focus:outline-none transition-colors text-xl placeholder:text-neutral-300"
                                    placeholder="+91 98765 43210"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-black focus:outline-none transition-colors text-xl placeholder:text-neutral-300 min-h-[150px] resize-none"
                                    placeholder="Hello..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className="group w-full bg-black text-white py-6 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all flex items-center justify-center gap-4 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10">
                                    {status === "loading" ? "Sending..." :
                                        status === "success" ? "Message Sent!" :
                                            status === "error" ? "Retry" : "Send Message"}
                                </span>
                                {status === "idle" && (
                                    <motion.span
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                        className="relative z-10"
                                    >
                                        →
                                    </motion.span>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

function MagneticShape({ className, strength = 0.5 }: { className: string, strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Normalize mouse position (-1 to 1)
        const x = (clientX / innerWidth - 0.5) * 2;
        const y = (clientY / innerHeight - 0.5) * 2;

        setPosition({ x: x * 50 * strength, y: y * 50 * strength });
    };

    // Global mouse move for background shapes (simplified)
    useEffect(() => {
        const handleWindowMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 100 * strength;
            const y = (clientY / innerHeight - 0.5) * 100 * strength;
            setPosition({ x, y });
        };
        window.addEventListener('mousemove', handleWindowMouseMove);
        return () => window.removeEventListener('mousemove', handleWindowMouseMove);
    }, [strength]);

    return (
        <motion.div
            ref={ref}
            className={className}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        />
    );
}

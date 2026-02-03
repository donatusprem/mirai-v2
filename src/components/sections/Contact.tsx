"use client";

import { useForm } from "react-hook-form";
import { motion, useMotionValue, useSpring } from "framer-motion";
import MagnetButton from "@/components/ui/MagnetButton";
import { useRef } from "react";

type FormData = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
};

// Magnetic shape component
function MagneticShape({
    className
}: {
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.12;
        const deltaY = (e.clientY - centerY) * 0.12;

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
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
}

export default function Contact() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
        alert("Message sent!");
    };

    return (
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50/30">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    <div className="lg:col-span-5 space-y-6">
                        <h2 className="text-4xl font-bold uppercase text-text-heading">Contact Us Today</h2>
                        <p className="text-lg text-text-main/80">
                            Have a question or want to learn more about our collections? Feel free to reach out to us. We're here to assist you.
                        </p>
                        {/* Decorative Magnetic Shapes */}
                        <div className="relative h-40 mt-8">
                            <MagneticShape className="absolute left-0 top-0 w-24 h-24 rounded-full bg-[#C5CDB0]/40 cursor-pointer" />
                            <MagneticShape className="absolute left-32 top-8 w-16 h-16 rounded-xl bg-[#E8B4A0]/40 rotate-12 cursor-pointer" />
                            <MagneticShape className="absolute left-20 bottom-0 w-20 h-20 rounded-full bg-[#E8D5C4]/50 cursor-pointer" />
                            <MagneticShape className="absolute right-20 top-4 w-10 h-10 rounded-full border-2 border-[#A8C5A8]/50 cursor-pointer" />
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest">First Name</label>
                                    <input
                                        {...register("firstName", { required: true })}
                                        className="w-full bg-neutral-50 border-b border-black/10 px-4 py-3 focus:outline-none focus:border-olive transition-colors"
                                        placeholder="John"
                                    />
                                    {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest">Last Name</label>
                                    <input
                                        {...register("lastName", { required: true })}
                                        className="w-full bg-neutral-50 border-b border-black/10 px-4 py-3 focus:outline-none focus:border-olive transition-colors"
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest">Phone</label>
                                    <input
                                        {...register("phone", { required: true })}
                                        className="w-full bg-neutral-50 border-b border-black/10 px-4 py-3 focus:outline-none focus:border-olive transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    {errors.phone && <span className="text-red-500 text-xs">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest">Email</label>
                                    <input
                                        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                        className="w-full bg-neutral-50 border-b border-black/10 px-4 py-3 focus:outline-none focus:border-olive transition-colors"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs">Invalid email</span>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest">Message</label>
                                <textarea
                                    {...register("message")}
                                    rows={4}
                                    className="w-full bg-neutral-50 border-b border-black/10 px-4 py-3 focus:outline-none focus:border-olive transition-colors resize-none"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="pt-4">
                                <MagnetButton type="submit" variant="primary" className="w-full md:w-auto">Send Message</MagnetButton>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}

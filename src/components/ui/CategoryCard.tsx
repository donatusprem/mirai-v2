"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
    title: string;
    description: string;
    image: string;
    bgClass: string;
    href: string;
    delay?: number;
}

export default function CategoryCard({
    title,
    description,
    image,
    bgClass,
    href,
    delay = 0
}: CategoryCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay }}
            className={`relative w-full aspect-[3/4] md:aspect-[4/5] rounded-[2.5rem] overflow-hidden group hover:shadow-2xl transition-all duration-500`}
        >
            <Link href={href} className="absolute inset-0 z-20">
                <span className="sr-only">View {title} collection</span>
            </Link>

            {/* Full Bleed Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                        {title}
                    </h3>
                    <p className="text-white/80 font-medium text-sm md:text-base max-w-[90%] leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Arrow Button - Visual Only */}
                <div className="absolute bottom-8 right-8 pointer-events-auto">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

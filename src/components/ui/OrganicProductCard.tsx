"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
    id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    bgClass?: string;
    delay?: number;
}

export default function OrganicProductCard({
    id,
    title,
    category,
    price,
    image,
    bgClass = "bg-sage",
    delay = 0
}: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay }}
            className="group relative flex flex-col items-center"
        >
            {/* Image Container (Organic Shape) */}
            <div className={`relative w-full aspect-[4/5] ${bgClass} rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:rounded-[3rem]`}>

                {/* Image */}
                <motion.img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                {/* Quick Add Button (Appears on Hover) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-20 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors shadow-xl">
                        View Details
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-6 text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-olive/60">{category}</span>
                <h3 className="text-xl font-serif text-text-heading">{title}</h3>
                <p className="text-sm font-medium text-text-main">₹{price.toLocaleString()}</p>
            </div>
        </motion.div>
    );
}

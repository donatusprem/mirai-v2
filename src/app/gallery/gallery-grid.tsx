"use client";

import { motion } from "framer-motion";
import { GalleryItem } from "@/lib/data";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {items.map((item, idx) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`relative overflow-hidden rounded-2xl ${item.size || "col-span-1"} bg-neutral-100 group hover:shadow-xl transition-shadow duration-500`}
                >
                    {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-300 bg-neutral-50">
                            No Image
                        </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-white font-bold uppercase tracking-widest text-sm">{item.title}</span>
                        {item.description && <p className="text-white/80 text-xs mt-1 line-clamp-2">{item.description}</p>}
                    </div>
                </motion.div>
            ))}

            {items.length === 0 && (
                <div className="col-span-full py-20 text-center text-neutral-400">
                    <p>No projects to display yet. Check back soon!</p>
                </div>
            )}
        </div>
    );
}

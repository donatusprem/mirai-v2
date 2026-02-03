"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

// Mock data based on the categories seen in video (Phone Booths, Sofas, etc.)
const items = [
    { id: 1, title: "Phone Booths", image: "/uploads/ref/9eaf23_8cec7df0062a42528ee116ee4c03cbd1~mv2.avif", link: "/collections?category=Phone Booths" },
    { id: 2, title: "Modular Sofas", image: "/uploads/ref/11062b_ef91de418bee499b82b3a02752c23438~mv2_d_2301_1536_s_2.avif", link: "/collections?category=Sofas" },
    { id: 3, title: "Executive Desks", image: "/uploads/ref/9eaf23_7ec867a764ba4e7d94e754dba5ce8965~mv2.avif", link: "/collections?category=Desks" },
    { id: 4, title: "Lounge Chairs", image: "/uploads/ref/Modern Orange Wire Chair.avif", link: "/collections?category=Lounge" },
    { id: 5, title: "Workstations", image: "/uploads/ref/9eaf23_c013e69393c9400b9c987cd9fed03bb5~mv2.avif", link: "/collections?category=Workstations" },
];

export default function HorizontalScroll() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-100">
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                <div className="px-12 mb-8 flex justify-between items-end">
                    <div>
                        <h2 className="text-4xl font-bold uppercase tracking-tight mb-2">Collections</h2>
                        <p className="text-black/60 max-w-sm">Explore our wide range of premium office solutions tailored for productivity.</p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1">Scroll to Explore</span>
                </div>

                <motion.div style={{ x }} className="flex gap-12 px-12">
                    {items.map((item) => (
                        <Link href={item.link} key={item.id} className="group relative h-[60vh] aspect-[3/4] shrink-0 overflow-hidden bg-white shadow-xl rounded-none">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.5 }}
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 p-6 bg-white/90 w-full">
                                <h3 className="text-lg font-bold uppercase tracking-wide">{item.title}</h3>
                            </div>
                        </Link>
                    ))}
                    <div className="h-[60vh] aspect-[3/4] shrink-0 flex items-center justify-center bg-black text-white">
                        <Link href="/collections" className="text-2xl font-bold uppercase tracking-tight hover:text-white/70 transition-colors">
                            View All <br /> Collections
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

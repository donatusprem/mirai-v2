"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { motion } from "framer-motion";

const categories = [
    {
        id: "1",
        title: "Iconic Seating",
        description: "Ergonomic excellence for the modern professional.",
        image: "/uploads/swivel-chair/sch.webp",
        bgClass: "bg-sage",
        href: "/collections?category=Chairs"
    },
    {
        id: "2",
        title: "Executive Suites",
        description: "Premium desks and statement workspaces.",
        image: "/uploads/table/acme-chennai-table.webp",
        bgClass: "bg-clay",
        href: "/collections?category=Desks"
    },
    {
        id: "3",
        title: "Lounge & Social",
        description: "Relaxed seating for collaborative spaces.",
        image: "/uploads/accent-lounge-chair/ehee.webp",
        bgClass: "bg-mist",
        href: "/collections?category=Lounge"
    },
    {
        id: "4",
        title: "Reception Areas",
        description: "Welcoming designs that make a first impression.",
        image: "/uploads/2-seater-sofa/sch.webp",
        bgClass: "bg-sand",
        href: "/collections?category=Sofas"
    }
];

export default function FeaturedCollection() {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <span className="block text-sm font-bold uppercase tracking-widest text-olive mb-4">Browse by Category</span>
                        <h2 className="font-serif text-5xl md:text-6xl text-text-heading leading-tight">
                            Design for Every <br /> <span className="italic text-olive font-light">Need.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <a href="/collections" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-olive transition-colors">
                            View All Collections
                            <span className="block h-px w-8 bg-black group-hover:bg-olive transition-colors" />
                        </a>
                    </motion.div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, index) => (
                        <CategoryCard
                            key={cat.id}
                            title={cat.title}
                            description={cat.description}
                            image={cat.image}
                            bgClass={cat.bgClass}
                            href={cat.href}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

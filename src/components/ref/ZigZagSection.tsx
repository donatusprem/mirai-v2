"use client";

import { motion } from "framer-motion";

export default function ZigZagSection() {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6 lg:px-12">

                {/* Row 1: Quality */}
                <div className="flex flex-col md:flex-row items-center gap-20 mb-32">
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-square overflow-hidden bg-neutral-100">
                            <motion.img
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                                src="/uploads/ref/9eaf23_33e9cae6a08248018c35cd0508cfe5ad~mv2.avif"
                                alt="Quality"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">Quality Products</h2>
                            <p className="text-lg text-black/60 leading-relaxed mb-8">
                                We source only the finest materials to ensure durability and aesthetic appeal. Every piece is crafted with precision to meet global standards.
                            </p>
                            <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">
                                Learn More
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Row 2: Unique Designs */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="relative aspect-square overflow-hidden bg-neutral-100">
                            <motion.img
                                initial={{ scale: 1.2 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 1.5 }}
                                src="/uploads/ref/9eaf23_f28b6f08fd0e49cfb307f693884e5717~mv2.avif"
                                alt="Design"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-6">Unique Designs</h2>
                            <p className="text-lg text-black/60 leading-relaxed mb-8">
                                Stand out with furniture that speaks volumes. Our collaborative design process ensures that your workspace is truly one-of-a-kind.
                            </p>
                            <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors">
                                View Projects
                            </button>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
}

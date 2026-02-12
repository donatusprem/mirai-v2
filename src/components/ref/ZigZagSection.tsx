"use client";

import { motion } from "framer-motion";

export default function ZigZagSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">

                <div className="text-center mb-24">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Why Us</h2>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">The Mirai Difference</h3>
                </div>

                <div className="grid grid-cols-1 gap-32">

                    {/* Feature 1: Quality (Image Left, Text Right) */}
                    <FeatureCard
                        title="Quality Products"
                        description="Uncompromising quality. Every product is crafted using premium materials, advanced manufacturing processes, and rigorous quality controls to meet global standards."
                        image="/uploads/ref/quality.avif"
                        reversed={false}
                    />

                    {/* Feature 2: Unique Designs (Image Right, Text Left) */}
                    <FeatureCard
                        title="Unique Designs"
                        description="Exclusive designs created by world-famous designers. Our design philosophy blends innovation, elegance, and functionality."
                        image="/uploads/ref/unique designs.avif"
                        reversed={true}
                    />

                    {/* Feature 3: Exclusive Pieces (Image Left, Text Right) */}
                    <FeatureCard
                        title="Exclusive Pieces"
                        description="Limited design availability, refined detailing, and a strong design identity make Mirai furniture truly one of a kind."
                        image="/uploads/ref/exclusive pieces.avif"
                        reversed={false}
                    />

                </div>
            </div>
        </section>
    );
}

function FeatureCard({ title, description, image, reversed }: { title: string, description: string, image: string, reversed: boolean }) {
    return (
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch gap-8 md:gap-16`}>

            {/* Image Side */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2"
            >
                <div className="h-full rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-100">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </motion.div>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, x: reversed ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="w-full md:w-1/2 flex items-center"
            >
                <div className="glass-panel p-10 md:p-16 rounded-[3rem] w-full border border-white/50 bg-white/60 backdrop-blur-xl">
                    <h4 className="text-3xl font-black uppercase tracking-tight mb-6">{title}</h4>
                    <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

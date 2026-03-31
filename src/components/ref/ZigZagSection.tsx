"use client";

import { motion } from "framer-motion";

export default function ZigZagSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">Our Philosophy</h2>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">The Mirai Ethos</h3>
                </div>
            </div>

            <div className="flex flex-col w-full">

                {/* Feature 1: Quality (Image Left, Text Right) */}
                <FeatureCard
                    title="Material Integrity"
                    description="We strip away the unnecessary until nothing but the essential remains. By sourcing uncompromised materials and obsessing over the structural integrity of every weld and joint, we ensure each piece outlasts the trends."
                    image="/uploads/ref/quality.avif"
                    reversed={false}
                />

                {/* Feature 2: Unique Designs (Image Right, Text Left) */}
                <FeatureCard
                    title="Intentional Silhouettes"
                    description="We reject the visual noise of traditional office furniture. Our aesthetics lean into stark minimalism and architectural precision, creating objects that demand attention without ever asking for it."
                    image="/uploads/ref/unique designs.avif"
                    reversed={true}
                />

                {/* Feature 3: Exclusive Pieces (Image Left, Text Right) */}
                <FeatureCard
                    title="Curated Rarity"
                    description="Mass production dilutes soul. We operate on a philosophy of controlled curation—producing limited runs with exacting standards, ensuring the pieces that shape your space remain distinctively yours."
                    image="/uploads/ref/exclusive pieces.avif"
                    reversed={false}
                />

            </div>
        </section>
    );
}

function FeatureCard({ title, description, image, reversed }: { title: string, description: string, image: string, reversed: boolean }) {
    return (
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch w-full min-h-[60vh] border-t border-neutral-100`}>

            {/* Image Side - Bleeding to screen edge */}
            <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 relative min-h-[40vh] md:min-h-full"
            >
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </motion.div>

            {/* Content Side */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 lg:p-32 bg-white"
            >
                <div className="max-w-xl w-full">
                    <h4 className="text-3xl lg:text-4xl font-black uppercase tracking-tight mb-8 text-neutral-900">{title}</h4>
                    <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                        {description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

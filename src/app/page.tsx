"use client";

import Hero from "@/components/ref/Hero";
import HorizontalScroll from "@/components/ref/HorizontalScroll";
import ZigZagSection from "@/components/ref/ZigZagSection";
import OurVision from "@/components/ref/OurVision";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
            <Hero />
            <OurVision />
            <HorizontalScroll />
            <ZigZagSection />
        </main>
    );
}

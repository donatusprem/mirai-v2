import Hero from "@/components/ref/Hero";
import HorizontalScroll from "@/components/ref/HorizontalScroll";
import ZigZagSection from "@/components/ref/ZigZagSection";
import Header from "@/components/ref/Header";
import Footer from "@/components/ref/Footer";
import OurVision from "@/components/ref/OurVision";

export default function Home() {
    return (
        <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
            <Header />
            <Hero />
            <OurVision />
            <HorizontalScroll />
            <ZigZagSection />
            <Footer />
        </main>
    );
}

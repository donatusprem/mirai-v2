import { getGalleryItems } from "@/lib/data";
import GalleryGrid from "./gallery-grid";
import { motion } from "framer-motion"; // Note: Server components can't use framer-motion directly for themselves usually, but we are wrapping the grid. 
// Actually, let's keep the header static or move it to client component if we want animation.
// For simplicity, we'll keep the whole page as a server component and use separate Client header if needed, or just standard HTML for header.

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-6 lg:px-12">

                <div className="mb-20">
                    <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tight text-text-heading mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Gallery
                    </h1>
                    <p className="max-w-xl text-lg text-text-main/80 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
                        Visual stories from completed projects and workspaces around the world designed with Mirai furniture.
                    </p>
                </div>

                <GalleryGrid items={items} />

            </div>
        </main>
    );
}

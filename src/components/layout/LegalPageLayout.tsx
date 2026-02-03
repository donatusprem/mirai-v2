import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface LegalPageLayoutProps {
    title: string;
    lastUpdated?: string;
    children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">

                {/* Back Link */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/40 hover:text-olive transition-colors">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-16 border-b border-black/5 pb-8">
                    <h1 className="font-serif text-4xl md:text-5xl text-text-heading mb-4 leading-tight">
                        {title}
                    </h1>
                    {lastUpdated && (
                        <p className="text-sm text-text-main/60 uppercase tracking-wide">
                            Last Updated: {lastUpdated}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:text-text-main/80 prose-li:text-text-main/80 prose-a:text-olive hover:prose-a:text-olive/80 transition-colors">
                    {children}
                </div>
            </div>
        </main>
    );
}

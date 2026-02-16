import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Product {
    id: number | string;
    name: string;
    category: string;
    price?: number;
    image?: string;
    images?: string[]; // Gallery
    color?: string;
}

interface ProductCardProps {
    product: Product;
    index?: number;
    onClick?: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, onClick }: ProductCardProps) {
    const { addItem } = useCart();
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) {
            e.preventDefault();
            onClick(product);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            category: product.category,
            image: product.images?.[0] || product.image,
            price: product.price,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ duration: 0.4 }}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-50 shadow-sm hover:shadow-md transition-all duration-500"
        >
            {/* Clickable overlay for product details */}
            <div onClick={handleClick} className="absolute inset-0 z-10 cursor-pointer" />

            {/* Background/Image Placeholder */}
            <div className={`absolute inset-0 ${product.color || "bg-neutral-50"} transition-colors duration-500`} />

            {/* Abstract Shape/Image Simulation & Loading State */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                {/* Visual placeholder while loading or if no image */}
                <div className="h-40 w-40 rounded-full bg-white/30 backdrop-blur-md group-hover:scale-110 transition-transform duration-700 ease-out shadow-inner" />

                {(product.images?.[0] || product.image) && (
                    <>
                        {/* Primary Image */}
                        <Image
                            src={product.images?.[0] || product.image || ""}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className={`object-cover transition-opacity duration-700 ease-in-out ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImageLoaded(true)}
                            quality={100}
                            unoptimized={true}
                        />

                        {/* Secondary Image (Hover) */}
                        {product.images?.[1] && (
                            <Image
                                src={product.images[1]}
                                alt={`${product.name} - View 2`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                                quality={100}
                                unoptimized={true}
                            />
                        )}

                        {/* Loading Overlay - Frosted Glass Effect */}
                        {!imageLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/50 backdrop-blur-sm z-10 transition-opacity duration-500">
                                <div className="w-8 h-8 rounded-full border-2 border-olive/30 border-t-olive animate-spin" />
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Add to Quote Button */}
            <button
                onClick={handleAddToCart}
                className="absolute top-4 right-4 z-20 p-3 bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm hover:shadow-lg hover:bg-white/60 hover:scale-105 active:scale-95 transition-all duration-300 transform text-black group-hover:opacity-100"
                title="Add to Quote"
            >
                <Plus size={20} />
            </button>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="font-bold uppercase text-sm tracking-wide text-black">{product.name}</h3>
                        <p className="text-xs text-black/60 mt-1">{product.category}</p>
                    </div>
                    {product.price && (
                        <span className="text-sm font-medium text-olive">₹{product.price.toLocaleString('en-IN')}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

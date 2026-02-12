"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagnetButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: React.ReactNode;
    variant?: "primary" | "outline" | "ghost";
}

export default function MagnetButton({
    children,
    className,
    variant = "outline",
    ...props
}: MagnetButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const x = (clientX - (left + width / 2)) * 0.35; // Magnetic pull strength
        const y = (clientY - (top + height / 2)) * 0.35;

        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative px-8 py-3 uppercase text-sm tracking-widest transition-colors duration-300 ease-out flex items-center justify-center cursor-none";

    const variants = {
        primary: "bg-olive text-white border border-olive hover:bg-olive/90",
        outline: "border border-current hover:text-white group overflow-hidden",
        ghost: "border-transparent hover:bg-neutral-light",
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {variant === "outline" && (
                <span className="absolute inset-0 bg-olive translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out -z-10" />
            )}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MouseFollower() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [hoverText, setHoverText] = useState("");

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 10); // Center the 20px cursor (was 32px/16)
            mouseY.set(e.clientY - 10);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("[data-cursor='hover']")) {
                setIsHovering(true);
            }
            if (target.closest("[data-cursor-text]")) {
                const text = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text") || "";
                setHoverText(text);
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("[data-cursor='hover']") || target.closest("[data-cursor-text]")) {
                setIsHovering(false);
                setHoverText("");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleMouseEnter); // Use delegation
        document.addEventListener("mouseout", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cursorRef}
            className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full border border-olive/50 bg-olive/10 backdrop-blur-[1px] hidden md:flex"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            animate={{
                width: isHovering ? 60 : 20,
                height: isHovering ? 60 : 20,
                x: isHovering ? -20 : 0, // Adjust offset to keep centered (60-20)/2 = 20
                y: isHovering ? -20 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovering && hoverText ? 1 : 0 }}
                className="text-[10px] font-bold uppercase tracking-widest text-olive"
            >
                {hoverText}
            </motion.span>
        </motion.div>
    );
}

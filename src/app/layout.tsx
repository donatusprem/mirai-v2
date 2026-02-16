import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import MouseFollower from "@/components/ui/MouseFollower";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import CartPanel from "@/components/ui/CartPanel";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { ToastProvider } from "@/components/ui/Toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIRAI | Office Furniture, Simplified",
  description: "Complete office furniture solutions for modern, premium workplaces. Redefining modern workspaces with world-class office furniture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          poppins.variable,
          "antialiased bg-background text-text-main font-sans selection:bg-olive selection:text-white"
        )}
      >
        <CartProvider>
          <ToastProvider>
            <SmoothScroll />
            <MouseFollower />
            <Header />
            {children}
            <Footer />
            <CartPanel />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";

export default function CartPanel() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems } = useCart();
    const [showQuoteForm, setShowQuoteForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    items: items.map(item => ({
                        id: item.id,
                        name: item.name,
                        category: item.category,
                        quantity: item.quantity
                    }))
                })
            });

            if (response.ok) {
                setSubmitted(true);
                clearCart();
                setTimeout(() => {
                    setSubmitted(false);
                    setShowQuoteForm(false);
                    closeCart();
                }, 3000);
            }
        } catch (error) {
            console.error("Failed to submit enquiry", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-black/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={24} />
                                <h2 className="text-xl font-bold uppercase tracking-wide">Quote Cart</h2>
                                <span className="bg-olive text-white text-xs px-2 py-1 rounded-full">
                                    {totalItems}
                                </span>
                            </div>
                            <button onClick={closeCart} className="p-2 hover:bg-neutral-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-6">
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-neutral-200 bg-neutral-50 h-max my-auto">
                                    <div className="mb-6 opacity-80">
                                        <svg className="w-12 h-12 mx-auto text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Request Received</h3>
                                    <p className="text-neutral-600 font-medium leading-relaxed">
                                        Thank you for your interest. A Mirai representative will review your selected items and contact you with a formalized quote shortly.
                                    </p>
                                </div>
                            ) : showQuoteForm ? (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h3 className="font-bold text-lg mb-4">Contact Information</h3>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-black/10 rounded-none focus:outline-none focus:border-olive"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-black/10 rounded-none focus:outline-none focus:border-olive"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-black/10 rounded-none focus:outline-none focus:border-olive"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Company</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 border border-black/10 rounded-none focus:outline-none focus:border-olive"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Message</label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-black/10 rounded-none focus:outline-none focus:border-olive resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowQuoteForm(false)}
                                            className="flex-1 py-3 border border-black/10 rounded-none hover:bg-neutral-50 font-bold uppercase tracking-widest text-xs"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex-1 py-3 bg-neutral-900 text-white rounded-none hover:bg-black disabled:opacity-50 font-bold uppercase tracking-widest text-xs"
                                        >
                                            {isSubmitting ? "Sending..." : "Submit Quote"}
                                        </button>
                                    </div>
                                </form>
                            ) : items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <ShoppingBag size={48} className="text-black/20 mb-4" />
                                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                                    <p className="text-black/60 mb-6">Add products to request a quote</p>
                                    <Link
                                        href="/collections"
                                        onClick={closeCart}
                                        className="px-6 py-4 bg-black text-white rounded-none hover:bg-black/80 font-bold uppercase tracking-widest text-xs"
                                    >
                                        Browse Collections
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 border border-neutral-100 bg-neutral-50 rounded-none">
                                            {item.image && (
                                                <div className="w-20 h-20 bg-neutral-200 rounded-none overflow-hidden flex-shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold uppercase tracking-wide text-sm truncate">{item.name}</h4>
                                                <p className="text-xs text-black/60 uppercase tracking-widest mt-1">{item.category}</p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 border border-black/10 hover:bg-neutral-200 rounded-none"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 border border-black/10 hover:bg-neutral-200 rounded-none"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 hover:bg-red-100 hover:text-red-600 rounded-none self-start"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && !showQuoteForm && !submitted && (
                            <div className="p-6 border-t border-black/10 space-y-4 bg-white/50 backdrop-blur-md">
                                <div className="flex justify-between text-sm uppercase tracking-widest font-bold">
                                    <span className="text-black/60">Total items</span>
                                    <span>{totalItems}</span>
                                </div>
                                <button
                                    onClick={() => setShowQuoteForm(true)}
                                    className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-all rounded-none block border border-black hover:-translate-y-1 hover:shadow-[0_10px_0_0_rgba(0,0,0,1)]"
                                >
                                    Proceed to Submit
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full py-3 text-sm text-black/60 hover:text-red-600"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

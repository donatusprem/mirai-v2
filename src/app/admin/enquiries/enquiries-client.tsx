"use client";

import { useState, useEffect } from "react";
import { Mail, Eye, CheckCircle, Clock, Trash2, ChevronDown, ChevronUp } from "lucide-react";

interface EnquiryItem {
    id: number | string;
    name: string;
    category: string;
    quantity: number;
}

interface Enquiry {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message?: string;
    items: EnquiryItem[];
    status: "new" | "contacted" | "completed";
    createdAt: string;
}

export default function EnquiriesClient() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [filter, setFilter] = useState<"all" | "new" | "contacted" | "completed">("all");

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const res = await fetch("/api/enquiry");
            const data = await res.json();
            setEnquiries(data);
        } catch (error) {
            console.error("Failed to fetch enquiries", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, status: "new" | "contacted" | "completed") => {
        try {
            await fetch(`/api/enquiry/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            setEnquiries(prev =>
                prev.map(e => e.id === id ? { ...e, status } : e)
            );
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const filteredEnquiries = filter === "all"
        ? enquiries
        : enquiries.filter(e => e.status === filter);

    const statusColors = {
        new: "bg-blue-100 text-blue-700",
        contacted: "bg-amber-100 text-amber-700",
        completed: "bg-green-100 text-green-700"
    };

    const statusIcons = {
        new: Mail,
        contacted: Clock,
        completed: CheckCircle
    };

    const stats = {
        total: enquiries.length,
        new: enquiries.filter(e => e.status === "new").length,
        contacted: enquiries.filter(e => e.status === "contacted").length,
        completed: enquiries.filter(e => e.status === "completed").length
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-2 border-olive border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-black/5">
                    <p className="text-sm text-black/60">Total</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-600">New</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.new}</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <p className="text-sm text-amber-600">Contacted</p>
                    <p className="text-2xl font-bold text-amber-700">{stats.contacted}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-green-600">Completed</p>
                    <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                {(["all", "new", "contacted", "completed"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                ? "bg-black text-white"
                                : "bg-neutral-100 text-black/60 hover:bg-neutral-200"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Enquiries List */}
            {filteredEnquiries.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-black/5">
                    <Mail size={48} className="mx-auto text-black/20 mb-4" />
                    <h3 className="text-lg font-medium text-black/40">No enquiries yet</h3>
                    <p className="text-sm text-black/30 mt-1">Quote requests will appear here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredEnquiries.map((enquiry) => {
                        const StatusIcon = statusIcons[enquiry.status];
                        const isExpanded = expandedId === enquiry.id;

                        return (
                            <div
                                key={enquiry.id}
                                className="bg-white rounded-xl border border-black/5 overflow-hidden"
                            >
                                {/* Header */}
                                <div
                                    onClick={() => setExpandedId(isExpanded ? null : enquiry.id)}
                                    className="p-4 flex items-center gap-4 cursor-pointer hover:bg-neutral-50 transition-colors"
                                >
                                    <div className={`p-2 rounded-lg ${statusColors[enquiry.status]}`}>
                                        <StatusIcon size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium truncate">{enquiry.name}</h3>
                                            {enquiry.company && (
                                                <span className="text-xs text-black/40">- {enquiry.company}</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-black/60 truncate">{enquiry.email}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-black/40">
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm font-medium">{enquiry.items.length} items</p>
                                    </div>
                                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                </div>

                                {/* Expanded Content */}
                                {isExpanded && (
                                    <div className="px-4 pb-4 border-t border-black/5 pt-4">
                                        {/* Contact Info */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <p className="text-xs text-black/40 mb-1">Phone</p>
                                                <p className="text-sm">{enquiry.phone || "Not provided"}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-black/40 mb-1">Email</p>
                                                <a href={`mailto:${enquiry.email}`} className="text-sm text-olive hover:underline">
                                                    {enquiry.email}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Message */}
                                        {enquiry.message && (
                                            <div className="mb-4">
                                                <p className="text-xs text-black/40 mb-1">Message</p>
                                                <p className="text-sm bg-neutral-50 p-3 rounded-lg">{enquiry.message}</p>
                                            </div>
                                        )}

                                        {/* Items */}
                                        <div className="mb-4">
                                            <p className="text-xs text-black/40 mb-2">Requested Items</p>
                                            <div className="space-y-2">
                                                {enquiry.items.map((item, idx) => (
                                                    <div key={idx} className="flex justify-between bg-neutral-50 p-2 rounded-lg text-sm">
                                                        <span>{item.name}</span>
                                                        <span className="text-black/60">×{item.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateStatus(enquiry.id, "new")}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${enquiry.status === "new"
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                    }`}
                                            >
                                                New
                                            </button>
                                            <button
                                                onClick={() => updateStatus(enquiry.id, "contacted")}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${enquiry.status === "contacted"
                                                        ? "bg-amber-600 text-white"
                                                        : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                                    }`}
                                            >
                                                Contacted
                                            </button>
                                            <button
                                                onClick={() => updateStatus(enquiry.id, "completed")}
                                                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${enquiry.status === "completed"
                                                        ? "bg-green-600 text-white"
                                                        : "bg-green-100 text-green-700 hover:bg-green-200"
                                                    }`}
                                            >
                                                Completed
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

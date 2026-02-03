import LegalPageLayout from "@/components/layout/LegalPageLayout";

export default function ContactPage() {
    return (
        <LegalPageLayout title="Contact Us">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 not-prose">
                <div>
                    <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
                    <p className="text-text-main/80 mb-6">
                        Have a question about our products or need help with a custom order? We'd love to hear from you.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <p className="font-bold text-sm uppercase tracking-wide opacity-60">Visit Us</p>
                            <p>#107B, 2nd Floor, 11th Main Road,<br />Appareddipalaya, Indiranagar,<br />Bangalore, Karnataka, 560008.</p>
                        </div>
                        <div>
                            <p className="font-bold text-sm uppercase tracking-wide opacity-60">Call Us</p>
                            <p>+91 9446366222</p>
                        </div>
                        <div>
                            <p className="font-bold text-sm uppercase tracking-wide opacity-60">Email Us</p>
                            <p>info@themiraiindia.com</p>
                        </div>
                    </div>
                </div>

                <div className="bg-neutral-50 p-8 rounded-2xl border border-black/5">
                    <form className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Name</label>
                            <input type="text" className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Email</label>
                            <input type="email" className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-olive transition-colors" placeholder="name@company.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Message</label>
                            <textarea className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-olive transition-colors h-32 resize-none" placeholder="How can we help you?" />
                        </div>
                        <button type="button" className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-olive transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </LegalPageLayout>
    );
}

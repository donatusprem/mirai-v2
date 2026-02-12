'use client';

import { login } from '../actions';
import { useActionState } from 'react';

const initialState = {
    error: '',
};

export default function LoginPage() {
    // @ts-ignore
    const [state, formAction] = useActionState(login, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-black/5">
                <h1 className="text-2xl font-bold mb-6 text-center uppercase tracking-tight">Admin Access</h1>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-black/60">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {state?.error && (
                        <p className="text-red-500 text-sm animate-pulse">{state.error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-neutral-800 transition-all"
                    >
                        Enter
                    </button>
                </form>
            </div>
        </div>
    );
}

import type { ReactNode } from 'react'

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-100">
            <header className="border-b border-slate-200 bg-white px-6 py-4">
                <h1 className="text-xl font-bold text-slate-900">
                    Task Tracker
                </h1>
            </header>

            <main className="mx-auto max-w-6xl p-6">
                {children}
            </main>
        </div>
    )
}
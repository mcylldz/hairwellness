import React, { useState, useEffect } from 'react';
import { Lock, Users, ArrowDownNarrowWide, Activity, LogOut, ChevronRight, Bug } from 'lucide-react';
import { SURVEY_STEPS } from '../constants';

export const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [stats, setStats] = useState<any>(null);
    const [rawData, setRawData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const loginCode = (import.meta as any).env.VITE_LOGIN_CODE || 'admin123';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === loginCode) {
            setIsAuthenticated(true);
            fetchStats();
        } else {
            alert('Wrong code');
        }
    };

    const tryParse = (data: any): any => {
        if (typeof data === 'string') {
            try {
                return tryParse(JSON.parse(data));
            } catch (e) {
                return data;
            }
        }
        if (Array.isArray(data)) {
            // If strictly one element, unwrap it
            if (data.length === 1) return tryParse(data[0]);
            return data;
        }
        // Check for common wrappers like { data: ... } or { output: ... } if they exist and seem to wrap the real content
        if (data && typeof data === 'object' && !data.totalVisits && data.data) {
            return tryParse(data.data);
        }
        return data;
    }

    const fetchStats = async () => {
        setLoading(true);
        const statsUrl = (import.meta as any).env.VITE_STATS_URL;

        if (statsUrl) {
            try {
                // Add timestamp to prevent caching
                const res = await fetch(`${statsUrl}?t=${Date.now()}`);
                const data = await res.json();

                console.log("Raw Admin Data:", data);
                setRawData(data); // Save for debug view

                const parsed = tryParse(data);
                console.log("Parsed Admin Data:", parsed);

                setStats(parsed);
            } catch (e) {
                console.error("Failed to fetch stats", e);
                // Fallback to dummy for demo if fetch totally fails (network error)
                // But if we got a response that just failed to parse, we might want to see that.
                // For now, let's only generate dummy if we have NO data.
                if (!stats) generateDummyStats();
            }
        } else {
            generateDummyStats();
        }
        setLoading(false);
    };

    const generateDummyStats = () => {
        // Mocking drop-offs based on user example: 30 at step 4, 20 at step 5
        const mockSteps = SURVEY_STEPS.map((step, i) => ({
            index: i,
            title: step.title,
            count: Math.max(0, 100 - (i * 8) - (i > 4 ? 10 : 0)) // Simulated decay
        }));

        setStats({
            totalVisits: 1240,
            conversions: 42,
            stepData: mockSteps
        });
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                    <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <Lock className="w-8 h-8 text-cyan-600" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 text-center mb-2">Admin Access</h1>
                    <p className="text-slate-500 text-center text-sm mb-8">Enter your secure login code to continue.</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            placeholder="Login Code"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-cyan-500 outline-none transition-all text-center text-lg font-bold tracking-widest"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
                        >
                            Enter Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Admin Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white">
                        <Activity className="w-5 h-5" />
                    </div>
                    <span className="font-black text-slate-900 uppercase tracking-tight">Mesu Admin</span>
                </div>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </header>

            <main className="max-w-2xl mx-auto px-6 pt-8">
                {/* Scorecards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <Users className="w-6 h-6 text-cyan-500 mb-2" />
                        <div className="text-2xl font-black text-slate-900">{stats?.totalVisits || 0}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Visits</div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <Activity className="w-6 h-6 text-green-500 mb-2" />
                        <div className="text-2xl font-black text-slate-900">{stats?.conversions || 0}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Purchases</div>
                    </div>
                </div>

                {/* Funnel Section */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="font-black text-slate-900 uppercase tracking-tight flex items-center">
                            <ArrowDownNarrowWide className="w-5 h-5 mr-2 text-cyan-500" />
                            Drop-off Funnel
                        </h2>
                        <button onClick={fetchStats} className="text-[10px] font-black text-cyan-500 uppercase tracking-widest bg-cyan-50 px-2 py-1 rounded">Refresh</button>
                    </div>

                    <div className="p-2">
                        {(stats?.stepData || []).map((step: any, idx: number) => {
                            const prevStepCount = idx > 0 && stats?.stepData?.[idx - 1] ? stats.stepData[idx - 1].count : (stats?.totalVisits || 0);
                            const dropPercentage = prevStepCount > 0 ? Math.round(((prevStepCount - step.count) / prevStepCount) * 100) : 0;

                            return (
                                <div key={idx} className="group">
                                    {idx > 0 && dropPercentage > 1 && (
                                        <div className="flex items-center px-6 py-1">
                                            <div className="w-1.5 h-6 border-l-2 border-dashed border-red-200 ml-3" />
                                            <span className="text-[10px] font-bold text-red-400 bg-red-50 px-1.5 py-0.5 rounded ml-4">-{dropPercentage}% Drop</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-2xl mx-1">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                                                {idx + 1}
                                            </div>
                                            <div className="max-w-[180px]">
                                                <div className="text-sm font-bold text-slate-900 truncate">{step.title}</div>
                                                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Question Step</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-right">
                                                <div className="text-lg font-black text-slate-900">{step.count}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase">Reached</div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-slate-300" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em] mt-8">
                    Data updates in real-time via n8n analytics
                </p>

                {/* DEBUG SECTION */}
                <div className="mt-8 border-t border-slate-200 pt-8">
                    <details className="group">
                        <summary className="flex items-center cursor-pointer text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-cyan-500 transition-colors">
                            <Bug className="w-4 h-4 mr-2" />
                            Debug Raw Data
                        </summary>
                        <div className="mt-4 bg-slate-900 text-slate-50 p-4 rounded-xl overflow-x-auto text-[10px] font-mono leading-relaxed shadow-inner">
                            <p className="mb-2 text-slate-400">Raw JSON received from n8n:</p>
                            <pre>{JSON.stringify(rawData, null, 2)}</pre>
                            <p className="mt-4 mb-2 text-slate-400 border-t border-slate-800 pt-2">Parsed Object used in UI:</p>
                            <pre>{JSON.stringify(stats, null, 2)}</pre>
                        </div>
                    </details>
                </div>

            </main>
        </div>
    );
};

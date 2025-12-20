import { StoryblokComponent, storyblokEditable } from "@storyblok/react";
import { ShieldCheck, AlertTriangle, HelpCircle } from "lucide-react";

const SafetyBadge = ({ status }: { status: string }) => {
    const styles = {
        safe: {
            bg: "bg-mint-100",
            text: "text-mint-800",
            icon: ShieldCheck,
            label: "Safe for Kids",
        },
        caution: {
            bg: "bg-red-100",
            text: "text-red-800",
            icon: AlertTriangle,
            label: "Use with Caution",
        },
        avoid: {
            bg: "bg-red-100",
            text: "text-red-800",
            icon: AlertTriangle,
            label: "Avoid",
        },
        unsafe: {
            bg: "bg-red-100",
            text: "text-red-800",
            icon: AlertTriangle,
            label: "Unsafe",
        },
        depends: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
            icon: HelpCircle,
            label: "It Depends",
        },
    };

    const config = styles[status as keyof typeof styles] || styles.safe;
    const Icon = config.icon;

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg} ${config.text} font-medium text-sm`}>
            <Icon size={16} />
            <span>{config.label}</span>
        </div>
    );
};

export const IngredientPage = ({ blok }: { blok: any }) => {
    return (
        <div {...storyblokEditable(blok)} className="max-w-7xl mx-auto px-4 md:px-6 py-6 animate-in fade-in duration-700 slide-in-from-bottom-4">
            {/* 1. Hero Card: Name, Score, Summary */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-8 relative group">
                {/* Decorative background blob */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-purple-200/50 transition-colors duration-700" />

                <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-start justify-between">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <SafetyBadge status={blok.safety} />
                            {blok.category && (
                                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm font-medium">
                                    {blok.category}
                                </span>
                            )}
                        </div>

                        <div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-[#3d1861] tracking-tight mb-4 leading-tight">
                                {blok.name}
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-medium">
                                {blok.summary}
                            </p>
                        </div>

                        {/* Quick Properties Row */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            {blok.fragrance_flag && (
                                <span className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg text-sm font-bold border border-pink-100 flex items-center gap-1">
                                    🌸 Fragrance
                                </span>
                            )}
                            {blok.allergen_flag && (
                                <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-1">
                                    ⚠️ Allergen
                                </span>
                            )}
                            {blok.pregnancy_safe !== null && (
                                <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border flex items-center gap-1 ${blok.pregnancy_safe ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                                    }`}>
                                    {blok.pregnancy_safe ? '🤰 Pregnancy Safe' : '🚫 Avoid in Pregnancy'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Prominent Score Card */}
                    {blok.isi_score && (
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-100 shadow-lg flex flex-col items-center min-w-[180px] transform transition-transform hover:scale-105 duration-300">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Safety Score</span>
                            <div className="relative flex items-center justify-center">
                                {/* SVG Circle Progress would go here, simplified for now */}
                                <div className={`text-6xl font-black ${blok.isi_score >= 80 ? 'text-green-500' :
                                        blok.isi_score >= 50 ? 'text-yellow-500' : 'text-red-500'
                                    }`}>
                                    {blok.isi_score}
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-400 mt-1">out of 100</span>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${blok.isi_score >= 80 ? 'bg-green-500' :
                                            blok.isi_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${blok.isi_score}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Left Column (Main Info) - Span 8 */}
                <div className="md:col-span-8 space-y-6">

                    {/* What & Why Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                <HelpCircle size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">What is it?</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {blok.what_is_it}
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                                <ShieldCheck size={20} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Why isn't it used?</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {blok.why_used}
                            </p>
                        </div>
                    </div>

                    {/* AI Insights (Parent Guide) */}
                    {blok.ai_parent_explanation && (
                        <div className="bg-gradient-to-br from-[#3d1861] to-[#5a248f] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🎓</span> For Parents
                                </h3>
                                <p className="text-purple-100 leading-relaxed text-lg">
                                    {blok.ai_parent_explanation}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Kids Skin & Fun Fact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                                👶 For Kids' Skin
                            </h2>
                            <p className="text-blue-800 text-sm leading-relaxed">
                                {blok.kids_skin}
                            </p>
                        </section>

                        {blok.fun_fact && (
                            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 text-9xl text-yellow-100 rotate-12 select-none">✨</div>
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-700 mb-3">
                                        Did you know?
                                    </h3>
                                    <p className="text-yellow-900 font-medium italic">
                                        "{blok.fun_fact}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Benefits & Concerns Toggles/Cards */}
                    <div className="space-y-4">
                        {blok.benefits && (
                            <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100">
                                <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs">✓</span>
                                    Key Benefits
                                </h3>
                                <p className="text-green-900/80 text-sm leading-relaxed">{blok.benefits}</p>
                            </div>
                        )}
                        {blok.concerns && (
                            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                                <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    Things to Know
                                </h3>
                                <p className="text-orange-900/80 text-sm leading-relaxed">{blok.concerns}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column (Sidebar Stats) - Span 4 */}
                <div className="md:col-span-4 space-y-6">

                    {/* Identity Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 pb-2 border-b border-slate-50">
                            Ingredient Identity
                        </h3>
                        <dl className="space-y-5">
                            <div>
                                <dt className="text-xs text-slate-400 uppercase mb-1">Chemical Family</dt>
                                <dd className="text-slate-800 font-bold bg-slate-50 inline-block px-3 py-1 rounded-lg">
                                    {blok.family || 'Unclassified'}
                                </dd>
                            </div>
                            {blok.aliases && (
                                <div>
                                    <dt className="text-xs text-slate-400 uppercase mb-1">Also Known As</dt>
                                    <dd className="text-slate-600 text-sm leading-snug">
                                        {Array.isArray(blok.aliases) ? blok.aliases.join(', ') : blok.aliases}
                                    </dd>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-xs text-slate-400 uppercase mb-1">CAS No.</dt>
                                    <dd className="text-slate-700 font-mono text-xs">{blok.cas_number || 'N/A'}</dd>
                                </div>
                                <div>
                                    <dt className="text-xs text-slate-400 uppercase mb-1">EC No.</dt>
                                    <dd className="text-slate-700 font-mono text-xs">{blok.ec_number || 'N/A'}</dd>
                                </div>
                            </div>
                        </dl>
                    </div>

                    {/* Usage & Products */}
                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />

                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                            Found In
                        </h3>
                        <ul className="space-y-3 relative z-10">
                            {blok.product_types && blok.product_types.map((item: any, i: number) => (
                                <li key={i} className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-mint-400 shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
                                    {item.text}
                                </li>
                            ))}
                        </ul>

                        {blok.usage_tip && (
                            <div className="mt-8 pt-6 border-t border-slate-800">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-500 mb-2 flex items-center gap-2">
                                    💡 Pro Tip
                                </h3>
                                <p className="text-slate-300 text-sm italic">
                                    "{blok.usage_tip}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Tech & Safety Details */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                            Safety Details
                        </h3>
                        <div className="space-y-4">
                            {blok.ewg_score && (
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-600 text-sm font-medium">EWG Score</span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${blok.ewg_score <= 2 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                        }`}>
                                        {blok.ewg_score}/10
                                    </span>
                                </div>
                            )}
                            {blok.comedogenicity && (
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                    <span className="text-slate-600 text-sm font-medium">Comedogenicity</span>
                                    <span className="text-slate-700 text-xs font-bold">
                                        {blok.comedogenicity}/5
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

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
        <div {...storyblokEditable(blok)} className="max-w-4xl mx-auto px-6 py-12 md:py-20">
            {/* Header */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-6 md:items-start md:justify-between">
                    <div className="space-y-4">
                        <SafetyBadge status={blok.safety} />
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-slate-900 tracking-tight">
                            {blok.name || "Ingredient Name"}
                            {/* Fallback as name might come from story name not blok content in some setups, but here we expect container to inject it or fetch it usually. 
                        Actually standard Storyblok page bloks don't always have the story name. 
                        We might need to pass the story title as a prop effectively. 
                        For now, let's assume 'name' is in the blok or we rely on the context.
                        Wait, my seed script didn't put 'name' in the content, it put it in the story object.
                        I should update the seed script to put name in content or update this component to accept name prop.
                        I'll update the component to be resilient.
                    */}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl">
                            {blok.summary}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                {/* Left Column: Details */}
                <div className="md:col-span-8 space-y-12">

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            What is it?
                        </h2>
                        <div className="prose prose-lg text-slate-600">
                            <p>{blok.what_is_it}</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            Why is it used?
                        </h2>
                        <div className="prose prose-lg text-slate-600">
                            <p>{blok.why_used}</p>
                        </div>
                    </section>

                    <section className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                        <h2 className="text-xl font-bold text-blue-900 mb-3">
                            For Kids' Skin
                        </h2>
                        <p className="text-blue-800 leading-relaxed">
                            {blok.kids_skin}
                        </p>
                    </section>

                    {/* AI Benefits */}
                    {blok.benefits && (
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="text-green-500">✓</span> Benefits
                            </h2>
                            <div className="prose prose-lg text-slate-600">
                                <p>{blok.benefits}</p>
                            </div>
                        </section>
                    )}

                    {/* AI Concerns/Considerations */}
                    {blok.concerns && (
                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <span className="text-orange-500">!</span> Things to Know
                            </h2>
                            <div className="prose prose-lg text-slate-600">
                                <p>{blok.concerns}</p>
                            </div>
                        </section>
                    )}

                    {/* Safety Profile Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Scores */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Safety Scores
                            </h3>
                            <div className="space-y-3">
                                {blok.ewg_score && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 font-medium">EWG Score</span>
                                        <span className={`px-3 py-1 rounded-full font-bold text-sm ${blok.ewg_score <= 2 ? 'bg-green-100 text-green-700' :
                                            blok.ewg_score <= 6 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {blok.ewg_score}/10
                                        </span>
                                    </div>
                                )}
                                {blok.comedogenicity && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 font-medium">Comedogenicity</span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-peach-500 rounded-full"
                                                    style={{ width: `${(blok.comedogenicity / 5) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{blok.comedogenicity}/5</span>
                                        </div>
                                    </div>
                                )}
                                {blok.irritation_potential && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 font-medium">Irritation Potential</span>
                                        <span className="text-sm font-bold text-slate-700 capitalize">{blok.irritation_potential}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Flags */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                                Properties
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {blok.fragrance_flag && (
                                    <span className="px-3 py-1.5 bg-pink-50 text-pink-700 rounded-lg text-sm font-medium border border-pink-100 flex items-center gap-1">
                                        🌸 Fragrance
                                    </span>
                                )}
                                {blok.allergen_flag && (
                                    <span className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100 flex items-center gap-1">
                                        ⚠️ Allergen
                                    </span>
                                )}
                                {blok.sensitiser_flag && (
                                    <span className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100 flex items-center gap-1">
                                        🔥 Sensitizer
                                    </span>
                                )}
                                {blok.hormonal_concern_flag && (
                                    <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100 flex items-center gap-1">
                                        🧬 Hormonal Concern
                                    </span>
                                )}
                                {blok.pregnancy_safe !== null && (
                                    <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center gap-1 ${blok.pregnancy_safe ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                                        }`}>
                                        {blok.pregnancy_safe ? '🤰 Pregnancy Safe' : '🚫 Not Pregnancy Safe'}
                                    </span>
                                )}
                                {!blok.fragrance_flag && !blok.allergen_flag && !blok.sensitiser_flag && !blok.hormonal_concern_flag && blok.pregnancy_safe === null && (
                                    <span className="text-slate-400 text-sm italic">No specific flags found.</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* AI Insights & Usage */}
                    <section className="space-y-6">
                        {blok.ai_parent_explanation && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                                <h3 className="text-lg font-bold text-blue-900 mb-2">🎓 Complete Parent Guide</h3>
                                <p className="text-blue-800 leading-relaxed">{blok.ai_parent_explanation}</p>
                            </div>
                        )}

                        {blok.usage_tip && (
                            <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 flex items-start gap-3">
                                <span className="text-2xl">💡</span>
                                <div>
                                    <h3 className="font-bold text-yellow-900 mb-1">Usage Tip</h3>
                                    <p className="text-yellow-800 text-sm">{blok.usage_tip}</p>
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column: Sidebar */}
                <div className="md:col-span-4 space-y-8">
                    {/* Identity Card */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg shadow-slate-100">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4 border-b pb-2">
                            Ingredient Identity
                        </h3>
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-xs text-slate-400 uppercase">Chemical Family</dt>
                                <dd className="text-slate-800 font-medium">{blok.family || 'Unclassified'}</dd>
                            </div>
                            {blok.aliases && (
                                <div>
                                    <dt className="text-xs text-slate-400 uppercase">Also Known As</dt>
                                    <dd className="text-slate-600 text-sm italic leading-snug mt-1">
                                        {Array.isArray(blok.aliases) ? blok.aliases.join(', ') : blok.aliases}
                                    </dd>
                                </div>
                            )}
                            <div>
                                <dt className="text-xs text-slate-400 uppercase">INCI Name</dt>
                                <dd className="text-slate-800 font-medium text-sm">{blok.inci_name || 'N/A'}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                            Commonly Found In
                        </h3>
                        <ul className="space-y-3">
                            {blok.product_types && blok.product_types.map((item: any, i: number) => (
                                <li key={i} className="flex items-center gap-2 text-slate-700 font-medium whitespace-normal break-words">
                                    <span className="w-1.5 h-1.5 rounded-full bg-peach-400 shrink-0" />
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* AI Fun Fact */}
                    {blok.fun_fact && (
                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-600 mb-3 flex items-center gap-2">
                                ✨ Fun Fact
                            </h3>
                            <p className="text-purple-900 text-sm leading-relaxed italic">
                                "{blok.fun_fact}"
                            </p>
                        </div>
                    )}

                    {/* Technical Details */}
                    {(blok.cas_number || blok.chemical_description) && (
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                                Technical Specs
                            </h3>
                            <dl className="space-y-4">
                                {blok.cas_number && (
                                    <div>
                                        <dt className="text-xs text-slate-400 uppercase">CAS Number</dt>
                                        <dd className="text-slate-700 font-mono text-sm">{blok.cas_number}</dd>
                                    </div>
                                )}
                                {blok.ec_number && (
                                    <div>
                                        <dt className="text-xs text-slate-400 uppercase">EC Number</dt>
                                        <dd className="text-slate-700 font-mono text-sm">{blok.ec_number}</dd>
                                    </div>
                                )}
                                {blok.age_min_recommended && (
                                    <div>
                                        <dt className="text-xs text-slate-400 uppercase">Rec. Min Age</dt>
                                        <dd className="text-slate-700 font-bold text-sm bg-slate-100 inline-block px-2 py-1 rounded">
                                            {blok.age_min_recommended}+ Years
                                        </dd>
                                    </div>
                                )}
                                {blok.restriction && (
                                    <div>
                                        <dt className="text-xs text-red-400 uppercase">Restrictions</dt>
                                        <dd className="text-red-600 text-xs font-medium bg-red-50 p-2 rounded mt-1">
                                            {blok.restriction}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    )}

                    {/* Disclaimer */}
                    <div className="text-xs text-slate-400 italic leading-relaxed">
                        Information provided is for educational purposes only and does not constitute medical advice.
                    </div>
                </div>

            </div>
        </div>
    );
};

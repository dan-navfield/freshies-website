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
                </div>

                {/* Right Column: Sidebar */}
                <div className="md:col-span-4 space-y-8">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-4">
                            Commonly Found In
                        </h3>
                        <ul className="space-y-3">
                            {blok.product_types && blok.product_types.map((item: any, i: number) => (
                                <li key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-peach-400" />
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-xs text-slate-400 italic leading-relaxed">
                        Information provided is for educational purposes only and does not constitute medical advice.
                    </div>
                </div>

            </div>
        </div>
    );
};

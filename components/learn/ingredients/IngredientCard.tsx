import { ShieldCheck, AlertTriangle, HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface IngredientCardProps {
    name: string;
    slug: string;
    summary: string;
    safety: string;
}

const SafetyBadgeMini = ({ status }: { status: string }) => {
    const styles = {
        safe: { text: "text-mint-600", icon: ShieldCheck },
        caution: { text: "text-red-600", icon: AlertTriangle },
        depends: { text: "text-yellow-600", icon: HelpCircle },
    };

    const config = styles[status as keyof typeof styles] || styles.safe;
    const Icon = config.icon;

    return <Icon size={18} className={config.text} />;
};

export const IngredientCard = ({ name, slug, summary, safety }: IngredientCardProps) => {
    return (
        <Link href={`/learn/ingredients/${slug}`} className="group block h-full">
            <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-md transition-all hover:border-peach-200 hover:-translate-y-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-deep-purple font-display group-hover:text-peach-600 transition-colors">
                        {name}
                    </h3>
                    <SafetyBadgeMini status={safety} />
                </div>

                <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {summary}
                </p>

                <div className="flex items-center text-sm font-semibold text-deep-purple group-hover:text-peach-600 transition-colors">
                    Read profile
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

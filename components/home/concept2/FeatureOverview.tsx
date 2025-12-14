import { Scan, CalendarCheck, BookOpen, Package } from "lucide-react";

const features = [
    {
        icon: Scan,
        title: "Product scanning and safety",
        text: "Scan skincare products to see a clear safety score and ingredient breakdown, designed for kids’ skin."
    },
    {
        icon: CalendarCheck,
        title: "Routines",
        text: "Build simple morning and night routines your kids can actually follow, without pressure or perfection."
    },
    {
        icon: BookOpen,
        title: "Learning",
        text: "Understand ingredients, products and skincare habits through clear, family-friendly guides."
    },
    {
        icon: Package,
        title: "Your shelf",
        text: "Keep track of the products your family uses, linked to the kids who use them."
    }
];

export default function FeatureOverview() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-deep-purple mb-4 font-display">
                        Everything you need to make better skincare choices.
                    </h2>
                    <p className="text-xl text-slate-600">
                        Freshies brings safety, learning and habit-building together in one simple app.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-2xl md:text-center group hover:bg-peach-50 transition-colors">
                            <div className="w-12 h-12 bg-ultraviolet/10 text-ultraviolet rounded-xl flex items-center justify-center mb-6 md:mx-auto group-hover:bg-u
ltraviolet group-hover:text-white transition-colors">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-deep-purple mb-3">{feature.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

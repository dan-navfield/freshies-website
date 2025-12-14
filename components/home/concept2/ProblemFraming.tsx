export default function ProblemFraming() {
    return (
        <section className="py-24 bg-cream">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-deep-purple mb-8 font-display">
                    Skincare shouldn’t feel confusing or stressful.
                </h2>
                <div className="prose prose-lg mx-auto text-slate-600 mb-12 leading-relaxed">
                    <p>
                        Kids and teenagers are exposed to more skincare products than ever before. Ingredient lists are hard to read, trends change fast, and it’s not always clear what’s actually safe for young, developing skin.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 font-bold text-deep-purple text-xl my-8">
                        <div>Parents want clarity and confidence.</div>
                        <div>Kids want independence and understanding.</div>
                    </div>
                    <p>
                        Freshies was created to support both, with clear guidance, friendly education and tools that help families make decisions together.
                    </p>
                </div>
            </div>
        </section>
    );
}

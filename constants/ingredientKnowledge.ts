
export const INGREDIENT_SYNONYMS: Record<string, string[]> = {
    "vitamin b3": ["niacinamide"],
    "vitamin c": ["ascorbic acid", "l-ascorbic acid", "magnesium ascorbyl phosphate"],
    "vitamin a": ["retinol", "retinyl palmitate", "retinoids"],
    "alcohol": ["ethanol", "denatured alcohol", "alcohol denat", "benzyl alcohol", "cetyl alcohol", "stearyl alcohol"],
    "oat": ["avena sativa", "colloidal oatmeal", "oat kernel extract"],
    "fragrance": ["parfum", "aroma", "essential oil", "linalool", "limonene"],
    "parabens": ["methylparaben", "propylparaben", "butylparaben", "ethylparaben"],
    "sls": ["sodium lauryl sulfate", "sodium laureth sulfate", "sulfates"],
    "aha": ["acid", "glycolic acid", "lactic acid", "mandelic acid"],
    "bha": ["salicylic acid", "betaine salicylate"],
}

export const SAFETY_CONTEXT: Record<string, { summary: string, recommendation: string }> = {
    "fragrance": {
        summary: "Fragrance can trigger allergies and eczema flare-ups in sensitive skin.",
        recommendation: "Avoid for babies and sensitive skin."
    },
    "parabens": {
        summary: "Preservatives that are often feared but generally considered safe in low concentrations. However, many parents prefer to avoid them.",
        recommendation: "Freshies products are 100% paraben-free."
    },
    "sls": {
        summary: "Strong cleansers that can strip the skin barrier and cause dryness.",
        recommendation: "Avoid in baby wash and shampoos."
    },
    "retinol": {
        summary: "A potent anti-aging ingredient that is too harsh for young skin.",
        recommendation: "Not for children."
    }
}

export const COMMON_INTENTS = [
    {
        keywords: ["kid", "child", "baby", "toddler", "safe", "year old"],
        intent: "child_safety",
        label: "Child Safety Mode"
    },
    {
        keywords: ["acne", "pimple", "spot", "breakout"],
        intent: "acne",
        label: "Acne Solutions"
    },
    {
        keywords: ["dry", "eczema", "itchy", "sensitive"],
        intent: "sensitive_skin",
        label: "Sensitive Skin"
    }
]

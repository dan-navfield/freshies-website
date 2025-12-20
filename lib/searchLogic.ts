
import Fuse from 'fuse.js';
import { INGREDIENT_SYNONYMS, COMMON_INTENTS, SAFETY_CONTEXT } from '@/constants/ingredientKnowledge';

export interface SearchResult {
    item: any;
    refIndex?: number;
    score?: number;
    matches?: any[];
    isSynonym?: boolean;
    synonymMatch?: string;
}

export interface Intent {
    type: string;
    label: string;
}

export interface SmartSearchResponse {
    results: SearchResult[];
    intent: Intent | null;
    educationalContext: { summary: string; recommendation: string } | null;
    suggestion: string | null;
}

// Prepare data for Fuse by expanding synonyms
export function prepareSearchIndex(data: any[]) {
    return data.map(item => {
        const synonyms = Object.entries(INGREDIENT_SYNONYMS).find(([key, vals]) =>
            key.toLowerCase() === item.name.toLowerCase() || vals.includes(item.name.toLowerCase())
        );

        return {
            ...item,
            _synonyms: synonyms ? [synonyms[0], ...synonyms[1]].join(' ') : ''
        };
    });
}

export function detectIntent(query: string): Intent | null {
    const lowerQuery = query.toLowerCase();
    for (const context of COMMON_INTENTS) {
        if (context.keywords.some(k => lowerQuery.includes(k))) {
            return { type: context.intent, label: context.label };
        }
    }
    return null;
}

export function getEducationalContext(query: string) {
    const lowerQuery = query.toLowerCase();
    // Check strict matches for educational context
    for (const [key, context] of Object.entries(SAFETY_CONTEXT)) {
        if (lowerQuery.includes(key) || INGREDIENT_SYNONYMS[key]?.some(s => lowerQuery.includes(s))) {
            return context;
        }
    }
    return null;
}

export function smartSearch(data: any[], query: string): SmartSearchResponse {
    if (!query) {
        return { results: [], intent: null, educationalContext: null, suggestion: null };
    }

    const intent = detectIntent(query);
    const educationalContext = getEducationalContext(query);

    // Configure Fuse
    const fuse = new Fuse(data, {
        keys: [
            { name: 'name', weight: 0.7 },
            { name: 'description', weight: 0.2 },
            { name: '_synonyms', weight: 0.4 } // Custom field we added
        ],
        threshold: 0.4, // Lower = stricter
        includeScore: true,
        ignoreLocation: true,
    });

    const results = fuse.search(query) as unknown as SearchResult[];

    // Simple suggestion logic (if 0 results)
    let suggestion = null;
    if (results.length === 0) {
        // Here we could use a dictionary speller or just suggest common categories
        // For MVP, we can just say "Try searching for 'oats' or 'zinc'"
        suggestion = "Try searching for specific ingredients like 'Zinc' or 'Oat'";
    }

    return {
        results,
        intent,
        educationalContext,
        suggestion
    };
}

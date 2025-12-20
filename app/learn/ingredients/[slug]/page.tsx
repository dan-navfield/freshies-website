
import { createClient } from '@supabase/supabase-js'
import { IngredientPage } from '@/components/learn/ingredients/IngredientPage'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Initialize Supabase client for server-side fetching
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const { slug } = params;

    // Reverse engineering the slug to search by name
    // e.g. aloe-vera -> Aloe Vera
    const searchName = slug.replace(/-/g, ' ');

    const { data: ingredients, error } = await supabase
        .from('ingredients')
        .select('*')
        .ilike('name', searchName) // Case-insensitive match on name
        .maybeSingle()

    if (error || !ingredients) {
        // Fallback: Try searching "common_name" if name fails
        const { data: fallbackIg, error: fallbackError } = await supabase
            .from('ingredients')
            .select('*')
            .ilike('common_name', searchName)
            .maybeSingle()

        if (fallbackIg) {
            return renderIngredient(fallbackIg)
        }

        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
                <h1 className="text-3xl font-bold text-slate-800">Ingredient not found</h1>
                <p className="text-slate-600">We couldn't find an ingredient matching "{slug}".</p>
                <Link
                    href="/learn/ingredients"
                    className="inline-flex items-center text-[#3d1861] font-medium hover:underline"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Ingredients
                </Link>
            </div>
        )
    }

    return renderIngredient(ingredients)
}

function renderIngredient(ingredients: any) {
    const adaptedBlok = {
        _uid: ingredients.id,
        component: 'ingredient_page',
        name: ingredients.name || ingredients.common_name || 'Unknown Ingredient',
        summary: ingredients.description || ingredients.kid_friendly_summary || 'No description available.',
        what_is_it: ingredients.what_it_does,
        why_used: ingredients.why_we_use_it || ingredients.benefits || 'To improve the product.',
        kids_skin: ingredients.kid_friendly_summary || 'Safe for delicate skin.',
        safety: ingredients.safety_rating || 'unknown',
        product_types: ingredients.product_types
            ? ingredients.product_types.split(',').map((t: string) => ({ text: t.trim() }))
            : []
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-4 mb-8">
                <Link
                    href="/learn/ingredients"
                    className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dictionary
                </Link>
            </div>
            <IngredientPage blok={adaptedBlok} />
        </div>
    )
}

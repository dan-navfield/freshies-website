
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseData(tableName: string, searchTerm: string = '', category: string = '') {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!supabase) {
            console.error("Supabase client not initialized.");
            // Don't set error visible to user unless critical? 
            // Or set it so they know why it's empty.
            // For build time, we want this to just pass silently if possible or handle gracefully.
            // But for runtime without keys, it IS an error.
            setError("Database configuration missing.");
            setLoading(false);
            return;
        }

        async function fetchData() {
            if (!tableName) return

            // Re-check supabase exists for Typescript mostly, though the early return above handles it
            if (!supabase) return;

            setLoading(true)
            try {
                let query = supabase.from(tableName).select('*')

                if (searchTerm) {
                    query = query.ilike('name', `%${searchTerm}%`)
                }

                if (category && category !== 'All') {
                    query = query.eq('category', category)
                }

                const { data: result, error: fetchError } = await query

                if (fetchError) throw fetchError

                if (fetchError) throw fetchError

                // Normalize data: ensure 'name' exists by falling back to common_name or inci_name
                const normalizedData = (result || []).map(item => {
                    const displayName = item.name || item.common_name || item.inci_name || 'Unknown Ingredient';
                    return {
                        ...item,
                        name: displayName,
                        // Generate a URL-friendly slug from the display name since DB slug doesn't exist
                        slug: displayName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                        // Also ensure category is displayable, defaulting to Uncategorized if unknown/null
                        category: (item.category && item.category !== 'unknown') ? item.category : 'Uncategorized',
                        // Fallback for description using kid-friendly summary or functional description
                        description: item.description || item.kid_friendly_summary || item.what_it_does || 'No description available.',
                        // Map safety rating
                        safety_status: item.safety_rating || 'unknown'
                    };
                })

                setData(normalizedData)
            } catch (err: any) {
                console.error(`Error fetching ${tableName}:`, err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [tableName, searchTerm, category])

    return { data, loading, error }
}

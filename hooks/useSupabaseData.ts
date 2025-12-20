
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useSupabaseData(tableName: string, searchTerm: string = '', category: string = '') {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchData() {
            // If table name involves 'articles' which we couldn't find, we might skip or try anyway
            if (!tableName) return

            setLoading(true)
            try {
                let query = supabase.from(tableName).select('*')

                if (searchTerm) {
                    // Assuming there is a text column to search, often 'title' or 'name'
                    // We can try 'name' for ingredients/products and 'title' for articles?
                    // For now, let's assume 'name' works for ingredients/products.
                    // We might need to make this column configurable.
                    query = query.ilike('name', `%${searchTerm}%`)
                }

                if (category && category !== 'All') {
                    query = query.eq('category', category)
                }

                const { data: result, error: fetchError } = await query

                if (fetchError) throw fetchError

                setData(result || [])
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

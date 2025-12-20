
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function inspectData() {
    console.log('Fetching first 10 ingredients...')
    const { data, error } = await supabase
        .from('ingredients')
        .select('name, slug, id, safety_rating, category')
        .limit(10)

    if (error) {
        console.error('Error:', error)
        return
    }

    console.log('Sample Data:')
    data.forEach(i => {
        console.log(`Name: ${i.name}`)
        console.log(`Slug: ${i.slug}`)
        console.log(`ID: ${i.id}`)
        console.log(`Safety: ${i.safety_rating}`)
        console.log(`Category: ${i.category}`)
        console.log('---')
    })
}

inspectData()

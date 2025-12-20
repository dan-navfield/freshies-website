
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load env vars
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing env vars')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
    console.log('Testing Supabase connection...')
    console.log('URL:', supabaseUrl)

    // Try to fetch from 'ingredients'
    const { data: ingredients, error: errorIng } = await supabase.from('ingredients').select('*').limit(1)
    if (errorIng) {
        console.error('Error fetching ingredients:', errorIng.message)
    } else {
        console.log('Successfully connected to ingredients table. Count:', ingredients.length)
    }

    // Try to fetch from 'articles'
    const { data: articles, error: errorArt } = await supabase.from('articles').select('*').limit(1)
    if (errorArt) {
        console.error('Error fetching articles:', errorArt.message)
    } else {
        console.log('Successfully connected to articles table. Count:', articles.length)
    }

    // Try to fetch from 'products'
    const { data: products, error: errorProd } = await supabase.from('products').select('*').limit(1)
    if (errorProd) {
        console.error('Error fetching products:', errorProd.message)
    } else {
        console.log('Successfully connected to products table. Count:', products.length)
    }
}

testConnection()

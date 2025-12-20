
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
    console.log('Fetching ingredient with Retinol in name/common_name/inci_name...')
    const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .or('name.ilike.%Retinol%,common_name.ilike.%Retinol%,inci_name.ilike.%Retinol%')
        .limit(5)

    if (error) {
        console.error('Error:', error)
        return
    }

    if (data.length === 0) {
        console.log('No matches found for Retinol')
        return
    }

    data.forEach(i => {
        console.log(`--- Match (${i.id}) ---`)
        console.log(`Name: '${i.name}'`)
        console.log(`Common Name: '${i.common_name}'`)
        console.log(`INCI Name: '${i.inci_name}'`)
        console.log(`Safety Rating: ${i.safety_rating}`)
        console.log(`Child Safe: ${i.child_safe}`)
        console.log(`Kid Friendly Summary: '${i.kid_friendly_summary}'`)
        console.log(`AI Kid Friendly Summary: '${i.ai_kid_friendly_summary}'`)
        console.log(`Description: '${i.description}'`)
        console.log(`What it does: '${i.what_it_does}'`)
        console.log(`AI What it does: '${i.ai_what_it_does}'`)
    })
}

inspectData()

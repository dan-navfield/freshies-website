
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function inspectColumns() {
    console.log('Fetching one record to inspect keys...')
    const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error:', error)
        return
    }

    if (data.length > 0) {
        console.log('Columns:', Object.keys(data[0]))
    } else {
        console.log('Table is empty')
    }
}

inspectColumns()

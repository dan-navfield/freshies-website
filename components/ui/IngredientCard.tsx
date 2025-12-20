
import { Card } from './Card'
import { ArrowRight, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react'
import Link from 'next/link'

interface IngredientCardProps {
    name: string
    description: string
    slug: string
    status?: 'safe' | 'caution' | 'avoid' | 'unknown'
}

export function IngredientCard({ name, description, slug, status = 'unknown' }: IngredientCardProps) {
    const getStatusIcon = () => {
        switch (status) {
            case 'safe':
                return <ShieldCheck className="w-5 h-5 text-[#3d1861]" />
            case 'caution':
                return <AlertTriangle className="w-5 h-5 text-orange-500" />
            case 'avoid':
                return <AlertTriangle className="w-5 h-5 text-red-500" />
            default:
                return <HelpCircle className="w-5 h-5 text-gray-400" />
        }
    }

    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-[#3d1861]">{name}</h3>
                {getStatusIcon()}
            </div>
            <p className="text-gray-600 mb-6 flex-grow">{description}</p>
            <Link
                href={`/ingredients/${slug}`}
                className="inline-flex items-center text-[#3d1861] font-medium hover:underline mt-auto"
            >
                Read profile <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
        </Card>
    )
}

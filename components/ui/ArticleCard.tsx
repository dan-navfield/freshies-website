
import { Card } from '../ui/Card'
import { ArrowRight, Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ArticleCardProps {
    title: string
    excerpt: string
    author?: string
    date?: string
    imageUrl?: string
    slug: string
}

export function ArticleCard({ title, excerpt, author, date, imageUrl, slug }: ArticleCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow overflow-hidden p-0">
            <div className="relative h-48 bg-gray-100">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-[#f8f5fa]" />
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex gap-4 mb-3 text-xs text-gray-500 font-medium">
                    {date && (
                        <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {date}
                        </span>
                    )}
                    {author && (
                        <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {author}
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold text-[#3d1861] mb-2">{title}</h3>
                <p className="text-gray-600 mb-6 flex-grow text-sm">{excerpt}</p>

                <Link
                    href={`/learn/${slug}`}
                    className="inline-flex items-center text-[#6b2c91] font-bold hover:underline mt-auto"
                >
                    Read article <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>
        </Card>
    )
}

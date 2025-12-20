
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    name: string
    description: string
    price: number
    imageUrl?: string
    slug: string
}

export function ProductCard({ name, description, price, imageUrl, slug }: ProductCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 overflow-hidden p-0">
            <div className="relative h-48 bg-gray-100">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                        <ShoppingBag className="w-12 h-12" />
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[#3d1861]">{name}</h3>
                    <span className="font-bold text-[#6b2c91]">${price}</span>
                </div>

                <p className="text-gray-600 mb-6 flex-grow text-sm line-clamp-3">{description}</p>

                <div className="mt-auto pt-4 flex gap-2">
                    <Button className="w-full justify-center" size="sm">
                        Add to Cart
                    </Button>
                    <Link href={`/products/${slug}`} className="block">
                        <Button variant="outline" size="sm" className="px-3">
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
}
